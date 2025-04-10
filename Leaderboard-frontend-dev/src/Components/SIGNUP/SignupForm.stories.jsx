import React from "react";
import SignupForm from "../SIGNUP/SignupForm";

export default {
  title: "Components/SignupForm",
  component: SignupForm,
  argTypes: {
    role: {
      control: { type: "radio" },
      options: ["student", "mentor", "college"],
    },
  },
};

const Template = (args) => <SignupForm {...args} />;

export const StudentSignup = Template.bind({});
StudentSignup.args = {
  role: "student",
};

export const MentorSignup = Template.bind({});
MentorSignup.args = {
  role: "mentor",
};

export const CollegeSignup = Template.bind({});
CollegeSignup.args = {
  role: "college",
};
