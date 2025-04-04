import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";
interface HeaderProps {
  userID: string;
}

const userProfileData = {
  testsAttended: 12,
  totalPoints: 875,
  rank: 5,
  recentTests: [
    { id: 1, name: "JavaScript Fundamentals", score: 85, date: "2025-03-28" },
    { id: 2, name: "React Concepts", score: 92, date: "2025-03-21" },
    { id: 3, name: "Data Structures", score: 78, date: "2025-03-15" },
  ],
  badges: [
    { id: 1, name: "First Test", description: "Completed your first test" },
    { id: 2, name: "Perfect Score", description: "Scored 100% on a test" },
    { id: 3, name: "Streak Master", description: "Completed 5 tests in a row" },
  ],
};

const Profile: React.FC<HeaderProps> = ({ userID }) => {
  const [user, setUser] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userID) return;

    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/register/getuser2/${userID}`,
          { withCredentials: true }
        );
        console.log("Profile response:", response.data);
        setUser(response.data.name || "");
        setProfilePic(response.data.profilepic || "");
        setEmail(response.data.email || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userID]);

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
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8 flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-32 w-32 border-2 border-indigo-500">
              <AvatarImage src={profilePic || ""} alt={user || "User"} />
              <AvatarFallback className="bg-indigo-600 text-xl">
                {user ? user.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              {!user ? (
                <div className="flex flex-col gap-3">
                  <div className="w-28 h-8 bg-gray-500 rounded-full animate-pulse"></div>
                  <div className="w-40 h-4 bg-gray-500 rounded-full animate-pulse"></div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{user || "User"}</h2>
                  <p className="text-gray-400">{email}</p>
                </>
              )}

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="bg-gray-700 px-4 py-2 rounded-lg flex flex-col items-center">
                  <span className="text-xl font-bold">
                    {userProfileData.testsAttended}
                  </span>
                  <span className="text-sm text-gray-300">Tests Attended</span>
                </div>

                <div className="bg-gray-700 px-4 py-2 rounded-lg flex flex-col items-center">
                  <span className="text-xl font-bold">
                    {userProfileData.totalPoints}
                  </span>
                  <span className="text-sm text-gray-300">Total Points</span>
                </div>
                <div className="bg-gray-700 px-4 py-2 rounded-lg flex flex-col items-center">
                  <span className="text-xl font-bold">
                    #{userProfileData.rank}
                  </span>
                  <span className="text-sm text-gray-300">Score Board Rank</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats and Recent Tests */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Recent Tests</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your latest test performances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfileData.recentTests.map((test) => (
                      <div
                        key={test.id}
                        className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                      >
                        <div>
                          <h4 className="font-medium">{test.name}</h4>
                          <p className="text-sm text-gray-400">{test.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-lg font-bold ${
                              test.score >= 90
                                ? "text-green-400"
                                : test.score >= 70
                                ? "text-yellow-400"
                                : "text-red-400"
                            }`}
                          >
                            {test.score}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-700 pt-4">
                  <a
                    href="/previous-tests"
                    className="text-indigo-400 hover:text-indigo-300 transition text-sm"
                  >
                    View all test history →
                  </a>
                </CardFooter>
              </Card>
            </div>

            {/* Badges Section */}
            <div>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription className="text-gray-400">
                    Achievements you've earned
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userProfileData.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="bg-gray-700 rounded-lg p-3 flex items-center gap-3"
                      >
                        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                          <svg
                            className="h-6 w-6 text-indigo-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">{badge.name}</h4>
                          <p className="text-xs text-gray-400">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-700 pt-4">
                  <Badge
                    variant="secondary"
                    className="bg-indigo-900 text-indigo-200 hover:bg-indigo-800"
                  >
                    {userProfileData.badges.length} Badges Earned
                  </Badge>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
