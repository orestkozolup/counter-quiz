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

  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.values(OPERATIONS).map((operation) => {
        const isSelected = configOperations.includes(operation);

        return (
          <div
            key={operation}
            className={`p-2 border rounded cursor-pointer transition 
              ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            onClick={() => handleClick(operation)}
          >
            {operation}
          </div>
        );
      })}
    </div>
  );
};

export default OperationsConfig;
