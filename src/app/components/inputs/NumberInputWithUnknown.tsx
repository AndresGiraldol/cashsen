"use client";

import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface InputNumberWithUnknownProps {
  id: string;
  label: string;
  placeholder?: string;
  isCurrency?: boolean; 
}

const InputNumberWithUnknown = ({ id, placeholder, isCurrency = false }: InputNumberWithUnknownProps) => {
  const { setValue, watch } = useFormContext();
  const value = watch(id);

  const isUnknown = value === null || value === undefined;

  const handleUnknown = (checked: boolean) => {
    if (checked) {
      setValue(id, null, { shouldValidate: true });
    } else {
      setValue(id, 0, { shouldValidate: true });
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-3">
        <NumericFormat
          id={id}
          allowLeadingZeros={false}
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          placeholder={placeholder}
          disabled={isUnknown}
          className="w-full px-0 py-2 text-xl font-normal border-0 border-b-2 border-neutral-400 focus:border-black focus:outline-none focus:ring-0 placeholder:text-neutral-300"
          value={isUnknown ? "" : value}
          onValueChange={(values) => {
            setValue(id, values.floatValue ?? null, { shouldValidate: true });
          }}
          prefix={isCurrency ? "$" : ""}
        />

      <label className="inline-flex items-center gap-2 text-neutral-700">
        <input
          type="checkbox"
          checked={isUnknown}
          onChange={(e) => handleUnknown(e.target.checked)}
        />
        No lo sé
      </label>
    </div>
  );
};

export default InputNumberWithUnknown;