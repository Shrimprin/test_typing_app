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

  useEffect(() => {
    // マウント時に呼ばれる
    const handleKeyDown = (e) => {
      if (e.key.length === 1) {
        // 文字キーが押された場合
        const newUserInputs = [...userInputs];
        newUserInputs[cursorLine] = userInputs[cursorLine] + e.key;
        setUserInputs(newUserInputs);

        const newCursorPositions = [...cursorPositions];
        newCursorPositions[cursorLine] = Math.min(
          typingTextLines[cursorLine].length,
          cursorPositions[cursorLine] + 1
        );
        setCursorPositions(newCursorPositions);

        if (isMoveToNextLine(newCursorPositions[cursorLine])) {
          setCursorLine((prev) => prev + 1);
        }

        if (isComplete(newCursorPositions)) {
          setIsCompleted(true);
        }
      } else if (e.key === "Backspace") {
        // バックスペースが押された場合
        const newUserInputs = [...userInputs];
        newUserInputs[cursorLine] = userInputs[cursorLine].slice(0, -1);
        setUserInputs(newUserInputs);

        const newCursorPositions = [...cursorPositions];
        newCursorPositions[cursorLine] = Math.max(
          0,
          cursorPositions[cursorLine] - 1
        );
        setCursorPositions(newCursorPositions);

        if (isMoveToPreviousLine(newCursorPositions[cursorLine])) {
          setCursorLine((prev) => Math.max(0, prev - 1));
        }
      } else if (e.key === "Enter") {
        // エンターキーが押された場合
        const newUserInputs = [...userInputs];
        newUserInputs[cursorLine] = userInputs[cursorLine] + "\n";
        setUserInputs(newUserInputs);

        const newCursorPositions = [...cursorPositions];
        newCursorPositions[cursorLine] = cursorPositions[cursorLine] + 1;
        setCursorPositions(newCursorPositions);

        if (isMoveToNextLine(newCursorPositions[cursorLine])) {
          setCursorLine((prev) => prev + 1);
        }

        if (isComplete(newCursorPositions)) {
          setIsCompleted(true);
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // クリーンアップ関数
    // アンマウント時に呼ばれる
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userInputs, cursorPositions]);

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
