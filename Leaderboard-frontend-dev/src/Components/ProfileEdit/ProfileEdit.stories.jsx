import React from "react";
import ProfileEdit from "./ProfileEdit";

export default {
  title: "Components/ProfileEdit",
  component: ProfileEdit,
  argTypes: {
    userType: {
      control: "radio",
      options: ["student", "mentor", "college"],
    },
  },
};

const Template = (args) => <ProfileEdit {...args} />;

export const StudentProfile = Template.bind({});
StudentProfile.args = {
  userType: "student",
  userData: {
    name: "student1",
    phone: "1234567890",
    profileImage: "/api/placeholder/150/150",
  },
};

export const MentorProfile = Template.bind({});
MentorProfile.args = {
  userType: "mentor",
  userData: {
    name: "mentor 1",
    phone: "9876543210",
    profileImage: "/api/placeholder/150/150",
  },
};

export const CollegeProfile = Template.bind({});
CollegeProfile.args = {
  userType: "college",
  userData: {
    name: "College 1",
    about: "college 1 about",
    location: "college 1 location",
    profileImage: "/api/placeholder/150/150",
  },
};
