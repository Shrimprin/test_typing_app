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
  // typingText,
  // userInput,
  // setUserInput,
  // cursorPosition,
  // setCursorPosition,
}) {
  // const [cursorLine, setCursorLine] = useState(0);

  useEffect(() => {
    // マウント時に呼ばれる
    const handleKeyDown = (e) => {
      if (e.key.length === 1) {
        // 文字キーが押された場合
        setUserInputs((prev) => {
          const newInputs = [...prev];
          newInputs[cursorLine] = prev[cursorLine] + e.key;
          return newInputs;
        });
        setCursorPositions((prev) => {
          const newPositions = [...prev];
          newPositions[cursorLine] = Math.max(
            typingTextLines[cursorLine].length,
            prev[cursorLine] + 1
          );
          return newPositions;
        });

        // if (
        //   cursorPositions[cursorLine] ===
        //   typingTextLines[cursorLine].length - 1
        // ) {
        //   setCursorLine((prev) => prev + 1);
        // }
      } else if (e.key === "Backspace") {
        // バックスペースが押された場合
        setUserInputs((prev) => {
          const newInputs = [...prev];
          newInputs[cursorLine] = prev[cursorLine].slice(0, -1);
          return newInputs;
        });
        setCursorPositions((prev) => {
          const newPositions = [...prev];
          newPositions[cursorLine] = Math.max(0, prev[cursorLine] - 1);
          return newPositions;
        });
      } else if (e.key === "Enter") {
        // エンターキーが押された場合
        setUserInputs((prev) => {
          const newInputs = [...prev];
          newInputs[cursorLine] = prev[cursorLine] + "\n";
          return newInputs;
        });
        setCursorPositions((prev) => {
          const newPositions = [...prev];
          newPositions[cursorLine] = prev[cursorLine] + 1;
          return newPositions;
        });

        // cursorPOsitionやuserInputsはマウント時のままなのでダメそう
        // 依存配列にしなきゃダメ？
        console.log("hoge");
        console.log("cursorPositions", cursorPositions);
        console.log("typingTextLines", typingTextLines);
        console.log("userInputs", userInputs);
        if (
          cursorPositions[cursorLine] ===
          typingTextLines[cursorLine].length - 1
        ) {
          setCursorLine((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // クリーンアップ関数
    // アンマウント時に呼ばれる
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // console.log("cursorLine", cursorLine);
  // console.log("typingTextLines", typingTextLines);
  // console.log("userInputs", userInputs);
  // console.log("cursorPositions", cursorPositions);
  return (
    <div className="mb-4 p-4 bg-gray-100 rounded font-mono whitespace-pre-wrap">
      {typingTextLines.map((typingTextLine, index) => (
        <TypingLine
          key={index}
          userInput={userInputs[index]}
          typingText={typingTextLine}
          cursorPosition={cursorPositions[index]}
        />
      ))}
    </div>
  );
}
