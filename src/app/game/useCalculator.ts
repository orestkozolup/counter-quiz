import { useStoreContext } from "@/contexts/StoreContext";
import { OPERATION_SIGNS, OPERATIONS } from "@/const/operations";

export const useCalculator = () => {
  const { complexity, operations } = useStoreContext();

  const getRandomNumber = () => {
    let upperBoundary = 0;

    switch (complexity) {
      case 0:
        upperBoundary = 9;
        break;
      case 1:
        upperBoundary = 99;
        break;
      case 2:
        upperBoundary = 999;
        break;
      default:
        upperBoundary = 9;
    }

    return Math.floor(Math.random() * upperBoundary);
  };

  const getRandomOperation = () => {
    const randomIndex = Math.floor(Math.random() * operations.length);
    return operations[randomIndex];
  };

  const generateQuestion = () => {
    const operandOne = getRandomNumber();
    const operandTwo = getRandomNumber();

    const operation = getRandomOperation();

    const question = `${operandOne} ${OPERATION_SIGNS[operation]} ${operandTwo}`;

    let answer: number;

    switch (operation) {
      case OPERATIONS.ADDITION:
        answer = operandOne + operandTwo;
        break;
      case OPERATIONS.SUBTRACTION:
        answer = operandOne - operandTwo;
        break;
      case OPERATIONS.MULTIPLICATION:
        answer = operandOne * operandTwo;
        break;
      case OPERATIONS.DIVISION:
        answer = Number((operandOne / operandTwo).toFixed(1));
        break;
      default:
        answer = 0;
    }

    return { question, answer };
  };

  return {
    generateQuestion,
  };
};
