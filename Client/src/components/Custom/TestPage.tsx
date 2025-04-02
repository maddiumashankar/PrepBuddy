import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { toast } from "sonner";

const questionsData = [
  {
    id: 1,
    question: "What is the time complexity of binary search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: "O(log n)",
  },
  {
    id: 2,
    question: "Which data structure uses LIFO (Last In First Out)?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    correctAnswer: "Stack",
  },
  {
    id: 3,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Machine Learning",
      "Home Tool Markup Language",
      "Hyperlink Text Management Logic",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    id: 4,
    question:
      "Which sorting algorithm has the worst-case time complexity of O(n²)?",
    options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
    correctAnswer: "Bubble Sort",
  },
  {
    id: 5,
    question: "What is the output of: console.log(typeof NaN)?",
    options: ["NaN", "undefined", "number", "object"],
    correctAnswer: "number",
  },
  {
    id: 6,
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["string", "boolean", "character", "object"],
    correctAnswer: "character",
  },
  {
    id: 7,
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Sequential Question Language",
      "Standard Query Logic",
      "System Quality Link",
    ],
    correctAnswer: "Structured Query Language",
  },
  {
    id: 8,
    question: "Which HTTP status code represents 'Not Found'?",
    options: ["200", "404", "500", "301"],
    correctAnswer: "404",
  },
  {
    id: 9,
    question: "What is the correct way to declare a JavaScript variable?",
    options: ["v myVar;", "variable myVar;", "var myVar;", "int myVar;"],
    correctAnswer: "var myVar;",
  },
  {
    id: 10,
    question:
      "Which of these is NOT a valid way to create a function in JavaScript?",
    options: [
      "function myFunc() {}",
      "const myFunc = function() {}",
      "const myFunc = () => {}",
      "function = myFunc() {}",
    ],
    correctAnswer: "function = myFunc() {}",
  },
];

const TestPage = () => {
  const [currentTime, setCurrentTime] = useState(10 * 60);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
    Array(questionsData.length).fill(null)
  );
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    if (currentTime <= 0 || isTestSubmitted) return;
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
  }, [currentTime, isTestSubmitted]);

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
    if (isTestSubmitted) return;

    const score = userAnswers.reduce((total, answer, index) => {
      return answer === questionsData[index].correctAnswer ? total + 1 : total;
    }, 0);

    const percentage = Math.round((score / questionsData.length) * 100);

    toast.success(
      `Test submitted! Your score: ${score}/${questionsData.length} (${percentage}%)`
    );
    setIsTestSubmitted(true);

    // setTimeout(() => {
    //   navigate("/dashboard");
    // }, 3000);
  };
  const incrementSlideNo = () => {
    const newValue = currentSlide + 1;
    setCurrentSlide(newValue);
    console.log(newValue); // Logs the correct upcoming value
  };

  const decrementSlideNo = () => {
    const newValue = currentSlide - 1;
    setCurrentSlide(newValue);
    console.log(newValue); // Logs the correct upcoming value
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white w-full">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 mr-2 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-xl font-bold">Aptitude Test</span>
          </div>

          <div className="flex items-center">
            <div className="bg-gray-700 px-4 py-2 rounded-md flex items-center">
              <svg
                className="h-5 w-5 mr-2 text-indigo-600"
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

      {/* Progress bar */}
      <div className="bg-gray-800 py-2 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm text-gray-300">
              {userAnswers.filter((ans) => ans !== null).length} /{" "}
              {questionsData.length} answered
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (userAnswers.filter((ans) => ans !== null).length /
                    questionsData.length) *
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
            {questionsData.map((question, index) => (
              <CarouselItem key={question.id}>
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-indigo-500">
                      Question {index + 1}
                    </h3>
                    <span className="bg-gray-700 px-2 py-1 rounded text-sm">
                      {index + 1} of {questionsData.length}
                    </span>
                  </div>

                  <p className="text-lg mb-6">{question.question}</p>

                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <div
                        key={option}
                        className={`border border-gray-700 rounded-md p-3 cursor-pointer transition-colors ${
                          userAnswers[index] === option
                            ? "bg-indigo-600 border-indigo-500"
                            : "hover:bg-gray-700"
                        }`}
                        onClick={() =>
                          !isTestSubmitted && handleSelectOption(index, option)
                        }
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
              onClick={() => {
                decrementSlideNo();
              }}
            >
              <CarouselPrevious className="relative left-0 right-auto bg-gray-800 border-gray-700 hover:bg-gray-700 text-white cursor-pointer" />
            </div>
            <button
              onClick={handleSubmitTest}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isTestSubmitted}
            >
              Submit Test
            </button>
            <div
              onClick={() => {
                incrementSlideNo();
              }}
            >
              <CarouselNext className="relative right-0 left-auto bg-gray-800 border-gray-700 hover:bg-gray-700 text-white cursor-pointer" />
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
