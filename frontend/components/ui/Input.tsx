
import { ChangeEvent } from "react";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-950
          px-4
          py-3
          text-white
          placeholder:text-gray-500
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/30
        "
      />
    </div>
  );
}

