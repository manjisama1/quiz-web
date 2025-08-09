import React, { useState } from 'react';

export default function UploadStep({ onUpload }) {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setJsonText(event.target.result);
      setError('');
    };
    reader.readAsText(file);
  };

  const isValidFormat = (data) => {
    if (!Array.isArray(data)) return false;

    return data.every((item) => {
      if (typeof item.question !== 'string' || !item.question.trim()) return false;
      if (!Array.isArray(item.options) || item.options.length < 2) return false;
      if (!item.options.every(opt => typeof opt === 'string' && opt.trim())) return false;
      if (typeof item.answer !== 'number' || item.answer < 0 || item.answer >= item.options.length) return false;
      return true;
    });
  };

  const handleParse = () => {
    try {
      const data = JSON.parse(jsonText);
      if (!isValidFormat(data)) throw new Error('Invalid format: Must be an array of objects with {question, options[], answer}');
      setError('');
      onUpload(data);
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
    }
  };

  return (
    <div className="card">
      <h2>Upload or Paste JSON</h2>

      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="upload-input"
      />

      <textarea
        rows={10}
        placeholder="Paste JSON here..."
        className="upload-textarea"
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />

      {error && <p className="upload-error">{error}</p>}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleParse} className="primary">
          Load Questions
        </button>
      </div>

      <div className="example-container" style={{ marginTop: '40px' }}>
        <h3 style={{ marginBottom: '10px', color: '#2B2D42' }}>Example Format</h3>
        <p style={{ marginBottom: '15px', color: '#555' }}>
          Upload your study materials in this JSON format:
        </p>
        <div
          style={{
            background: '#EDF2F4',
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
            overflowX: 'auto',
            fontSize: '14px',
            border: '1px solid #ccc'
          }}
        >
          <pre style={{ margin: 0, color: '#D90429', fontWeight: '500' }}>
{`[
  {
    "question": "What is the capital of Japan?",
    "options": ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    "answer": 1
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "options": ["Earth", "Mars", "Jupiter", "Venus"],
    "answer": 1
  }
]`}
          </pre>
        </div>
      </div>
    </div>
  );
}
