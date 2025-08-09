import React, { useState } from 'react';
import UploadStep from './components/UploadStep';
import SettingsStep from './components/SettingsStep';
import QuizStep from './components/QuizStep';
import ResultStep from './components/ResultStep';

export default function App() {
  const [step, setStep] = useState('upload');
  const [questionsData, setQuestionsData] = useState(null);
  const [quizSettings, setQuizSettings] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState(null);

  const handleJsonUpload = (data) => {
    setQuestionsData(data);
    setStep('settings');
  };

  const handleStartQuiz = (numQuestions, order) => {
    setQuizSettings({ numQuestions, order });
    setStep('quiz');
  };

  const handleFinishQuiz = (questions, answers) => {
    setQuizAnswers({ questions, answers });
    setStep('result');
  };

  const handleRestart = () => {
    setStep('upload');
    setQuestionsData(null);
    setQuizSettings(null);
    setQuizAnswers(null);
  };

  return (
    <div className="min-h-screen bg-light-gray text-dark-blue flex items-center justify-center p-6">
      {step === 'upload' && <UploadStep onUpload={handleJsonUpload} />}

      {step === 'settings' && questionsData && (
        <SettingsStep questions={questionsData} onStart={handleStartQuiz} />
      )}

      {step === 'quiz' && quizSettings && questionsData && (
        <QuizStep
          questions={questionsData}
          numQuestions={quizSettings.numQuestions}
          order={quizSettings.order}
          onFinish={handleFinishQuiz}
        />
      )}

      {step === 'result' && quizAnswers && (
        <ResultStep
          questions={quizAnswers.questions}
          answers={quizAnswers.answers}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
