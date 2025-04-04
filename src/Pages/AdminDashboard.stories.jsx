import React from "react";
import { BrowserRouter } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const meta = {
  component: AdminDashboard,
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
  args: {},
};
