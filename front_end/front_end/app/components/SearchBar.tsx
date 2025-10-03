'use client';

import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="w-full">
      <label className="relative block">
        <span className="sr-only">Buscar productos</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
          </svg>
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Buscar productos..."
        />
      </label>
    </div>
  );
}
