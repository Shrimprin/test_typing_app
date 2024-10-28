"use client";

import React, { useState, useEffect, useRef } from "react";

export default function TypingInterface() {
  const typingText =
    "#!/usr/bin/env ruby\ndef fizz_buzz(num)\n  if num % 15 == 0\n    'FizzBuzz'\n  elsif num % 3 == 0\n    'Fizz'\n  elsif num % 5 == 0\n    'Buzz'\n  else\n    num.to_s\n  end\nend";

  const [userInput, setUserInput] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const input = e.target.value;
    if (input.length > userInput.length) {
      setUserInput(input);
      setCursorPosition(cursorPosition + 1);
    } else if (input.length < userInput.length) {
      setUserInput(input);
      setCursorPosition(cursorPosition - 1);
    }
  };

  const getCharClass = (index) => {
    if (index >= userInput.length) return "text-gray-400";
    if (userInput[index] === typingText[index]) return "text-green-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">タイピング練習</h1>
      <div className="mb-4 p-4 bg-gray-100 rounded font-mono whitespace-pre-wrap">
        {typingText.split("").map((char, index) => (
          <span key={index} className={getCharClass(index)}>
            {char}
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
        aria-label="ここにタイプしてください"
      />
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
