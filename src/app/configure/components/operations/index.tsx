import { Dispatch, SetStateAction } from "react";
import { OPERATIONS } from "@/const/operations";

interface OperationsConfigProps {
  configOperations: OPERATIONS[];
  setConfigOperations: Dispatch<SetStateAction<OPERATIONS[]>>;
}

export const OperationsConfig = ({
  configOperations,
  setConfigOperations,
}: OperationsConfigProps) => {
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
        Choose the mathematical operations
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
              {operation}
            </button>
          );
        })}
      </div>

      {isDivisionIncluded && (
        <div className="mt-4 text-sm text-yellow-600 bg-yellow-50 border border-yellow-200 p-3 rounded-md">
          ⚠️ This question may include division. If the result is not a whole
          number, round your answer to <strong>1 decimal place</strong>.
        </div>
      )}
    </div>
  );
};

export default OperationsConfig;
