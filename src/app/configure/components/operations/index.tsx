import Select from "react-select";

import { OPERATIONS } from "@/const/operations";

interface OperationsConfigProps {
  configOperations: OPERATIONS[];
  setConfigOperations: (operations: OPERATIONS[]) => void;
}

export const OperationsConfig = ({
  configOperations,
  setConfigOperations,
}: OperationsConfigProps) => {
  return (
    <div>
      {Object.values(OPERATIONS).map((operation) => (
        <div key={operation}>{operation}</div>
      ))}
    </div>
  );
};

export default OperationsConfig;
