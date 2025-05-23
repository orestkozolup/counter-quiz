"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCalculator } from "./useCalculator";
import { useStoreContext } from "@/contexts/StoreContext";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SettingsAnchor from "@/components/settings-anchor";

const Game = () => {
  const { generateQuestion } = useCalculator();
  const { addScore } = useStoreContext();
  const router = useRouter();

  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [currentScore, setCurrentScore] = useState(0);

  const t = useTranslations();

  useEffect(() => {
    const { question: newQuestion, answer: newAnswer } = generateQuestion();

    setQuestion(newQuestion);
    setAnswer(newAnswer);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentScore) {
        addScore(currentScore.toString(), new Date());
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentScore, addScore]);

  const handleSubmit = () => {
    const isCorrectAnswer = answer === parseFloat(inputValue ?? "");

    if (isCorrectAnswer) {
      setResult(`✅ ${t("correct_result")}!`);
      setCurrentScore((prev) => prev + 1);
    } else {
      setResult(`❌ ${t("wrong")}: ${answer}`);
    }
    setInputValue(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const pattern = /^[0-9.,-]*$/;

    if (pattern.test(value)) {
      const normalized = value.replace(/,/g, ".");
      setInputValue(normalized);
    }
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const isDivisionIncluded = question.includes("/");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-gray-800 space-y-4">
      <SettingsAnchor />
      <div className="w-full max-w-xs p-6 bg-white rounded-xl shadow-md text-center space-y-4">
        <Link
          href="/scores"
          className="text-sm text-blue-600 underline block text-left"
        >
          {t("scores_table")}
        </Link>

        <div className="text-lg font-semibold">
          {t("current_score")}: {currentScore}
        </div>

        <div className="text-2xl font-bold">{question} ?</div>

        {result === null && (
          <>
            <Input
              type="text"
              onChange={handleChange}
              value={inputValue === null ? "" : inputValue.toString()}
              placeholder={t("enter_answer")}
              onKeyDown={handleKeyDown}
            />

            {isDivisionIncluded && (
              <div className="mt-4 text-sm text-yellow-600 bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                ⚠️ {t("decimal_warning")}
              </div>
            )}

            <Button onClick={handleSubmit} className="w-full">
              {t("submit")}
            </Button>
          </>
        )}

        {result && <div className="text-lg font-medium">{result}</div>}

        <Button
          onClick={handleNextClick}
          className="w-full"
          variant="secondary"
        >
          {t("next_question")}
        </Button>
      </div>

      <Button
        onClick={handleEndGame}
        className="w-full max-w-xs"
        variant="destructive"
      >
        {t("end_game")}
      </Button>
    </div>
  );
};

export default Game;
