import React from "react";

export default function ResetButton({
  setCursorLine,
  setUserInputs,
  setCursorPositions,
  initialUserInputs,
  initialCursorPositions,
}) {
  return (
    <div className="mt-4">
      <button
        onClick={() => {
          setCursorLine(0);
          setUserInputs(initialUserInputs);
          setCursorPositions(initialCursorPositions);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        リセット
      </button>
    </div>
  );
}
