import * as React from "react";
import { FaFilePdf } from "react-icons/fa";

const notesData = [
  {
    title: "Data Structures & Algorithms",
    image: "https://www.codewithharry.com/img/notes/dsa.webp",
    link: "/notes/dsa.pdf",
    filename: "DSA_Notes.pdf",
  },
  {
    title: "Operating Systems",
    image: "https://img.icons8.com/color/96/monitor.png",
    link: "/notes/os.pdf",
    filename: "Operating_Systems.pdf",
  },
  {
    title: "Computer Networks",
    image: "https://img.icons8.com/fluency/96/network-cable.png",
    link: "/notes/cn.pdf",
    filename: "Computer_Networks.pdf",
  },
  {
    title: "Database Management Systems",
    image: "https://img.icons8.com/fluency/96/database.png",
    link: "/notes/dbms.pdf",
    filename: "DBMS.pdf",
  },
  {
    title: "Computer Architecture",
    image: "https://img.icons8.com/color/96/motherboard.png",
    link: "/notes/ca.pdf",
    filename: "Computer_Architecture.pdf",
  },
  {
    title: "Java Programming",
    image: "https://img.icons8.com/color/96/java-coffee-cup-logo.png",
    link: "/notes/java.pdf",
    filename: "Java_Notes.pdf",
  },
  {
    title: "C++ Programming",
    image: "https://img.icons8.com/color/96/c-plus-plus-logo.png",
    link: "/notes/cpp.pdf",
    filename: "CPP_Notes.pdf",
  },
  {
    title: "JavaScript",
    image: "https://img.icons8.com/color/96/javascript.png",
    link: "/notes/javascript.pdf",
    filename: "JavaScript_Notes.pdf",
  },
  {
    title: "HTML",
    image: "https://img.icons8.com/color/96/html-5.png",
    link: "/notes/html.pdf",
    filename: "HTML_Notes.pdf",
  },
  {
    title: "CSS",
    image: "https://img.icons8.com/color/96/css3.png",
    link: "/notes/css.pdf",
    filename: "CSS_Notes.pdf",
  },
  {
    title: "Python",
    image: "https://www.codewithharry.com/img/notes/python.webp",
    link: "/notes/python.pdf",
    filename: "Python_Notes.pdf",
  },
  {
    title: "C",
    image: "https://img.icons8.com/color/96/c-programming.png",
    link: "/notes/c.pdf",
    filename: "C_Notes.pdf",
  },
];

const Notes = () => {
  return (
    <div className="w-full min-h-screen px-4 py-10 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-center text-indigo-400 mb-10">
        📚 Download Notes
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {notesData.map((note, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 text-center"
          >
            <img
              src={note.image}
              alt={`${note.title} Icon`}
              className="w-20 h-20 mx-auto mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold mb-1">{note.title}</h3>
            <p className="text-sm text-gray-300 mb-3">Download Notes Here</p>
            <a
              href={note.link}
              download={note.filename}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              📥 Download PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
