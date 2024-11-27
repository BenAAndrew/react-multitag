import {
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  ComponentType,
} from "react";
import "./Taglist.css";
import { Tag, TagProps } from "../Tag";

type TaglistProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  TagComponent?: ComponentType<TagProps>;
  separators?: string[];
  containerClassName?: string;
  inputClassName?: string;
};

const Taglist = ({
  value,
  onChange,
  TagComponent = Tag,
  separators = ["Enter", ","],
  containerClassName,
  inputClassName,
}: TaglistProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    const inputElement = inputRef.current;

    if (separators.includes(e.key) && inputValue.trim()) {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue.trim());
      }
    }

    if (selectedIndex !== -1) {
      // Tag navigation
      if (selectedIndex > 0 && e.key === "ArrowLeft") {
        // Navigate left
        e.preventDefault();
        setSelectedIndex(selectedIndex - 1);
      } else if (selectedIndex < value.length - 1 && e.key === "ArrowRight") {
        // Navigate right
        e.preventDefault();
        setSelectedIndex(selectedIndex + 1);
      } else if (e.key === "Backspace") {
        // Delete tag
        e.preventDefault();
        removeTag(selectedIndex);
      } else if (e.key !== "ArrowLeft") {
        // Switch to text edit
        setSelectedIndex(-1);
      }
    } else if (inputElement?.selectionStart === 0 && e.key === "ArrowLeft") {
      // Switch to tag navigation
      setSelectedIndex(value.length - 1);
    } else if (inputElement?.selectionStart === 0 && e.key === "Backspace") {
      removeTag(value.length - 1);
    }
  };

  const addTag = (tag: string): void => {
    if (!value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInputValue("");
  };

  const removeTag = (index: number): void => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`taglist-container ${containerClassName ? containerClassName : ""}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {value.map((tag, index) => (
        <TagComponent
          key={index}
          selected={selectedIndex === index}
          onDelete={() => removeTag(index)}
        >
          {tag}
        </TagComponent>
      ))}
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        className={`taglist-input ${inputClassName ? inputClassName : ""}`}
      />
    </div>
  );
};

export { Taglist };
export type { TaglistProps };
