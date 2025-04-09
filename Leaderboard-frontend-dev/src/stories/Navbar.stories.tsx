import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

export default {
  title: "Components/Navbar/Navbar",
  component: Navbar,
  decorators: [(Story) => <BrowserRouter><Story /></BrowserRouter>],
};

const Template = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {};
