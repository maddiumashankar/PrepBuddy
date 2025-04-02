import React, { useState } from "react";
import { toast } from "sonner";

const HomePage: React.FC = () => {
  const [testType, setTestType] = useState<"predefined" | "custom">(
    "predefined"
  );
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "medium",
    duration: 60,
    questionCount: 20,
  });

  //   const handleLogout = async () => {
  //     try {
  //       await signOut();
  //       toast.success("Logged out successfully!");
  //     } catch (error) {
  //       console.error("Logout error:", error);
  //       toast.error("Failed to logout. Please try again.");
  //     }
  //   };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "questionCount" || name === "duration"
          ? parseInt(value)
          : value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Test created! Redirecting to test page...");
    console.log("Test configuration:", formData);
  };

  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Welcome to Aptitude Testing Platform
        </h1>

        {/* Test Selection Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-gray-700 mb-6">
            <button
              className={`px-4 py-2 ${
                testType === "predefined"
                  ? "border-b-2 border-indigo-500 text-indigo-400"
                  : "text-gray-400"
              } cursor-pointer`}
              onClick={() => setTestType("predefined")}
            >
              Popular Company Tests
            </button>
            <button
              className={`px-4 py-2 ${
                testType === "custom"
                  ? "border-b-2 border-indigo-500 text-indigo-400"
                  : "text-gray-400"
              } cursor-pointer`}
              onClick={() => setTestType("custom")}
            >
              Create Custom Test
            </button>
          </div>

          {testType === "predefined" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Google",
                "Microsoft",
                "Amazon",
                "Apple",
                "Meta",
                "Netflix",
              ].map((company) => (
                <div
                  key={company}
                  className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:bg-gray-700 transition cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-3">{company}</h3>
                  <p className="text-gray-300 mb-4">
                    Take the {company} aptitude test to practice for your
                    interview.
                  </p>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition cursor-pointer">
                    Start Test
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Create Custom Test</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="title">
                    Test Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Java Programming Test"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-300 mb-2"
                    htmlFor="difficulty"
                  >
                    Difficulty Level
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleFormChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition"
                >
                  Generate Test
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
