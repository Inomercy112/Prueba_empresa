'use client';
import React from 'react';

type Props = {
  label?: string;
  name?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string | null;
};

export default function TextInput({ label, name, type = 'text', value, onChange, placeholder, error }: Props) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-green-700 mb-1" htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white ${error ? 'border-green-500' : 'border-green-300'}`}
      />
      {error && <p className="mt-1 text-sm text-green-600">{error}</p>}
    </div>
  );
}
