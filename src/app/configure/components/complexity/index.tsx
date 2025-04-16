"use client";

import Select from "react-select";

import { COMPLEXITY_OPTIONS } from "@/const/complexity";

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

  return (
    <div>
      <p>Select complexity level</p>
      <Select
        value={COMPLEXITY_OPTIONS.find(
          ({ value }) => value === configComplexity
        )}
        onChange={handleChange}
        options={COMPLEXITY_OPTIONS}
      />
    </div>
  );
};

export default ComplexityConfig;
