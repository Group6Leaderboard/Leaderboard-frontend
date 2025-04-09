import React from "react";
import StatsCard from "../RectangleCards/Statscard";

export default {
  title: "Components/StatsCard",
  component: StatsCard,
};

export const TotalProjects = () => <StatsCard title="Total Projects" value="15" />;
export const TotalStudents = () => <StatsCard title="Total Students" value="120" />;
export const TotalMentors = () => <StatsCard title="Total Mentors" value="10" />;

export const TotalTasks = () => <StatsCard title="Total Tasks" value="30" />;
export const SubmittedTasks = () => <StatsCard title="Submitted" value="20" />;
export const ToBeReviewed = () => <StatsCard title="To Be Reviewed" value="10" />;
