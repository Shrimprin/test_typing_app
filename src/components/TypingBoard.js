"use client";

import React, { useState, useEffect, useRef } from "react";

import { IconCornerDownLeft } from "@tabler/icons-react";

export default function TypingBoard() {
  const typingText =
    "#!/usr/bin/env ruby\ndef fizz_buzz(num)\n  if num % 15 == 0\n    'FizzBuzz'\n  elsif num % 3 == 0\n    'Fizz'\n  elsif num % 5 == 0\n    'Buzz'\n  else\n    num.to_s\n  end\nend";

  const [userInput, setUserInput] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">タイピング練習</h1>
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
      <div className="mt-4">
        <button
          onClick={() => {
            setUserInput("");
            setCursorPosition(0);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          リセット
        </button>
      </div>
      <div className="mt-4">
        <p>
          進捗: {cursorPosition} / {typingText.length} 文字
        </p>
        <p>
          正確性:{" "}
          {(
            (cursorPosition > 0
              ? userInput
                  .split("")
                  .filter((char, index) => char === typingText[index]).length /
                cursorPosition
              : 1) * 100
          ).toFixed(1)}
          %
        </p>
      </div>
    </div>
  );
}
