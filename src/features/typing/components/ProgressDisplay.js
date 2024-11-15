import React from "react";

export default function ProgressDisplay({
  cursorLine,
  typingTextLines,
  userInputs,
  cursorPositions,
}) {
  const typedTextCount = cursorPositions
    .slice(0, cursorLine + 1)
    .reduce((acc, position) => {
      return acc + position;
    }, 0);
  const typingText = typingTextLines.slice(0, cursorLine + 1).join("");
  const userInput = userInputs.slice(0, cursorLine + 1).join("");

  return (
    <div className="mt-4">
      <p>
        進捗: {typedTextCount} / {typingTextLines.join("").length} 文字
      </p>
      <p>
        正確性:{" "}
        {(
          (userInput.length > 0
            ? userInput
                .split("")
                .filter((char, index) => char === typingText[index]).length /
              typedTextCount
            : 1) * 100
        ).toFixed(1)}
        %
      </p>
    </div>
  );
}
