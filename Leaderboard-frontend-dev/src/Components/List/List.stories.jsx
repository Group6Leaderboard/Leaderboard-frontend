import React from "react";
import List from "./List";

export default {
  title: "Components/List",
  component: List,
};

const studentData = [
  { id: 1, name: "Alice Johnson", image: "https://via.placeholder.com/60", college: "Harvard University" },
  { id: 2, name: "Bob Brown", image: "https://via.placeholder.com/60", college: "MIT" },
];

const collegeData = [
  { id: 1, name: "Harvard University", image: "https://via.placeholder.com/60", location: "Cambridge, MA" },
  { id: 2, name: "Stanford University", image: "https://via.placeholder.com/60", location: "Stanford, CA" },
];

const mentorData = [
  { id: 1, name: "Dr. Williams", image: "https://via.placeholder.com/60", email: "williams@example.com" },
  { id: 2, name: "Dr. Anderson", image: "https://via.placeholder.com/60", email: "anderson@example.com" },
];

export const StudentList = () => <List data={studentData} type="student" />;
export const CollegeList = () => <List data={collegeData} type="college" />;
export const MentorList = () => <List data={mentorData} type="mentor" />;
export const EmptyList = () => <List data={[]} type="student" />;
