import React from "react";

export default function ResetButton({
  setCursorLine,
  setUserInputs,
  setCursorPositions,
  initialUserInputs,
  initialCursorPositions,
  setIsCompleted,
  setIsStarted,
}) {
  return (
    <div className="mt-4">
      <button
        onClick={() => {
          setCursorLine(0);
          setUserInputs(initialUserInputs);
          setCursorPositions(initialCursorPositions);
          setIsCompleted(false);
          setIsStarted(false);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        リセット
      </button>
    </div>
  );
}
