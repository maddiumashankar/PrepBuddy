import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { toast } from "sonner";
import geminiPrompt from "../../gemini/prompt";
import { AIchatSession } from "../../gemini/AiModel";
import questionsData from "../../gemini/sampleSet";

console.log(geminiPrompt);
const questions = geminiPrompt
  .split("<questions>")[1]
  .split("*")
  .map((question) => question.trim());
console.log(questions);
const options = geminiPrompt
  .split("<options>")[1]
  .split("*")
  .map((option) => option.trim().split(","));
console.log(options);
const answers = geminiPrompt
  .split("<answers>")[1]
  .split("*")
  .map((answer) => answer.trim());
console.log(answers);

const TestPage = () => {
  const [currentTime, setCurrentTime] = useState(10 * 60);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );
  const [currentSlide, setCurrentSlide] = useState(1);
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const [geminiQuestions, setGeminiQuestions] = useState<string[]>([]);
  const [geminiOptions, setGeminiOptions] = useState<string[][]>([]);
  const [geminiAnswers, setGeminiAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentTime <= 0) return;
    const timer = setInterval(() => {
      setCurrentTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          toast.warning("Time's up! Your test is being submitted.");
          handleSubmitTest();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentTime, geminiQuestions, geminiOptions, geminiAnswers]);

  useEffect(() => {
    console.log(geminiQuestions, geminiOptions, geminiAnswers);
  }, [geminiQuestions, geminiOptions, geminiAnswers]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSelectOption = (questionIndex: number, option: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleSubmitTest = () => {
    console.log(userAnswers);
    const score = userAnswers.reduce((total, answer, index) => {
      return answer?.trim() === geminiAnswers[index].trim() ? total + 1 : total;
    }, 0);

    const percentage = Math.round((score / questions.length) * 100);

    console.log(score, percentage, "%");
  };

  const incrementSlideNo = () => {
    const newValue = currentSlide + 1;
    setCurrentSlide(newValue);
  };
  const decrementSlideNo = () => {
    const newValue = currentSlide - 1;
    setCurrentSlide(newValue);
  };

  const changeSlide = (targetIndex: number) => {
    if (targetIndex + 1 > currentSlide) {
      for (let i = currentSlide; i < targetIndex + 1; i++) {
        nextRef.current?.click();
      }
    } else if (targetIndex + 1 < currentSlide) {
      for (let i = currentSlide; i > targetIndex + 1; i--) {
        prevRef.current?.click();
      }
    } else {
      return;
    }
    const newValue = targetIndex + 1;
    setCurrentSlide(newValue);
  };

  //Calling Gemini
  const GenerateQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await AIchatSession.sendMessage(geminiPrompt);
      const geminiQues =
        result.response?.candidates?.[0]?.content?.parts?.[0]?.text
          ?.split("<questions>")[1]
          .split("*")
          .map((question) => question.trim());

      setGeminiQuestions(geminiQues ?? []);

      const geminiOps =
        result.response?.candidates?.[0]?.content?.parts?.[0]?.text
          ?.split("<options>")[1]
          .split("*")
          .map((option) => option.trim().split(","));

      setGeminiOptions(geminiOps ?? []);

      const geminiAns =
        result.response?.candidates?.[0]?.content?.parts?.[0]?.text
          ?.split("<answers>")[1]
          .split("*")
          .map((answer) => answer.trim());

      setGeminiAnswers(geminiAns ?? []);

      setLoading(false);
    } catch (error) {
      console.error("Error generating summary:", error);
    }
  };
  if (loading) {
    return (
      <>
        <div className="flex absolute top-0 justify-center items-center h-screen bg-gray-900 w-full z-99">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-b-blue-500 rounded-full animate-spin"></div>
            <p className="text-white mt-4 text-lg font-semibold">Loading...</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white w-full">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-end items-center">
          <div className="flex items-center">
            <div className="bg-gray-700 px-4 py-2 rounded-md flex items-center">
              <svg
                className="h-5 w-5 mr-2 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-mono">{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gray-800 py-2 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm text-gray-300">
              {userAnswers.filter((ans) => ans !== null).length} /{" "}
              {questions.length} answered
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (userAnswers.filter((ans) => ans !== null).length /
                    questions.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {geminiQuestions.map((question, index) => (
              <CarouselItem key={index}>
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-indigo-500">
                      Question {index + 1}
                    </h3>
                    <span className="bg-gray-700 px-2 py-1 rounded text-sm">
                      {index + 1} of {geminiQuestions.length}
                    </span>
                  </div>

                  <p className="text-lg mb-6">{question}</p>

                  <div className="space-y-3">
                    {geminiOptions[index].map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`border border-gray-700 rounded-md p-3 cursor-pointer transition-colors ${
                          userAnswers[index] === option
                            ? "bg-indigo-600 border-indigo-500"
                            : "hover:bg-gray-700"
                        }`}
                        onClick={() => handleSelectOption(index, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-between items-center mt-6">
            <div
              aria-disabled={currentSlide <= 1}
              onClick={() => {
                decrementSlideNo();
              }}
            >
              <CarouselPrevious
                className="relative right-0 left-auto bg-gray-800 border-gray-700 hover:bg-gray-700 text-white cursor-pointer"
                ref={prevRef}
              />
            </div>
            <div
              onClick={handleSubmitTest}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Test
            </div>
            <div
              onClick={GenerateQuestions}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              generate
            </div>
            <div
              aria-disabled={currentSlide === 10}
              onClick={() => {
                incrementSlideNo();
              }}
            >
              <CarouselNext
                className="relative right-0 left-auto bg-gray-800 border-gray-700 hover:bg-gray-700 text-white cursor-pointer"
                ref={nextRef}
              />
            </div>
          </div>
        </Carousel>

        {/* Question navigator */}
        <div className="mt-8 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-3">Questions Navigator</h3>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {questionsData.map((_, index) => (
              <button
                key={index}
                className={`h-10 w-10 rounded-md flex items-center justify-center ${
                  userAnswers[index] !== null
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-gray-300 border border-gray-700"
                } cursor-pointer hover:bg-gray-700`}
                onClick={() => {
                  changeSlide(index);
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestPage;
