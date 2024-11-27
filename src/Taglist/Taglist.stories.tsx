import type { Meta } from "@storybook/react";

import { Taglist, TaglistProps } from "./Taglist";
import { useState } from "react";

const meta = {
  title: "Taglist",
  component: Taglist,
} satisfies Meta<typeof Taglist>;

export default meta;

const TaglistTemplate = (args: TaglistProps) => {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div style={{ fontFamily: "Arial" }}>
      <Taglist {...args} value={tags} onChange={setTags} />
    </div>
  );
};

export const Default = TaglistTemplate.bind({});
