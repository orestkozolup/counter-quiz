"use client";

import { useTranslations } from "next-intl";
import { getComplexityOptions } from "@/const/complexity";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ComplexityConfigProps {
  configComplexity: number;
  setConfigComplexity: (complexity: number) => void;
}

export const ComplexityConfig = ({
  configComplexity,
  setConfigComplexity,
}: ComplexityConfigProps) => {
  const handleChange = (selectedOption: string) => {
    setConfigComplexity(parseInt(selectedOption));
  };

  const t = useTranslations();

  const complexityOptions = getComplexityOptions(t);

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <p className="text-center text-lg font-medium text-gray-700">
        {t("select_complexity")}
      </p>

      <Select value={configComplexity?.toString()} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Complexity" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {complexityOptions.map(({ value, label }) => (
              <SelectItem value={value.toString()} key={label}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ComplexityConfig;
