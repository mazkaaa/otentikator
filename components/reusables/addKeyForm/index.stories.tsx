import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import AddKeyForm from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "AddKeyForm",
  component: AddKeyForm,
} as ComponentMeta<typeof AddKeyForm>;

const Template: ComponentStory<typeof AddKeyForm> = (args) => (
  <AddKeyForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  issuer: "",
  label: "",
  secret: "",
  loadScan: false,
  onChange: () => null,
  onScanError: () => null,
  onScanResult: () => null,
  onSubmit: () => null,
  setLoadScan: () => null,
};
