import React, { useState } from "react";
import axios from "axios";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmails = async () => {
    if (!userEmail) return alert("Please enter your email.");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://gmail-ai-summarizer-backend.onrender.com/fetch-emails",
        { email: userEmail }
      );
      setEmails(response.data);
    } catch (error) {
      alert("Error fetching emails. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      {/* Header */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">📧 Priority Pulse</h1>
        <p className="text-gray-500 mt-2">Your AI-powered Email Summarizer</p>

        {/* Input Box */}
        <div className="mt-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button
            onClick={fetchEmails}
            className="mt-3 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Fetching..." : "Fetch Emails"}
          </button>
        </div>
      </div>

      {/* Email List */}
      {emails.length > 0 && (
        <div className="mt-6 w-full max-w-lg space-y-4">
          {emails.map((email, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-xl border-l-4 border-blue-500"
            >
              <p className="text-lg font-semibold text-gray-800">{email.subject}</p>
              <p className="text-gray-600">{email.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
