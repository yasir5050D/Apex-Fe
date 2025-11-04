import React from 'react';
import ExclamationCircleIcon from './icons/ExclamationCircleIcon';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = 'text',
  name,
  value,
  onChange,
  error,
  autoComplete
}) => {
  const hasError = !!error;

  const baseClasses = "block w-full px-4 py-3 text-sm text-gray-900 bg-white border rounded-md shadow-sm appearance-none focus:outline-none transition-colors duration-200";
  const stateClasses = hasError
    ? "border-red-500 focus:ring-red-500 focus:border-red-500 pr-10"
    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`${baseClasses} ${stateClasses}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
        />
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {hasError && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;