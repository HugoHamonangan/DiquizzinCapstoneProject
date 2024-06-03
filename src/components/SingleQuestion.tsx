import React from 'react';
import { decode } from 'html-entities';

interface SingleQuestionProps {
  questionNumber: number; // Ganti properti key menjadi questionNumber
  question: string;
  allAnswers: string[];
  correctAnswer: string;
  updateAnswer: (currentQuestion: string, answer: string) => void;
  selectedAnswer: string;
  showResult: boolean;
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({ questionNumber, question, allAnswers, correctAnswer, updateAnswer, selectedAnswer, showResult }) => {
  const clickAnswer = (currentQuestion: string, answer: string) => {
    updateAnswer(currentQuestion, answer);
  };

  const answerElements = allAnswers.map((answer: string, index: number) => {
    return (
      <button
        key={index}
        onClick={() => clickAnswer(question, answer)}
        className={`answer-btn border-2 w-fit px-2 py-1 ${answer === selectedAnswer ? 'bg-slate-500' : ''} ${showResult && answer === correctAnswer ? 'bg-green-500' : ''} ${
          showResult && answer === selectedAnswer && answer !== correctAnswer ? 'bg-red-400' : ''
        } ${showResult && answer !== correctAnswer ? 'opacity-50' : ''}`}
        disabled={showResult}
      >
        {decode(answer)}
      </button>
    );
  });

  return (
    <div className="container">
      <h1>
        {questionNumber}.{decode(question)}
      </h1>
      <div className="answer-btn-container flex flex-col space-y-2 border-b-2 p-4">{answerElements}</div>
    </div>
  );
};

export default SingleQuestion;
