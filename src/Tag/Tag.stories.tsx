import type { Meta, StoryObj } from "@storybook/react";

import { Tag } from "./Tag";

const meta = {
  title: "Tag",
  component: Tag,
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Tag",
    selected: false,
    onDelete: () => {},
  },
};
