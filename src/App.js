import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || 'https://prac15backend.vercel.app';

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState('Loading message...');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const result = await axios.get(`${API_BASE_URL}/message`);
        setWelcomeMessage(result.data.message);
      } catch (err) {
        const details = err.response
          ? `Server responded with ${err.response.status}`
          : err.message;

        setWelcomeMessage(`Could not load the welcome message. ${details}`);
      }
    };

    fetchMessage();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setResponse('');
    setIsSubmitting(true);

    try {
      const result = await axios.post(`${API_BASE_URL}/submit`, formData);
      setResponse(result.data.message);
      setFormData({ name: '', email: '' });
    } catch (err) {
      setError('Submission failed. Please check that the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app">
      <main className="api-panel">
        <section className="message-box">
          <p className="label">Backend Message</p>
          <h1>{welcomeMessage}</h1>
          <span className="api-url">API: {API_BASE_URL}</span>
        </section>

        <form className="submit-form" onSubmit={handleSubmit}>
          <h2>Submit Details</h2>

          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>

        {response && <p className="status success">{response}</p>}
        {error && <p className="status error">{error}</p>}
      </main>
    </div>
  );
}

export default App;
