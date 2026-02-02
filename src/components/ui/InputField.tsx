"use client"

import React, { useId } from "react"

interface InputFieldProps {
  label?: string
  placeholder?: string
  value: string
  large?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  rows?: number
  className?: string
  error?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
}

export default function InputField({
  label,
  placeholder = "",
  value,
  large = false,
  onChange,
  type = "text",
  rows = 4,
  className = "",
  error,
  helperText,
  disabled = false,
  required = false,
  size = "md",
  icon,
}: InputFieldProps) {
  const id = useId()

  // Size-based styling
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  }

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <div className="flex justify-between mb-2">
          <label 
            htmlFor={id} 
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {helperText && !error && (
            <span className="text-sm text-gray-500">{helperText}</span>
          )}
        </div>
      )}

      {/* Input container with optional icon */}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        {large ? (
          <textarea
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            disabled={disabled}
            className={`
              block w-full rounded-lg border bg-white
              ${error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
              shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-opacity-50
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${sizeClasses[size]}
              ${icon ? "pl-10" : ""}
              resize-y
              ${className}
            `}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`
              block w-full rounded-lg border bg-white
              ${error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
              shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-opacity-50
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${sizeClasses[size]}
              ${icon ? "pl-10" : ""}
              ${className}
            `}
          />
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}