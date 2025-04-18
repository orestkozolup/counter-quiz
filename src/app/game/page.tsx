"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCalculator } from "./useCalculator";
import { useStoreContext } from "@/contexts/StoreContext";

export const Game = () => {
  const { generateQuestion } = useCalculator();
  const { addScore } = useStoreContext();
  const router = useRouter();

  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const { question: newQuestion, answer: newAnswer } = generateQuestion();
    setQuestion(newQuestion);
    setAnswer(newAnswer);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      addScore(currentScore.toString(), new Date());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentScore, addScore]);

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
    const normalized = value.replace(",", ".");
    const parsed = parseFloat(normalized);
    setInputValue(isNaN(parsed) ? null : parsed);
  };

  const handleNextClick = () => {
    const { question: newQuestion, answer: newAnswer } = generateQuestion();
    setQuestion(newQuestion);
    setAnswer(newAnswer);
    setResult(null);
  };

  const handleEndGame = () => {
    addScore(currentScore.toString(), new Date());
    router.push("/welcome");
  };

  const isDivisionIncluded = question.includes("/");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 space-y-4">
      <div className="w-full max-w-xs p-6 bg-white rounded-xl shadow-md text-center space-y-4">
        <Link
          href="/scores"
          className="text-sm text-blue-600 underline block text-left"
        >
          Scores
        </Link>

        <div className="text-lg font-semibold">
          Current Score: {currentScore}
        </div>

        <div className="text-2xl font-bold">{question} ?</div>

        {result === null && (
          <>
            <input
              type="number"
              onChange={handleChange}
              value={inputValue === null ? "" : inputValue.toString()}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your answer"
            />

            {isDivisionIncluded && (
              <div className="mt-4 text-sm text-yellow-600 bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                ⚠️ This question includes division. If the result is not a whole
                number, round your answer to <strong>1 decimal place</strong>.
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            >
              Submit
            </button>
          </>
        )}

        {result && <div className="text-lg font-medium">{result}</div>}

        <button
          onClick={handleNextClick}
          className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          Next Question
        </button>
      </div>

      <button
        onClick={handleEndGame}
        className="w-full max-w-xs py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition shadow-md"
      >
        End Game
      </button>
    </div>
  );
};

export default Game;
