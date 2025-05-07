"use client";

import { useFormContext } from "react-hook-form";

interface InputTextProps {
  id: string;
  placeholder?: string;
}

export default function InputText({ id, placeholder }: InputTextProps) {
  const { register } = useFormContext();

  return (
    <input
      id={id}
      {...register(id)}
      placeholder={placeholder}
      className="w-full px-0 py-2 mt-3 text-xl font-normal border-0 border-b-2 border-neutral-400 focus:border-black focus:outline-none focus:ring-0 placeholder:text-neutral-300"
    />
  );
}