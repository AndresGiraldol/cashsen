"use client";

import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface CurrencyInputProps {
  id: string;
  placeholder?: string;
}

export default function CurrencyInput({ id, placeholder }: CurrencyInputProps) {
  const { watch, setValue } = useFormContext();

  return (
    <NumericFormat
      id={id}
      value={watch(id)}
      onValueChange={(values) => {
        setValue(id, values.floatValue || 0);
      }}
      allowLeadingZeros={false}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      prefix="$ "
      placeholder={placeholder}
      className="w-full px-0 py-2 mt-3 text-xl font-normal border-0 border-b-2 border-neutral-400 focus:border-black focus:outline-none focus:ring-0 placeholder:text-neutral-300"
    />
  );
}