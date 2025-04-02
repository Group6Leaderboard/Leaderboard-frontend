import MentorDashboard from './MentorDashboard';
import { BrowserRouter } from "react-router-dom";
import React from "react";

const meta = {
  component: MentorDashboard,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

export const Default = {
  args: {}
};