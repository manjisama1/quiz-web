import React, { useState } from 'react';

const orders = [
  { value: 'first', label: 'First to Last' },
  { value: 'last', label: 'Last to First' },
  { value: 'random', label: 'Random' },
];

export default function SettingsStep({ questions, onStart }) {
  const [numQuestions, setNumQuestions] = useState(questions.length);
  const [order, setOrder] = useState('first');
  const [error, setError] = useState('');

  const handleStart = () => {
    const n = Number(numQuestions);

    if (!n || n <= 0) {
      setError('Please enter a valid number greater than 0.');
      return;
    }

    if (n > questions.length) {
      setError(`Max available questions: ${questions.length}. Please enter ${questions.length} or less.`);
      return;
    }

    setError('');
    onStart(n, order);
  };

  return (
    <div className="card settings-card">
      <h2>Quiz Settings</h2>

      <div className="form-group">
        <label htmlFor="numQuestions">Number of questions to attempt:</label>
        <input
          id="numQuestions"
          type="number"
          min="1"
          max={questions.length}
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="order">Question order:</label>
        <select
          id="order"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          {orders.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="button-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={handleStart} className="primary start-button">
          Start Test
        </button>
      </div>
    </div>
  );
}
