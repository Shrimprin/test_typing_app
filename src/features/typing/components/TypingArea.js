"use client";

import React, { useEffect } from "react";
import { IconCornerDownLeft } from "@tabler/icons-react";

export default function TypingArea({
  typingText,
  userInput,
  setUserInput,
  cursorPosition,
  setCursorPosition,
}) {
  useEffect(() => {
    // マウント時に呼ばれる
    const handleKeyDown = (e) => {
      if (e.key.length === 1) {
        // 文字キーが押された場合
        setUserInput((prev) => prev + e.key);
        setCursorPosition((prev) => prev + 1);
      } else if (e.key === "Backspace") {
        // バックスペースが押された場合
        setUserInput((prev) => prev.slice(0, -1));
        setCursorPosition((prev) => Math.max(0, prev - 1));
      } else if (e.key === "Enter") {
        // エンターキーが押された場合
        setUserInput((prev) => prev + "\n");
        setCursorPosition((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // クリーンアップ関数
    // アンマウント時に呼ばれる
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getCharClass = (index) => {
    if (index === cursorPosition) return "underline";
    if (index >= userInput.length) return "text-gray-400";
    if (userInput[index] === typingText[index]) return "bg-green-200";
    return "bg-red-200";
  };

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded font-mono whitespace-pre-wrap">
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
}
