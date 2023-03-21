import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import KeyCard from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "KeyCard",
  component: KeyCard,
} as ComponentMeta<typeof KeyCard>;

const Template: ComponentStory<typeof KeyCard> = (args) => (
  <KeyCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  generatedToken: "234234",
  issuer: "Google",
  label: "Label",
  onClickCopy: () => null,
  onClickDelete: () => null,
  percentage: 100,
};
