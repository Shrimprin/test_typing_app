"use client";

import React, { useState } from "react";
import TypingArea from "./TypingArea";
import ResetButton from "./ResetButton";
import ProgressDisplay from "./ProgressDisplay";

export default function TypingBoard() {
  const typingText =
    "#!/usr/bin/env ruby\ndef fizz_buzz(num)\n  if num % 15 == 0\n    'FizzBuzz'\n  elsif num % 3 == 0\n    'Fizz'\n  elsif num % 5 == 0\n    'Buzz'\n  else\n    num.to_s\n  end\nend";
  const typingTextLines = typingText.split(/(?<=\n)/);
  const [cursorLine, setCursorLine] = useState(0);
  const startCursorPositions = typingTextLines.map((line) =>
    line.indexOf(line.trimStart())
  );
  const [userInputs, setUserInputs] = useState(
    typingTextLines.map((_, index) => " ".repeat(startCursorPositions[index]))
  );
  console.log(userInputs);
  const [cursorPositions, setCursorPositions] = useState(startCursorPositions);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">タイピング練習</h1>
      <TypingArea
        typingTextLines={typingTextLines}
        userInputs={userInputs}
        cursorPositions={cursorPositions}
        setUserInputs={setUserInputs}
        setCursorPositions={setCursorPositions}
        cursorLine={cursorLine}
        setCursorLine={setCursorLine}
        startCursorPositions={startCursorPositions}
        // typingText={typingText}
        // userInput={userInput}
        // setUserInput={setUserInput}
        // cursorPosition={cursorPosition}
        // setCursorPosition={setCursorPosition}
      />
      {/* <ResetButton
        setUserInput={setUserInput}
        setCursorPosition={setCursorPosition}
      />
      <ProgressDisplay
        cursorPosition={cursorPosition}
        typingText={typingText}
        userInput={userInput}
      /> */}
    </div>
  );
}
