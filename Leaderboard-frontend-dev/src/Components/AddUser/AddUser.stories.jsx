import React from "react";
import AddUser from "./AddUser";

export default {
  title: "Components/AddUser",
  component: AddUser,
  argTypes: {
    type: {
      control: { type: "select", options: ["student", "mentor", "college"] },
    },
  },
};

const Template = (args) => <AddUser {...args} />;

export const Student = Template.bind({});
Student.args = {
  type: "student",
};

export const Mentor = Template.bind({});
Mentor.args = {
  type: "mentor",
};

export const College = Template.bind({});
College.args = {
  type: "college",
};
