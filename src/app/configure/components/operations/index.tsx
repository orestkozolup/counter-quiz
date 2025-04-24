import { Dispatch, SetStateAction } from "react";
import { OPERATIONS } from "@/const/operations";

import { useTranslations } from 'next-intl';

interface OperationsConfigProps {
  configOperations: OPERATIONS[];
  setConfigOperations: Dispatch<SetStateAction<OPERATIONS[]>>;
}

export const OperationsConfig = ({
  configOperations,
  setConfigOperations,
}: OperationsConfigProps) => {
  const t = useTranslations();

  const handleClick = (operation: OPERATIONS) => {
    setConfigOperations((prevOperations: OPERATIONS[]) => {
      if (prevOperations.includes(operation)) {
        return prevOperations.filter((op: OPERATIONS) => op !== operation);
      }
      return [...prevOperations, operation];
    });
  };

  const isDivisionIncluded = configOperations.includes(OPERATIONS.DIVISION);

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-6 bg-white rounded-xl shadow-md space-y-4">
      <p className="text-center text-base font-medium text-gray-700">
        {t('choose_operations')}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {Object.values(OPERATIONS).map((operation) => {
          const isSelected = configOperations.includes(operation);

          return (
            <button
              key={operation}
              onClick={() => handleClick(operation)}
              className={`py-3 rounded-lg text-lg font-semibold transition 
                ${
                  isSelected
                    ? "bg-indigo-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
            >
              {t(operation)}
            </button>
          );
        })}
      </div>

      {isDivisionIncluded && (
        <div className="mt-4 text-sm text-yellow-600 bg-yellow-50 border border-yellow-200 p-3 rounded-md">
          ⚠️ {t('decimal_warning')}
        </div>
      )}
    </div>
  );
};

export default OperationsConfig;
