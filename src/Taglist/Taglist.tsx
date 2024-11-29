import React from "react";
import "./Taglist.css";
import { Tag } from "../Tag";
import { TaglistProps } from "./types";
import { TagNavigation } from "./TagNavigation/TagNavigation";
import { InputNavigation } from "./InputNavigation/InputNavigation";

const defaultNavigationMode = "tag";
const defaultSeperators = ["Enter", ","];

const Taglist = ({
  navigationMode = defaultNavigationMode,
  TagComponent = Tag,
  separators = defaultSeperators,
  ...props
}: TaglistProps) => (navigationMode === "tag" ? <TagNavigation TagComponent={TagComponent} separators={separators} {...props} /> :  <InputNavigation TagComponent={TagComponent} separators={separators} {...props} />);

export { Taglist };
