"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface SelectInputProps {
  id: string;
  options: string[];
}

const SelectInput = ({ id, options }: SelectInputProps) => {
  const { register, setValue, watch } = useFormContext();
  const selectedValue = watch(id);
  const [customValue, setCustomValue] = useState("");

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomValue(value);
    setValue("customGoal", value); 
  };

  useEffect(() => {
    if (selectedValue !== "Otro") {
      setCustomValue("");
    }
  },[selectedValue]);

  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="inline-flex flex-col items-stretch min-w-[15rem] max-w-full gap-2">
        {options.map((option, index) => {
          const optionId = `${id}-${index}`;
          return (
            <div key={optionId} className="relative flex items-center">
              <input
                type="radio"
                id={optionId}
                value={option}
                {...register(id)}
                className="w-0 h-0 opacity-0 pointer-events-none peer"
              />
              <label
                htmlFor={optionId}
                className="w-full px-1.5 py-1 border text-indigo-800 rounded bg-indigo-50 border-indigo-300 
                  peer-checked:bg-indigo-200 peer-checked:border-indigo-600 
                  peer-checked:[&>.letter]:bg-indigo-400 peer-focus:[&>.letter]:bg-indigo-400 
                  peer-checked:[&>.letter]:text-white peer-focus:[&>.letter]:text-white 
                  peer-checked:[&>.letter]:border-indigo-600 peer-focus:[&>.letter]:border-indigo-600 
                  peer-focus:bg-indigo-200 peer-focus:border-indigo-600 peer-focus:text-indigo-700"
              >
                <span className="px-2 py-px uppercase bg-white border border-indigo-300 rounded letter">
                  {String.fromCharCode(97 + index)}
                </span>
                <span className="ml-2">{option}</span>
              </label>
            </div>
          );
        })}
      </div>
      {/* Mostrar campo de texto si elige "Otro" */}
      {(selectedValue === "Otro" || (!options.includes(selectedValue) && selectedValue !== "")) && (
        <input
          type="text"
          value={customValue}
          onChange={handleCustomChange}
          placeholder={"Describe tu objetivo"}
          className="w-full px-0 py-2 text-xl font-normal border-0 border-b-2 border-indigo-600 focus:outline-none focus:ring-0 placeholder:text-neutral-300"
        />
      )}
    </div>

    
  );
};

export default SelectInput;