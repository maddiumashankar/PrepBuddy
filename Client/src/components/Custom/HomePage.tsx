import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
interface HeaderProps {
  userID: string;
}

const HomePage: React.FC<HeaderProps> = ({ userID }) => {
  const [testType, setTestType] = useState<"predefined" | "custom">(
    "predefined"
  );
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "Medium",
    duration: 60,
    questionCount: 20,
  });
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(false);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/register/getuser2/${userID}`,
          { withCredentials: true }
        );
        console.log("Server Response (Name):", response.data.name);
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userID]);

  const addTest = async () => {
    console.log("Adding test with title:", title);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/test/addtest`,
        {
          title: title,
          difficulty: difficulty,
          userid: userID,
          createdAt: new Date(),
        },
        { withCredentials: true }
      );
      console.log("Server Response data:", response.data);
      navigate("/testpage");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
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
  if (confirmation) {
    return (
      <div className="flex absolute top-0 justify-center items-center h-screen bg-gray-900 w-full z-50">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-8 text-white w-[90%] max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Test Confirmation</h1>
          <p className="text-lg mb-2">
            <span className="font-semibold text-indigo-400">Company:</span>{" "}
            {title}
          </p>
          <p className="text-lg mb-6">
            <span className="font-semibold text-indigo-400">Difficulty:</span>{" "}
            {difficulty}
          </p>

          <div className="flex justify-center gap-8">
            <button
              onClick={() => {
                setConfirmation(false);
              }}
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg cursor-pointer font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={addTest}
              className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg cursor-pointer font-medium transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Welcome <span className="text-indigo-500">{userName}</span> to
          PrepBuddy! Get ready to test your skills!
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
            <>
              <p className="mt-2 flex mx-auto justify-center items-center font-bold text-3xl text-indigo-500 text-center">
                MAANG Companies
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {["Meta", "Apple", "Amazon", "Netflix", "Google"].map(
                  (company) => (
                    <div
                      key={company}
                      className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:bg-gray-900 transition "
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold mb-3">
                          {company}
                        </h3>
                        <div>
                          <img
                            src={`https://logo.clearbit.com/${company.toLowerCase()}.com`}
                            alt={`${company} logo`}
                            width={50}
                          />
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Take the {company} aptitude test to practice for your
                        interview.
                      </p>
                      <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition cursor-pointer"
                        onClick={() => {
                          setTitle(company);
                          setDifficulty("Medium");
                          setConfirmation(true);
                        }}
                      >
                        Start Test
                      </button>
                    </div>
                  )
                )}
              </div>
              <p className="mt-7 flex mx-auto justify-center items-center font-bold text-3xl text-indigo-500 text-center">
                Tier-1 Companies
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Microsoft",
                  "Adobe",
                  "VMware",
                  "Cisco",
                  "Uber",
                  "Twitter",
                  "Oracle",
                ].map((company) => (
                  <div
                    key={company}
                    className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:bg-gray-900 transition "
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold mb-3">{company}</h3>
                      <div>
                        <img
                          src={`https://logo.clearbit.com/${company.toLowerCase()}.com`}
                          alt={`${company} logo`}
                          width={50}
                        />
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Take the {company} aptitude test to practice for your
                      interview.
                    </p>
                    <button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition cursor-pointer"
                      onClick={() => {
                        setTitle(company);
                        setDifficulty("Medium");
                        setConfirmation(true);
                      }}
                    >
                      Start Test
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-7 flex mx-auto justify-center items-center font-bold text-3xl text-indigo-500 text-center">
                Growing Startups / Unicorns
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Zomato",
                  "Swiggy",
                  "Byjus",
                  "Flipkart",
                  "Paytm",
                  "Razorpay",
                  "PhonePe",
                  "Meesho",
                  "Ola",
                  "Unacademy",
                ].map((company) => (
                  <div
                    key={company}
                    className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:bg-gray-900 transition "
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold mb-3">{company}</h3>
                      <div>
                        <img
                          src={`https://logo.clearbit.com/${company.toLowerCase()}.com`}
                          alt={`${company} logo`}
                          width={50}
                        />
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Take the {company} aptitude test to practice for your
                      interview.
                    </p>
                    <button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition cursor-pointer"
                      onClick={() => {
                        setTitle(company);
                        setDifficulty("Medium");
                        setConfirmation(true);
                      }}
                    >
                      Start Test
                    </button>
                  </div>
                ))}
              </div>
            </>
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
                    <option value="Medium">Medium</option>
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
