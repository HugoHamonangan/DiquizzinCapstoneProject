import React from 'react';
import { decode } from 'html-entities';


interface SingleQuestionProps {
  questionNumber: number;
  question: string;
  allAnswers: string[];
  correctAnswer: string;
  updateAnswer: (currentQuestion: string, answer: string) => void;
  selectedAnswer: string;
  showResult: boolean;
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({
  questionNumber,
  question,
  allAnswers,
  correctAnswer,
  updateAnswer,
  selectedAnswer,
  showResult,
}) => {
  const clickAnswer = (currentQuestion: string, answer: string) => {
    updateAnswer(currentQuestion, answer);
  };

  const answerElements = allAnswers.map((answer: string, index: number) => {
    return (
      <button
        key={index}
        onClick={() => clickAnswer(question, answer)}
        className={`answer-btn w-fit outline-transparent hover:outline-sky-600 hover:outline transition-all px-4 py-2 rounded-lg ${
          answer === selectedAnswer ? 'bg-[#0c356a] text-white' : ''
        } ${showResult && answer === correctAnswer ? 'bg-green-500' : ''} ${
          showResult && answer === selectedAnswer && answer !== correctAnswer
            ? 'bg-red-400'
            : ''
        } ${showResult && answer !== correctAnswer ? 'opacity-50' : ''}`}
        disabled={showResult}
      >
        {String.fromCharCode(97 + index) + ') '}
        {decode(answer)}
      </button>
    );
  });

  return (
    <>
      
      <div className="container mt-8">
        <div className="flex gap-3 items-start">
          <h1>{questionNumber + '. '}</h1>
          <h1>{decode(question)}</h1>
        </div>
        <div className="answer-btn-container flex flex-col gap-4 py-6 rounded-lg">
          {answerElements}
        </div>
      </div>
    </>
  );
};

export default SingleQuestion;
