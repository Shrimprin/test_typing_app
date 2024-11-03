import React from "react";

export default function ResetButton({ setUserInput, setCursorPosition }) {
  return (
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
  );
}
