import React from "react";
import DashboardLayout from "./DashboardLayout";

export default {
  title: "Layout/DashboardLayout",
  component: DashboardLayout,
  parameters: {
    layout: "fullscreen", // Makes the layout fit better in Storybook
  },
};

const Template = (args) => <DashboardLayout {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  children: (
    <div style={{ padding: "20px", background: "#f5f5f5", height: "100vh" }}>
      <h1>Dashboard Content</h1>
      <p>This is a sample dashboard layout inside Storybook.</p>
    </div>
  ),
};
