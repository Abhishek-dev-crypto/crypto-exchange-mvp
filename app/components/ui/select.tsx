'use client';

import * as React from 'react';

type Option = {
  label: string;
  value: string;
};

export function Select({
  options,
  onValueChange,
  defaultValue,
  placeholder,
  className = '',
}: {
  options: Option[];
  onValueChange: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <select
      defaultValue={defaultValue || ''}
      onChange={(e) => onValueChange(e.target.value)}
      className={`p-2 border rounded bg-white text-sm ${className}`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
