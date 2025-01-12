"use client";

import { ContactFormProps } from '../types';

export default function ContactForm({
  formData,
  onChange,
  isDark
}: ContactFormProps) {
  const fields = [
    { id: 'email', label: 'Email:', type: 'email' },
    { id: 'phone', label: 'Phone:', type: 'tel' },
    { id: 'location', label: 'Location:', type: 'text' }
  ] as const;

  return (
    <>
      {fields.map(({ id, label, type }) => (
        <div key={id}>
          <label
            htmlFor={id}
            className="block mb-2 font-medium"
          >
            {label}
          </label>
          <input
            type={type}
            id={id}
            value={formData[id]}
            onChange={(e) => onChange(id, e.target.value)}
            required
            className={`w-full p-3 border rounded-md ${
              isDark
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      ))}
    </>
  );
}
