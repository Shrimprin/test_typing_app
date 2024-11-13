"use client";

import React from "react";
import { IconCornerDownLeft } from "@tabler/icons-react";

const TypingLine = React.memo(function TypingLine({
  userInput,
  typingText,
  cursorPosition,
}) {
  const getCharClass = (index) => {
    if (index >= userInput.length) return "text-gray-400";
    if (index === cursorPosition) return "underline";
    if (userInput[index] === typingText[index]) return "bg-green-200";
    return "bg-red-200";
  };

  return (
    <div>
      {typingText.split("").map((char, index) => (
        <span key={index} className={getCharClass(index)}>
          {char === "\n" ? (
            <>
              <IconCornerDownLeft
                stroke={1}
                size={8}
                style={{ display: "inline" }}
              />
              <br />
            </>
          ) : (
            char
          )}
        </span>
      ))}
    </div>
  );
});

export default TypingLine;
