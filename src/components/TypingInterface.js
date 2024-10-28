"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

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
    setUserInput(input);
    setCursorPosition(input.length);
  };

  const getCharClass = (index) => {
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
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className="text-xs mr-1 inline-block align-middle"
                />
                <br />
              </>
            ) : (
              char
            )}
          </span>
        ))}
      </div>
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
        aria-label="ここにタイプしてください"
        rows="10" // テキストエリアの行数を指定
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
