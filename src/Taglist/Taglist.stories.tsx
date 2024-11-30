import React, { useState } from "react";
import type { Meta } from "@storybook/react";

import { Taglist } from "./Taglist";
import { TaglistProps } from "./types";

const meta = {
  title: "Taglist",
  component: Taglist,
} satisfies Meta<typeof Taglist>;

export default meta;

const TaglistTemplate = (args: TaglistProps) => {
  const [tags, setTags] = useState<string[]>(args.value || []);

  return (
    <div style={{ fontFamily: "Arial" }}>
      <Taglist {...args} value={tags} onChange={setTags} />
    </div>
  );
};

export const Default = TaglistTemplate.bind({});
Default.args = {
  navigationMode: "tag",
  value: [],
  separators: ["Enter", ","],
};
