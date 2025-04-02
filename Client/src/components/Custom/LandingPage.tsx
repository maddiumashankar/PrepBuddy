import { Link } from "react-router-dom";
import BackgroundBeamsWithCollision from "../ui/background-beams-with-collision";
const LandingPage = () => {
  const handleLogin = async () => {};

  const GoogleLoginButton = ({ className = "", variant = "default" }) => (
    <button
      onClick={handleLogin}
      className={`
        relative inline-flex items-center justify-center transition-colors 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 
        focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none 
        ${
          variant === "default"
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
        }
        ${className}
      `}
    >
      <div className="flex items-center">
        <svg
          className="mr-2 h-5 w-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Login with Google
      </div>
    </button>
  );

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Aptitude Training",
      description:
        "Practice with hundreds of aptitude questions organized by topic and difficulty.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "AI-Powered Interviews",
      description:
        "Experience real-time face-to-face interviews with AI that adapts to your responses.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
      title: "Personalized Feedback",
      description:
        "Receive detailed feedback and suggestions to improve your interview performance.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full">
      <BackgroundBeamsWithCollision className="relative flex-grow flex items-center bg-zinc-900 min-h-[90vh] h-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white -z-10"></div>
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-500 leading-tight">
                Ace Your Next Interview with AI-Powered Practice
              </h1>
              <p className="text-xl text-gray-500">
                Master technical and aptitude questions while practicing
                real-time interviews with our AI assistant.
              </p>
              <Link
                to="/homepage"
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <GoogleLoginButton className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg text-lg cursor-pointer" />

                {/* <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors py-2 px-6 rounded-lg text-lg flex items-center group">
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button> */}
              </Link>
            </div>

            <div className="relative">
              <div className="bg-indigo-700  p-6 rounded-xl shadow-xl">
                <div className="mb-4 rounded-lg bg-gray-100 p-4">
                  <p className="font-medium text-gray-800">
                    Aptitude Test Session
                  </p>
                </div>
                <div className="space-y-4 mb-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="font-medium text-gray-800 mb-2">
                      Question 3 of 10:
                    </p>
                    <p className="text-gray-800">
                      If a train travels at a speed of 60 km/hr and crosses a
                      platform in 30 seconds, what is the length of the
                      platform?
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0"></div>
                      <p>300 meters</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0"></div>
                      <p>400 meters</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full border-2 border-indigo-600 bg-indigo-100 mr-3 flex-shrink-0"></div>
                      <p className="font-medium">500 meters</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0"></div>
                      <p>600 meters</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-gray-300 hover:text-gray-400 cursor-pointer">
                    Previous
                  </button>
                  <div className="text-xs text-gray-400">
                    Time remaining: 1:45
                  </div>
                  <button className="text-gray-300 font-medium hover:text-gray-4 cursor-pointer">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      <section id="features" className="py-20 bg-white invert">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose PrepBuddy?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with proven interview
              techniques to help you land your dream job.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-black hover:shadow-md transition "
              >
                <div className="mb-4 p-3 rounded-full bg-indigo-100 inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20  bg-zinc-900  ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Get started in minutes and improve your interview skills today.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Sign in with Google",
                  description:
                    "Quick and secure authentication with your Google account.",
                },
                {
                  step: "2",
                  title: "Choose Your Focus Area",
                  description:
                    "Select from technical questions, aptitude training, or mock interviews.",
                },
                {
                  step: "3",
                  title: "Practice and Get Feedback",
                  description:
                    "Engage in interactive sessions and receive instant AI-powered feedback.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                    {item.step}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <GoogleLoginButton className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg text-lg cursor-pointer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
