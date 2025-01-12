"use client";

import { ContentEditorProps } from '../types';

const contentFields = [
  { id: 'mission', label: 'Our Mission' },
  { id: 'approach', label: 'Our Approach' },
  { id: 'impact', label: 'Our Impact' }
] as const;

export default function ContentEditor({ content, onUpdate, isDark }: ContentEditorProps) {
  return (
    <>
      {contentFields.map(({ id, label }) => (
        <div key={id}>
          <label
            htmlFor={id}
            className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
          >
            {label}
          </label>
          <textarea
            id={id}
            value={content[id]}
            onChange={(e) => onUpdate(id, e.target.value)}
            required
            minLength={20}
            rows={5}
            className={`w-full px-3 py-2 border rounded-md ${
              isDark
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-300'
            }`}
          />
        </div>
      ))}
    </>
  );
}
