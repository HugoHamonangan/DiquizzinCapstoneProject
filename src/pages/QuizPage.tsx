import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateData } from '../firebase/crud';
import SingleQuestion from '../components/SingleQuestion';
import GoogleTranslate from '../components/GoogleTranslate';
import CryptoJS from 'crypto-js';
import { useAppDispatch } from '../states/hooks/hooks';
import { setIsUserPlayingNo } from '../states/slices/isUserPlayingSlices';

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

const QuizPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    QuestionAndAnswer[]
  >([]);
  const [warning, setWarning] = useState<boolean>(false);
  const [numCorrectAnswer, setNumCorrectAnswer] = useState(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { user } = UserAuth();
  const navigate = useNavigate();
  const secretKey = 'b8@#gF^7jD!kLQpO4rT$zXcV9nW1yU5&'; // Example of a strong secret key

  useEffect(() => {
    if (localStorage.getItem('isUserPlaying') === '"no"') {
      resetQuiz();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encryptedData = localStorage.getItem('quizData');
        const savedAnswers = JSON.parse(
          localStorage.getItem('selectedAnswers') || '[]'
        );
        if (!encryptedData) {
          throw new Error('No quiz data found');
        }
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        setQuestionsAndAnswers(
          decryptedData.results.map(
            (questionObject: QuestionObject, index: number) => {
              return {
                question: questionObject.question,
                shuffledAnswers: shuffle([
                  ...questionObject.incorrect_answers,
                  questionObject.correct_answer,
                ]),
                correctAnswer: questionObject.correct_answer,
                selectedAnswer: savedAnswers[index] || '',
              };
            }
          )
        );

        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const updateAnswer = (currentQuestion: string, answer: string) => {
    const updatedQuestionsAndAnswers = questionsAndAnswers.map(
      (questionObject: QuestionAndAnswer) => {
        return questionObject.question === currentQuestion
          ? { ...questionObject, selectedAnswer: answer }
          : questionObject;
      }
    );

    setQuestionsAndAnswers(updatedQuestionsAndAnswers);
    // Save updated answers to localStorage
    const selectedAnswers = updatedQuestionsAndAnswers.map(
      (q) => q.selectedAnswer
    );
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
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

      dispatch(setIsUserPlayingNo());
    }
  };

  const resetQuiz = () => {
    dispatch(setIsUserPlayingNo());
    setQuestionsAndAnswers([]);
    setShowResult(false);
    setNumCorrectAnswer(0);

    localStorage.removeItem('selectedAnswers'); // Clear the saved answers
    localStorage.removeItem('quizData');

    navigate('/dashboard');
  };

  const unansweredQuestions = questionsAndAnswers
    .map((questionObject, index) =>
      questionObject.selectedAnswer === '' ? index + 1 : null
    )
    .filter((questionNumber) => questionNumber !== null);

  const questionElements = questionsAndAnswers.map((questionObject, index) => {
    const questionNumber = index + 1;
    return (
      // <SingleQuestion
      //   key={index}
      //   questionNumber={questionNumber}
      //   question={questionObject.question}
      //   allAnswers={questionObject.shuffledAnswers}
      //   correctAnswer={questionObject.correctAnswer}
      //   updateAnswer={updateAnswer}
      //   selectedAnswer={questionObject.selectedAnswer}
      //   showResult={showResult}
      // />
      <div id={`question-${questionNumber}`} key={index}>
        <SingleQuestion
          questionNumber={questionNumber}
          question={questionObject.question}
          allAnswers={questionObject.shuffledAnswers}
          correctAnswer={questionObject.correctAnswer}
          updateAnswer={updateAnswer}
          selectedAnswer={questionObject.selectedAnswer}
          showResult={showResult}
        />
      </div>
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
                Quiz Page
              </h1>
              <GoogleTranslate />
              {questionElements}
            </div>
            {/* {warning && <p className="text-red-500 text-lg font-semibold">Please answer all questions before submit!</p>} */}
            {warning && (
              <div className="px-7">
                <div>
                  <p className="text-red-500 font-semibold mt-3 mb-5">
                    {unansweredQuestions.length > 0 ? (
                      <>
                        <p className="text-red-500 text-lg font-semibold">
                          Please answer all questions before submit!
                        </p>
                        Unanswered Questions:
                        <div className="mt-7 flex flex-wrap gap-10 justify-start">
                          {unansweredQuestions.map((num, index) => (
                            <div key={num} className="">
                              {index > 0 && ' '}
                              <a
                                href={`#question-${num}`}
                                className="rounded-lg underline bg-red-500 w-[3rem] h-[3rem] grid place-items-center text-lg block m-1 text-white"
                              >
                                {num}
                              </a>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-green-500 text-xl font-bold">
                          All question already answered, you can submit now
                        </p>
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            {questionsAndAnswers.length > 0 && !showResult ? (
              <>
                <button
                  onClick={submitAnswers}
                  className="bg-[#f9a826] hover:bg-yellow-600 font-bold text-white rounded-md mt-11 px-6 py-3 w-fit mb-7"
                >
                  Submit
                </button>
                <br />
                <br />
              </>
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

export default QuizPage;
