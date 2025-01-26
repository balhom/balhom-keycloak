import type { Meta, StoryObj } from "@storybook/react";

import { KcLoginPage } from "./kc.gen";

const meta = {
    component: KcLoginPage
} satisfies Meta<typeof KcLoginPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};
