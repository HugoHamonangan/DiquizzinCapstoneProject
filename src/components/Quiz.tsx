// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateData } from '../firebase/crud';
import SingleQuestion from './SingleQuestion';

interface QuizProps {
  playAPI: string;
}

// interface QuizData {
//   type: string;
//   difficulty: string;
//   category: string;
//   question: string;
//   correct_answer: string;
//   incorrect_answers: string[];
// }

interface QuestionAndAnswer {
  question: string;
  shuffledAnswers: string[];
  correctAnswer: string;
  selectedAnswer: string;
}

interface QuestionObject {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
}

const generateAPI = (category: string): string => {
  switch (category) {
    case 'Mathematic':
      return 'https://opentdb.com/api.php?amount=15&category=19&difficulty=medium&type=multiple';
    case 'Sports':
      return 'https://opentdb.com/api.php?amount=15&category=21&difficulty=medium&type=multiple';
    case 'Geography':
      return 'https://opentdb.com/api.php?amount=15&category=22&difficulty=medium&type=multiple';
    case 'Animals':
      return 'https://opentdb.com/api.php?amount=15&category=27&difficulty=medium&type=multiple';
    case 'Books':
      return 'https://opentdb.com/api.php?amount=15&category=10&difficulty=medium&type=multiple';
    case 'Computer':
      return 'https://opentdb.com/api.php?amount=15&category=18&difficulty=medium&type=multiple';
    default:
      return '';
  }
};

const shuffle = (array: string[]): string[] => {
  let currentIndex = array.length,
    randomIndex;

  // while there remain elements to shuffle
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // and swap it with the current element
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const Quiz: React.FC<QuizProps> = ({ playAPI }) => {
  const [api, setAPI] = useState<string>('');
  // const [data, setData] = useState<QuizData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // mapping each question & its answers
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<QuestionAndAnswer[]>([]);
  const [warning, setWarning] = useState<boolean>(false);
  const [numCorrectAnswer, setNumCorrectAnswer] = useState(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const responseJson = await response.json();

        setQuestionsAndAnswers(
          responseJson.results.map((questionObject: QuestionObject) => {
            return {
              question: questionObject.question,
              shuffledAnswers: shuffle([...questionObject.incorrect_answers, questionObject.correct_answer]),
              correctAnswer: questionObject.correct_answer,
              selectedAnswer: '',
            };
          })
        );

        console.log('render');

        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    if (api) {
      fetchData();
    }

    return () => {};
  }, [api]);

  useEffect(() => {
    setAPI(generateAPI(playAPI));
  }, [playAPI]);

  const updateAnswer = (currentQuestion: string, answer: string) => {
    setQuestionsAndAnswers(
      questionsAndAnswers.map((questionObject: QuestionAndAnswer) => {
        return questionObject.question === currentQuestion ? { ...questionObject, selectedAnswer: answer } : questionObject;
      })
    );
  };

  const submitAnswers = () => {
    // check if some questions are not answered
    const notAllAnswered = questionsAndAnswers.some((questionObject) => questionObject.selectedAnswer === '');

    setWarning(notAllAnswered);

    // conditions if all question have been answered
    if (!notAllAnswered) {
      let totalCorrectAnswer = 0;
      questionsAndAnswers.forEach((questionObject) => {
        // compare selected answer and correct andswer
        if (questionObject.selectedAnswer === questionObject.correctAnswer) {
          totalCorrectAnswer += 1;
        }
      });

      // update user's score
      updateData('users', user?.uid, { score: totalCorrectAnswer + user?.score });

      setNumCorrectAnswer(totalCorrectAnswer);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQuestionsAndAnswers([]);
    setShowResult(false);
    setNumCorrectAnswer(0);

    navigate('/dashboard');
  };

  const questionElements = questionsAndAnswers.map((questionObject, index) => {
    const questionNumber = index + 1;
    return (
      <SingleQuestion
        key={index}
        questionNumber={questionNumber}
        question={questionObject.question}
        allAnswers={questionObject.shuffledAnswers}
        correctAnswer={questionObject.correctAnswer}
        updateAnswer={updateAnswer}
        selectedAnswer={questionObject.selectedAnswer}
        showResult={showResult}
      />
    );
  });

  return (
    <>
      {loading ? (
        <p className="flex items-center justify-center h-screen">Loading...</p>
      ) : (
        <>
          <div className="max-w-5xl mx-auto flex flex-col justify-center items-center mt-10 space-y-2 mb-[50px]">
            {showResult && (
              <div>
                <p>Total Question: 15</p>
                <p>Correct Answer: {numCorrectAnswer}</p>
              </div>
            )}
            <div className="container px-4 py-2 bg-blue-300">{questionElements}</div>
            {warning && <p className="text-red-500 text-lg font-semibold">Please answer all questions before submit!</p>}

            {questionsAndAnswers.length > 0 && !showResult ? (
              <button onClick={submitAnswers} className="bg-blue-500 hover:bg-blue-800 font-bold text-white rounded-md px-4 py-2 w-1/2">
                Submit
              </button>
            ) : null}

            {showResult && (
              <button onClick={resetQuiz} className="bg-blue-500 hover:bg-blue-800 font-bold text-white rounded-md px-4 py-2">
                Go to Dashboard
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Quiz;
