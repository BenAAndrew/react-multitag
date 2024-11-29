import React, {
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
} from "react";
import "./InputNavigation.css";
import { TaglistMethodProps } from "../types";

const InputNavigation = ({
  value,
  onChange,
  TagComponent,
  separators,
  containerClassName,
  inputClassName,
  ...props
}: TaglistMethodProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    const inputElement = inputRef.current;

    if (
      separators.includes(e.key) &&
      inputValue.trim() &&
      !value.includes(inputValue.trim())
    ) {
      e.preventDefault();
      if (selectedIndex === -1) {
        onChange([...value, inputValue.trim()]);
      } else {
        value.splice(selectedIndex, 0, inputValue.trim());
        onChange(value);
        setSelectedIndex(selectedIndex + 1);
      }
      setInputValue("");
    }

    if (
      selectedIndex > 0 &&
      inputElement?.selectionStart === 0 &&
      e.key === "ArrowLeft"
    ) {
      // Navigate left
      e.preventDefault();
      setDirection("left");
      setSelectedIndex(selectedIndex - 1);
    } else if (
      selectedIndex !== -1 &&
      selectedIndex < value.length &&
      inputElement?.selectionStart === inputValue.length &&
      e.key === "ArrowRight"
    ) {
      // Navigate right
      e.preventDefault();
      setDirection("right");
      setSelectedIndex(
        selectedIndex === value.length - 1 ? -1 : selectedIndex + 1,
      );
    } else if (inputElement?.selectionStart === 0 && e.key === "ArrowLeft") {
      // Switch to input navigation
      e.preventDefault();
      setDirection("left");
      setSelectedIndex(value.length - 1);
    } else if (
      selectedIndex !== 0 &&
      inputElement?.selectionStart === 0 &&
      e.key === "Backspace"
    ) {
      // Delete tag
      if (selectedIndex === -1) {
        removeTag(value.length - 1);
      } else {
        removeTag(selectedIndex - 1);
        setSelectedIndex(selectedIndex - 1);
      }
    }
  };

  const removeTag = (index: number): void => {
    onChange(value.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.selectionStart =
        direction === "left" ? 0 : inputValue.length;
      inputRef.current.selectionEnd =
        direction === "left" ? 0 : inputValue.length;
      inputRef.current.focus();
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (mirrorRef.current && inputRef.current) {
      const mirrorWidth = mirrorRef.current.offsetWidth;
      inputRef.current.style.width = `${mirrorWidth}px`;
    }
  }, [inputValue, selectedIndex]);

  const input = (
    <input
      type="text"
      ref={inputRef}
      value={inputValue}
      onChange={handleInputChange}
      className={`taglist-input-navigate-input ${selectedIndex == -1 ? "taglist-input-navigate-input--default" : ""} ${inputClassName ? inputClassName : ""}`}
      {...props}
    />
  );

  return (
    <div
      className={`taglist-container ${containerClassName ? containerClassName : ""}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {value.map((tag, index) => {
        const tagComponent = (
          <TagComponent
            key={index}
            selected={false}
            onDelete={() => removeTag(index)}
          >
            {tag}
          </TagComponent>
        );
        if (index === selectedIndex) {
          return (
            <>
              {input}
              {tagComponent}
            </>
          );
        }
        return tagComponent;
      })}
      {selectedIndex === -1 && input}
      {/* Use hidden span to calculate text width */}
      <span ref={mirrorRef} className="taglist-hidden-span">
        {inputValue || " "}{" "}
        {/* Fallback to a single space to ensure minimum width */}
      </span>
    </div>
  );
};

export { InputNavigation };
