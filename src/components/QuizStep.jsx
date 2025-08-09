import React, { useState, useEffect } from 'react';

export default function QuizStep({ questions, numQuestions, order, onFinish }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // key: question index, value: selected option index

  useEffect(() => {
    let qList = [...questions];
    if (order === 'last') qList = qList.reverse();
    else if (order === 'random')
      qList = qList.sort(() => Math.random() - 0.5);

    qList = qList.slice(0, numQuestions);
    setShuffledQuestions(qList);
    setCurrentIndex(0); // reset on change
    setAnswers({});
  }, [questions, numQuestions, order]);

  const currentQ = shuffledQuestions[currentIndex];

  const selectOption = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const goNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      onFinish(shuffledQuestions, answers);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  if (!currentQ) return <p>Loading...</p>;

  return (
    <div className="card">
      <h3>
        Question {currentIndex + 1} / {shuffledQuestions.length}
      </h3>

      <p className="mb-6">{currentQ.question}</p>

      <div className="options-row">
        {currentQ.options.map((opt, i) => {
          const isSelected = answers[currentIndex] === i;
          return (
            <button
              key={i}
              onClick={() => selectOption(i)}
              className={`option-button ${isSelected ? 'selected' : ''}`}
            >
              {opt}
            </button>
          );
        })}
      </div>


      {/* Wrap buttons in a container with custom class for styling */}
      <div className="navigation-buttons">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="outlined"
          aria-disabled={currentIndex === 0}
        >
          Previous
        </button>

        <button onClick={goNext} className="primary">
          {currentIndex === shuffledQuestions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
