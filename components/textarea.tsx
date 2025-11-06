import React from 'react';
import ExclamationCircleIcon from './icons/ExclamationCircleIcon';

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  id: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  error,
  autoComplete,
  rows = 4,
  ...props
}) => {
  const hasError = !!error;

  const baseClasses =
    'block w-full px-4 py-3 text-sm text-gray-900 bg-white border rounded-md shadow-sm appearance-none focus:outline-none transition-colors duration-200 resize-none';

  const stateClasses = hasError
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 pr-10'
    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500';

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          rows={rows}
          className={`${baseClasses} ${stateClasses}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          {...props}
        />
        {hasError && (
          <div className="absolute top-3 right-3 flex items-start pointer-events-none">
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

export default TextareaField;
