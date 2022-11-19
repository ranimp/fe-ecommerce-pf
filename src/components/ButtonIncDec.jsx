import React from "react";

export default function IncDec({ children, onClick }) {
  return (
    <div>
      <button class="hover:bg-B5C5F2 font-bold px-1 rounded border- border-4 inline-block" onClick = {onClick}>
        {children}
      </button>
    </div>
  );
}
