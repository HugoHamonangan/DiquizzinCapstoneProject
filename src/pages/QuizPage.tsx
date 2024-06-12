import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateData } from '../firebase/crud';
import SingleQuestion from '../components/SingleQuestion';
import GoogleTranslate from '../components/GoogleTranslate';
import CryptoJS from 'crypto-js';
import { useAppDispatch } from '../states/hooks/hooks';
import { setIsUserPlayingNo } from '../states/slices/isUserPlayingSlices';
import { motion, Spring } from 'framer-motion';

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

type Props = {
  difficulty: string;
  amountOfQuestion: number;
  setDifficulty: (difficulty: string) => void;
  setAmountOfQuestion: (amountOfQuestion: number) => void;
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

const QuizPage: React.FC<Props> = ({
  difficulty,
  amountOfQuestion,
  setDifficulty,
  setAmountOfQuestion,
}) => {
  // const [loading, setLoading] = useState<boolean>(true);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    QuestionAndAnswer[]
  >([]);
  const [warning, setWarning] = useState<boolean>(false);
  const [numCorrectAnswer, setNumCorrectAnswer] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);
  const dispatch = useAppDispatch();

  const { user } = UserAuth();
  const navigate = useNavigate();
  const secretKey = 'b8@#gF^7jD!kLQpO4rT$zXcV9nW1yU5&';

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

        // setLoading(false);
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
    const selectedAnswers = updatedQuestionsAndAnswers.map(
      (q) => q.selectedAnswer
    );
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
  };

  const resetDifficultyAndQuestion = () => {
    setDifficulty('');
    setAmountOfQuestion(0);
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
        let finalScore: number = 0;

        if (difficulty === 'easy') {
          if (amountOfQuestion === 7) {
            finalScore = totalCorrectAnswer * 2 + 50;
            setFinalScore(finalScore);
          }
          if (amountOfQuestion === 10) {
            finalScore = totalCorrectAnswer * 2 + 70;
            setFinalScore(finalScore);
          }
          if (amountOfQuestion === 15) {
            finalScore = totalCorrectAnswer * 2 + 111;
            setFinalScore(finalScore);
          }
        }
        if (difficulty === 'medium') {
          if (amountOfQuestion === 7) {
            finalScore = totalCorrectAnswer * 3 + 50;
            setFinalScore(finalScore);
          }
          if (amountOfQuestion === 10) {
            finalScore = totalCorrectAnswer * 3 + 70;
            setFinalScore(finalScore);
          }
          if (amountOfQuestion === 15) {
            finalScore = totalCorrectAnswer * 3 + 111;
            setFinalScore(finalScore);
          }
        }
        if (difficulty === 'hard') {
          if (amountOfQuestion === 7) {
            finalScore = totalCorrectAnswer * 5 + 50;
            setFinalScore(finalScore);
          }
          if (amountOfQuestion === 10) {
            finalScore = totalCorrectAnswer * 5 + 70;
            setFinalScore(finalScore);
          }
          if (amountOfQuestion === 15) {
            finalScore = totalCorrectAnswer * 5 + 111;
            setFinalScore(finalScore);
          }
        }
        updateData('users', user.uid, {
          score: finalScore + user.score,
        });
      } else {
        console.error('User ID or score is not defined');
      }

      setNumCorrectAnswer(totalCorrectAnswer);
      setShowResult(true);
      resetDifficultyAndQuestion();

      dispatch(setIsUserPlayingNo());
    }
  };

  const resetQuiz = () => {
    dispatch(setIsUserPlayingNo());
    setQuestionsAndAnswers([]);
    setShowResult(false);
    setNumCorrectAnswer(0);
    setFinalScore(0);

    localStorage.removeItem('selectedAnswers');
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

  console.log(
    `difficulty: ${difficulty}, amount of question: ${amountOfQuestion}`
  );

  const transitionSpringPhysics: Spring = {
    type: 'spring',
    mass: 0.2,
    stiffness: 80,
    damping: 10,
  };

  const [visible, setVisible] = useState<boolean>(true);

  const handleAnimationComplete = () => {
    setVisible(false);
  };

  const animateAnimation = {
    height: ['100vh', '100vh', '0vh'],
    transition: { duration: 4, ease: 'easeInOut' },
  };

  const textAnimation = {
    top: ['1rem', '0rem', '1rem', '0rem', '1rem', '0rem', '1rem'],
    opacity: [1, 1, 0],
    transition: { duration: 3, ease: 'easeInOut' },
  };

  const goodLuckAnimation = {
    right: ['-20rem', '-20rem', '2rem', '2rem', '-20rem'],
    opacity: [1],
    transition: { duration: 20, ease: 'easeInOut' },
  };

  return (
    <>
      {visible && (
        <>
          <motion.div
            className="fixed w-full z-30 bottom-0 bg-slate-100 "
            transition={transitionSpringPhysics}
            animate={animateAnimation}
            onAnimationComplete={handleAnimationComplete}
          />
          <motion.div
            className="fixed w-full h-screen grid place-items-center z-40 font-bold text-blue-700"
            animate={textAnimation}
          >
            <h3 className="text-2xl">Loading ...</h3>
          </motion.div>
        </>
      )}
      <motion.h3
        className="fixed right-[2rem] z-40 top-3"
        animate={goodLuckAnimation}
      >
        Good Luck : )
      </motion.h3>

      <div className="max-w-5xl mx-auto flex flex-col justify-center items-center mt-10 space-y-2 mb-[50px]">
        <div className="container px-2 md:px-4 py-2 mx-auto">
          <div id="google_translate_element"></div>
          <h1 className="text-3xl !font-bold uppercase text-center mb-11 text-[#f9a826]">
            Quiz Page
          </h1>
          <GoogleTranslate />
          {questionElements}
        </div>
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
          <div className="w-full flex flex-wrap gap-3 rounded-lg justify-center py-11">
            <p className="p-3 bg-yellow-500 rounded-lg">
              Total Question: {questionsAndAnswers.length}
            </p>
            <p className="p-3 bg-green-500 rounded-lg">
              Correct Answer: {numCorrectAnswer}
            </p>
            <p className='p-3 bg-purple-300 rounded-lg'>Score You Get : {finalScore}</p>
          </div>
        )}

        {showResult && (
          <>
            <button
              onClick={resetQuiz}
              className="bg-blue-500 hover:bg-blue-800 font-bold text-white rounded-md px-4 py-3"
            >
              Go to Dashboard
            </button>
            <br />
            <br />
          </>
        )}
      </div>
    </>
  );
};

export default QuizPage;
