"use client";

import Select from "react-select";
import { useTranslations } from 'next-intl';
import { getComplexityOptions } from "@/const/complexity";

interface ComplexityConfigProps {
  configComplexity: number;
  setConfigComplexity: (complexity: number) => void;
}

export const ComplexityConfig = ({
  configComplexity,
  setConfigComplexity,
}: ComplexityConfigProps) => {
  const handleChange = (selectedOption: any) => {
    setConfigComplexity(selectedOption.value);
  };

  const t = useTranslations();

  const complexityOptions = getComplexityOptions(t);

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <p className="text-center text-lg font-medium text-gray-700">
        {t('select_complexity')}
      </p>

      <Select
        value={complexityOptions.find(
          ({ value }) => value === configComplexity
        )}
        onChange={handleChange}
        options={complexityOptions}
        className="react-select-container"
        classNamePrefix="react-select"
        isSearchable={false}
        styles={{
          control: (provided) => ({
            ...provided,
            borderRadius: "0.75rem",
            padding: "0.5rem",
            borderColor: "#d1d5db", // light gray border
            boxShadow: "none", // no shadow by default
            "&:hover": {
              borderColor: "#6366f1", // blue on hover
            },
          }),
          menu: (provided) => ({
            ...provided,
            borderRadius: "0.75rem",
            marginTop: "0.25rem",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#6366f1" // blue for selected option
              : state.isFocused
              ? "#e5e7eb" // light gray when focused
              : "white",
            color: state.isSelected ? "white" : "#4b5563", // white for selected option text
            padding: "0.75rem 1.5rem",
          }),
        }}
      />
    </div>
  );
};

export default ComplexityConfig;
