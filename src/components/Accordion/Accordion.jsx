import React, { useState } from "react";

// Accordion Component
const Accordion = ({ children, style }) => {
  return <div style={{ ...defaultAccordionStyle, ...style }}>{children}</div>;
};

// AccordionItem Component
const AccordionItem = ({ title, children, style, headerStyle, bodyStyle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ ...defaultAccordionItemStyle, ...style }}>
      <div
        onClick={toggleAccordion}
        style={{ ...defaultAccordionHeaderStyle, ...headerStyle }}
      >
        {title}
      </div>
      {isOpen && (
        <div style={{ ...defaultAccordionBodyStyle, ...bodyStyle }}>
          {children}
        </div>
      )}
    </div>
  );
};

// Default Styles (can be overridden by props)
const defaultAccordionStyle = {
  width: "100%",
  border: "1px solid #ccc",
  borderRadius: "4px",
  marginBottom: "10px",
};

const defaultAccordionItemStyle = {
  borderBottom: "1px solid #ddd",
};

const defaultAccordionHeaderStyle = {
  padding: "15px",
  cursor: "pointer",
  backgroundColor: "#f8f8f8",
  fontWeight: "bold",
  fontSize: "18px",
};

const defaultAccordionBodyStyle = {
  padding: "15px",
  backgroundColor: "#fff",
};

export { Accordion, AccordionItem };
