import React, { useState, useEffect } from 'react';

export default function ResultStep({ questions, answers, onRestart }) {
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correctCount++;
    });
    setScore(correctCount);
    const timer = setTimeout(() => setShowScore(true), 300);
    return () => clearTimeout(timer);
  }, [questions, answers]);

  const wrongQuestions = questions.filter((q, i) => answers[i] !== q.answer);

  return (
    <div className="card result-card">
      <h2 className={`score ${showScore ? 'score-show' : ''}`}>
        Your Score: {score} / {questions.length}
      </h2>

      {wrongQuestions.length > 0 ? (
        <>
          <h3>Review Incorrect Answers</h3>
          <div className="wrong-questions">
            {wrongQuestions.map((q, idx) => {
              const originalIndex = questions.indexOf(q);
              const userAnswerIndex = answers[originalIndex];

              return (
                <div key={idx} className="wrong-question">
                  <p className="question-text">{q.question}</p>
                  <div className="options-row review-options">
                    {q.options.map((opt, i) => {
                      const isCorrect = i === q.answer;
                      const isUserWrong = i === userAnswerIndex && i !== q.answer;

                      return (
                        <span
                          key={i}
                          className={`review-option
                            ${isCorrect ? 'correct' : ''}
                            ${isUserWrong ? 'wrong' : ''}
                          `}
                        >
                          {opt}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Great job! You answered all questions correctly.</p>
      )}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="primary" onClick={onRestart}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
