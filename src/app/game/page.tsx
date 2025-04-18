"use client";

import { useCalculator } from "./useCalculator";
import Link from "next/link";
import { useState, useEffect } from "react";

export const Game = () => {
  const { generateQuestion } = useCalculator();

  useEffect(() => {
    const { question: newQuestion, answer: newAnswer } = generateQuestion();
    setQuestion(newQuestion);
    setAnswer(newAnswer);
  }, []);

  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [currentScore, setCurrentScore] = useState(0);

  const handleSubmit = () => {
    const isCorrectAnswer = answer === inputValue;

    if (isCorrectAnswer) {
      setResult("✅ Correct!");
      setCurrentScore((prev) => prev + 1);
    } else {
      setResult(`❌ Wrong. Correct answer: ${answer}`);
    }
    setInputValue(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(parseInt(value));
  };

  const handleNextClick = () => {
    const { question: newQuestion, answer: newAnswer } = generateQuestion();
    setQuestion(newQuestion);
    setAnswer(newAnswer);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <div className="w-full max-w-xs p-6 bg-white rounded-xl shadow-md text-center space-y-4">
        <Link
          href="/scores"
          className="text-sm text-blue-600 underline block text-left"
        >
          ← Scores
        </Link>

        <div className="text-lg font-semibold">
          Current Score: {currentScore}
        </div>

        <div className="text-2xl font-bold">{question} ?</div>

        {result === null && (
          <input
            type="number"
            onChange={handleChange}
            value={inputValue === null ? "" : inputValue.toString()}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your answer"
          />
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
        >
          Submit
        </button>

        {result && <div className="text-lg font-medium">{result}</div>}

        <button
          onClick={handleNextClick}
          className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default Game;
