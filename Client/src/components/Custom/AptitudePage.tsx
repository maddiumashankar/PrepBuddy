import { Link } from "react-router-dom";
const aptitudeTopics = [
  "Quantitative Aptitude",
  "Logical Reasoning",
  "Verbal Ability",
  "Data Interpretation",
  "Arithmetic",
  "Number Series",
  "Time & Work",
  "Profit & Loss",
  "Percentages",
  "Probability",
];



const AptitudePage = () => {
  return (
    <div className="text-white px-6 py-10 min-h-screen bg-[#0f172a]">
      <h1 className="text-4xl font-bold text-center text-indigo-400 mb-4">
        Aptitude Questions Practice
      </h1>
      <p className="text-center text-gray-400 mb-10">
        Choose an aptitude area to start practicing and boost your problem-solving skills.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {aptitudeTopics.map((topic, index) => (
          <Link to={`/quiz/${encodeURIComponent(topic)}`} key={index}>
            <div className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-5 rounded-lg shadow-md text-center font-medium text-lg transition duration-300 cursor-pointer">
              {topic}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
 export default AptitudePage;
