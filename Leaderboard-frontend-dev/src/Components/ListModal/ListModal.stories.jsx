import React, { useState } from "react";
import ListModal from "./ListModal";

export default {
  title: "Components/ListModal",
  component: ListModal,
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  return <ListModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};

export const Default = Template.bind({});
Default.args = {
  data: [
    { name: "Alice Johnson" },
    { name: "Bob Smith" },
    { name: "Charlie Davis" },
    { name: "David Wilson" },
    { name: "Emma Brown" },
    { name: "Frank Thomas" },
    { name: "Grace White" },
    { name: "Hannah King" },
    { name: "Ian Scott" },
    { name: "Jack Moore" },
  ],
};
