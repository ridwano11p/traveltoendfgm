"use client";

interface Props {
  icon: React.ReactNode;
  label: string;
  value: string;
  isDark: boolean;
}

export default function ContactItem({ icon, label, value, isDark }: Props) {
  return (
    <div className="flex items-center mb-4">
      <div className={`mr-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
        {icon}
      </div>
      <div>
        <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}
        </p>
        <p className={isDark ? 'text-white' : 'text-gray-800'}>
          {value}
        </p>
      </div>
    </div>
  );
}
