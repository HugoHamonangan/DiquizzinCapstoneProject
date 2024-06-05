import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateData } from '../firebase/crud';
import SingleQuestion from './SingleQuestion';
import GoogleTranslate from './GoogleTranslate';

interface QuizProps {
  playAPI: string;
}

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

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const Quiz: React.FC<QuizProps> = ({ playAPI }) => {
  const [api, setAPI] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    QuestionAndAnswer[]
  >([]);
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
              shuffledAnswers: shuffle([
                ...questionObject.incorrect_answers,
                questionObject.correct_answer,
              ]),
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
        return questionObject.question === currentQuestion
          ? { ...questionObject, selectedAnswer: answer }
          : questionObject;
      })
    );
  };

  const submitAnswers = () => {
    const notAllAnswered = questionsAndAnswers.some(
      (questionObject) => questionObject.selectedAnswer === ''
    );

    setWarning(notAllAnswered);

    if (!notAllAnswered) {
      let totalCorrectAnswer = 0;
      questionsAndAnswers.forEach((questionObject) => {
        if (questionObject.selectedAnswer === questionObject.correctAnswer) {
          totalCorrectAnswer += 1;
        }
      });

      if (user?.uid && user?.score !== undefined) {
        updateData('users', user.uid, {
          score: totalCorrectAnswer + user.score,
        });
      } else {
        console.error('User ID or score is not defined');
      }

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
        <p className="flex items-center justify-center h-screen text-xl">
          Loading ...
        </p>
      ) : (
        <>
          <div className="max-w-5xl mx-auto flex flex-col justify-center items-center mt-10 space-y-2 mb-[50px]">
            <div className="container px-2 md:px-4 py-2 mx-auto">
              <div id="google_translate_element"></div>
              <h1 className="text-3xl !font-bold uppercase text-center mb-11 text-[#f9a826]">
                {playAPI + ''} Quiz
              </h1>
              <GoogleTranslate />
              {questionElements}
            </div>
            {warning && (
              <p className="text-red-500 text-lg font-semibold">
                Please answer all questions before submit!
              </p>
            )}

            {questionsAndAnswers.length > 0 && !showResult ? (
              <button
                onClick={submitAnswers}
                className="bg-[#f9a826] hover:bg-yellow-600 font-bold text-white rounded-md mt-11 px-6 py-3 w-fit"
              >
                Submit
              </button>
            ) : null}

            {showResult && (
              <div className="w-full flex gap-3 rounded-lg justify-center py-11">
                <p className="p-3 bg-yellow-500 rounded-lg">
                  Total Question: 15
                </p>
                <p className="p-3 bg-green-500 rounded-lg">
                  Correct Answer: {numCorrectAnswer}
                </p>
              </div>
            )}

            {showResult && (
              <button
                onClick={resetQuiz}
                className="bg-blue-500 hover:bg-blue-800 font-bold text-white rounded-md px-4 py-2"
              >
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
