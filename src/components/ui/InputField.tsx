"use client";
import React from "react";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  large?: boolean; // multi-line inputs
}

export default function InputField({ label, placeholder, value, onChange, large }: InputFieldProps) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label className="text-gray-700 font-medium">{label}</label>
      {large ? (
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={4}
        />
      ) : (
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}