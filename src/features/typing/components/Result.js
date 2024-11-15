import React from "react";
import TypingLine from "./TypingLine";

export default function Result({ typingTextLines, userInputs, accuracy }) {
  return (
    <div>
      <h2>結果</h2>
      <p>
        進捗: {userInputs.join("").length} / {typingTextLines.join("").length}
      </p>
      <p>精度: {accuracy}%</p>
      <div className="mb-4 p-4 bg-gray-100 rounded font-mono whitespace-pre-wrap">
        {typingTextLines.map((typingTextLine, index) => (
          <TypingLine
            key={index}
            userInput={userInputs[index]}
            typingText={typingTextLine}
            cursorPosition={typingTextLine.length}
            isActive={true}
          />
        ))}
      </div>
    </div>
  );
}
