import React from "react";

export default function ProgressDisplay({
  typedTextCount,
  typingTextCount,
  accuracy,
}) {
  return (
    <div className="mt-4">
      <p>
        進捗: {typedTextCount}/{typingTextCount} 文字
      </p>
      <p>精度: {accuracy}%</p>
    </div>
  );
}
