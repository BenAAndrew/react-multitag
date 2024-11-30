import { ComponentType } from "react";
import { TagProps } from "../Tag";

export type TaglistProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value: string[];
  onChange: (tags: string[]) => void;
  navigationMode?: "tag" | "input";
  TagComponent?: ComponentType<TagProps>;
  separators?: string[];
  containerClassName?: string;
  inputClassName?: string;
  onDuplicate?: (tag: string) => void;
};

export type TaglistMethodProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value: string[];
  onChange: (tags: string[]) => void;
  TagComponent: ComponentType<TagProps>;
  separators: string[];
  containerClassName?: string;
  inputClassName?: string;
  onDuplicate?: (tag: string) => void;
};
