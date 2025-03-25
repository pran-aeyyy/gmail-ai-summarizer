import { useState } from 'react';
import { useRouter } from 'next/router';

export default function EmailAgent() {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [emails, setEmails] = useState([]);
  const router = useRouter();

  const handleAuth = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_email: email })
    });
    const { auth_url } = await response.json();
    window.location.href = auth_url; // Redirect to Google OAuth
  };

  const fetchEmails = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/emails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        user_email: email,
        selected_date: date
      })
    });
    const data = await response.json();
    setEmails(data.emails);
  };

  return (
    <div className="container">
      <h1>📧 Priority Pulse</h1>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleAuth}>Authenticate</button>
      <button onClick={fetchEmails}>Fetch Emails</button>
      
      {emails.map((email, index) => (
        <div key={index} className="email-card">
          <h3>{email.subject}</h3>
          <p>From: {email.sender}</p>
          <p>{email.snippet}</p>
        </div>
      ))}
    </div>
  );
}