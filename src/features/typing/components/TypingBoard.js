"use client";

import React, { useState } from "react";
import TypingArea from "./TypingArea";
import ResetButton from "./ResetButton";
import ProgressDisplay from "./ProgressDisplay";
import Result from "./Result";

export default function TypingBoard() {
  const typingText = "def fizz_buzz(num)\n  if num % 15 == 0\nend";

  // "#!/usr/bin/env ruby\ndef fizz_buzz(num)\n  if num % 15 == 0\n    'FizzBuzz'\n  elsif num % 3 == 0\n    'Fizz'\n  elsif num % 5 == 0\n    'Buzz'\n  else\n    num.to_s\n  end\nend";
  const typingTextLines = typingText.split(/(?<=\n)/);
  const [cursorLine, setCursorLine] = useState(0);
  const initialCursorPositions = typingTextLines.map((line) =>
    line.indexOf(line.trimStart())
  );
  const initialUserInputs = typingTextLines.map((_, index) =>
    " ".repeat(initialCursorPositions[index])
  );
  const [userInputs, setUserInputs] = useState(initialUserInputs);
  const [cursorPositions, setCursorPositions] = useState(
    initialCursorPositions
  );

  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">タイピング練習</h1>
      {isCompleted ? (
        <Result />
      ) : (
        <TypingArea
          typingTextLines={typingTextLines}
          userInputs={userInputs}
          cursorPositions={cursorPositions}
          setUserInputs={setUserInputs}
          setCursorPositions={setCursorPositions}
          cursorLine={cursorLine}
          setCursorLine={setCursorLine}
          setIsCompleted={setIsCompleted}
        />
      )}
      <ResetButton
        setCursorLine={setCursorLine}
        setUserInputs={setUserInputs}
        setCursorPositions={setCursorPositions}
        initialUserInputs={initialUserInputs}
        initialCursorPositions={initialCursorPositions}
        setIsCompleted={setIsCompleted}
      />
      <ProgressDisplay
        cursorLine={cursorLine}
        typingTextLines={typingTextLines}
        userInputs={userInputs}
        cursorPositions={cursorPositions}
      />
    </div>
  );
}
