import React from 'react';

interface TimeSelectorProps {
  label: string;
  value: string;
  onChange: (time: string) => void;
  minTime?: string;
  disabled?: boolean;
}

export function TimeSelector({ label, value, onChange, minTime, disabled }: TimeSelectorProps) {
  const hours = Array.from({ length: 13 }, (_, i) => i + 9);
  const minutes = [0, 15, 30, 45];

  const timeOptions = hours.flatMap(hour =>
    minutes.map(minute => {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      return {
        value: timeString,
        disabled: minTime ? timeString <= minTime : false,
      };
    })
  );

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">Select time</option>
        {timeOptions.map(({ value: timeValue, disabled: isDisabled }) => (
          <option key={timeValue} value={timeValue} disabled={isDisabled}>
            {timeValue}
          </option>
        ))}
      </select>
    </div>
  );
}