"use client";

import { React, useEffect } from "react";

export default function Start({ setIsStarted }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        setIsStarted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="text-center">
      <p>スペースキーでスタート</p>
    </div>
  );
}
