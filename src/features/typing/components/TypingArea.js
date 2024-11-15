"use client";

import React, { useEffect, useState } from "react";
import TypingLine from "./TypingLine";

export default function TypingArea({
  typingTextLines,
  userInputs,
  setUserInputs,
  cursorPositions,
  setCursorPositions,
  cursorLine,
  setCursorLine,
  setIsCompleted,
}) {
  const isMoveToNextLine = (newCursorPosition) => {
    return newCursorPosition === typingTextLines[cursorLine].length;
  };

  const isMoveToPreviousLine = (newCursorPosition) => {
    return newCursorPosition === 0;
  };

  const isComplete = (newCursorPositions) => {
    return (
      cursorLine === typingTextLines.length - 1 &&
      newCursorPositions[cursorLine] === typingTextLines[cursorLine].length
    );
  };

  const updateInputsAndPositions = (newInputs, newPositions) => {
    setUserInputs(newInputs);
    setCursorPositions(newPositions);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newUserInputs = [...userInputs];
      const newCursorPositions = [...cursorPositions];

      if (e.key.length === 1) {
        newUserInputs[cursorLine] += e.key;
        newCursorPositions[cursorLine] = Math.min(
          typingTextLines[cursorLine].length,
          cursorPositions[cursorLine] + 1
        );
      } else if (e.key === "Backspace") {
        newUserInputs[cursorLine] = userInputs[cursorLine].slice(0, -1);
        newCursorPositions[cursorLine] = Math.max(
          0,
          cursorPositions[cursorLine] - 1
        );
      } else if (e.key === "Enter") {
        newUserInputs[cursorLine] += "\n";
        newCursorPositions[cursorLine] = cursorPositions[cursorLine] + 1;
      } else if (e.key === "Tab") {
        e.preventDefault();
        return;
      }

      updateInputsAndPositions(newUserInputs, newCursorPositions);

      if (isMoveToNextLine(newCursorPositions[cursorLine])) {
        setCursorLine((prev) => prev + 1);
      }

      if (isMoveToPreviousLine(newCursorPositions[cursorLine])) {
        setCursorLine((prev) => Math.max(0, prev - 1));
      }

      if (isComplete(newCursorPositions)) {
        setIsCompleted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userInputs, cursorPositions, cursorLine]);

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded font-mono whitespace-pre-wrap">
      {typingTextLines.map((typingTextLine, index) => (
        <TypingLine
          key={index}
          userInput={userInputs[index]}
          typingText={typingTextLine}
          cursorPosition={cursorPositions[index]}
          isActive={cursorLine >= index}
        />
      ))}
    </div>
  );
}
