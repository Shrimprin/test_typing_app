import React from "react";

export default function ProgressDisplay({
  cursorPosition,
  typingText,
  userInput,
}) {
  return (
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
  );
}
