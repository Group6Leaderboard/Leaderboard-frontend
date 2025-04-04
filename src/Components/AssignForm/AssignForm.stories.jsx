import React from "react";
import AssignForm from "../AssignForm/AssignForm";

export default {
  title: "Components/AssignForm",
  component: AssignForm,
  argTypes: {
    role: {
      control: "radio",
      options: ["admin", "mentor"],
    },
  },
};

const Template = (args) => <AssignForm {...args} />;

export const AdminForm = Template.bind({});
AdminForm.args = {
  role: "admin",
};

export const MentorForm = Template.bind({});
MentorForm.args = {
  role: "mentor",
};
