import React, { useState } from "react";
import axios from "axios";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    const response = await axios.post("https://your-render-backend.com/fetch-emails", { email: userEmail });
    setEmails(response.data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">📧 Priority Pulse - Email Assistant</h1>
      <input
        className="p-2 border rounded"
        type="email"
        placeholder="Enter your email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button onClick={fetchEmails} className="mt-3 bg-blue-500 text-white p-2 rounded">
        Fetch Emails
      </button>

      {emails.length > 0 && (
        <div className="mt-5">
          {emails.map((email, index) => (
            <div key={index} className="p-2 border mb-2">
              <p><strong>Subject:</strong> {email.subject}</p>
              <p><strong>Summary:</strong> {email.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
