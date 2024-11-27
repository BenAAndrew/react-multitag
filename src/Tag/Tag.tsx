import "./Tag.css";

type TagProps = {
  children: string;
  selected: boolean;
  onDelete: () => void;
};

const Tag = ({ children, selected, onDelete }: TagProps) => (
  <div className={`taglist-tag ${selected ? "taglist-tag--selected" : ""}`}>
    {children}
    <button
      type="button"
      onClick={onDelete}
      className="taglist-tag-close"
      aria-label={`remove ${children}`}
    >
      &#10005;
    </button>
  </div>
);

export { Tag };
export type { TagProps };
