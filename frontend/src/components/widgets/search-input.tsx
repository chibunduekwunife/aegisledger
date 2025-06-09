import { Label } from "../ui/label";

import React from "react";

interface SearchProps {
  onValueChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Search({ onValueChange }: SearchProps) {
  return (
    <Label className="input border h-9 rounded border-gray-300">
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input type="search" onChange={onValueChange} required placeholder="Search" />
    </Label>
  );
}
