import React from 'react';
import { useAppDispatch } from '../states/hooks/hooks';
import { setIsUserPlayingYes } from '../states/slices/isUserPlayingSlices';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../utils/sweetAlert';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  modal: boolean;
  handleModal: (img: string, category: number) => void;
  difficulty: string;
  handleDifficulty: (difficulty: string) => void;
  amountOfQuestion: number;
  handleAmountOfQuestion: (amount: number) => void;
  img: string;
  category: number;
}

const Modal: React.FC<Props> = ({
  modal,
  handleModal,
  difficulty,
  handleDifficulty,
  amountOfQuestion,
  handleAmountOfQuestion,
  img,
  category,
}) => {
  const dispatch = useAppDispatch();
  const secretKey = 'b8@#gF^7jD!kLQpO4rT$zXcV9nW1yU5&';
  const navigate = useNavigate();

  const handlePlay = async (api: string) => {
    if (difficulty === '' && amountOfQuestion === 0) {
      await showAlert(
        'Choose Difficulty and Amount Of Questions',
        'Please choose difficulty and amount of question first',
        'error'
      );
      return;
    }

    if (difficulty === '') {
      await showAlert(
        'Choose Difficulty',
        'Please choose difficulty first',
        'error'
      );
      return;
    }

    if (amountOfQuestion === 0) {
      await showAlert(
        'Choose Amount Of Question',
        'Please choose amount of question first',
        'error'
      );
      return;
    }

    dispatch(setIsUserPlayingYes());

    try {
      const response = await fetch(api);
      const data = await response.json();
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        secretKey
      ).toString();

      if (data.response_code !== 0) {
        await showAlert(
          'not enough question',
          'question is not enough, please try another difficulties and amount of questions.',
          'error'
        );
        return;
      }
      localStorage.setItem('quizData', encryptedData);

      navigate('/quiz');
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const lastAPI: string = `https://opentdb.com/api.php?amount=${amountOfQuestion}&category=${category}&difficulty=${difficulty}&type=multiple`;

  const title = (number: number) => {
    if (number === 19) {
      return 'Mathematic';
    } else if (number === 21) {
      return 'Sports';
    } else if (number === 22) {
      return 'Geography';
    } else if (number === 27) {
      return 'Animals';
    } else if (number === 10) {
      return 'Books';
    } else if (number === 18) {
      return 'Computer';
    } else {
      return 'not found';
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div></motion.div>
      </AnimatePresence>

      <div
        className={`${
          !modal
            ? 'bg-opacity-0 invisible pointer-events-none'
            : 'bg-opacity-40 visible pointer-events-auto'
        } fixed inset-0 w-full h-screen z-50 bg-black transition-all cursor-pointer`}
      ></div>
      <div
        className={` ${
          !modal
            ? 'opacity-0 invisible pointer-events-none'
            : 'opacity-100 visible pointer-events-auto'
        } transition-all delay-75 fixed inset-0 w-full z-50 flex items-center justify-center`}
      >
        <div className="bg-white rounded-lg shadow-lg w-full mx-7 max-w-4xl grid md:grid-cols-2 gap-0">
          <div className="overflow-hidden hidden md:block relative rounded-s-lg ">
            <img
              src={img}
              alt="image"
              className="object-cover w-full h-full aspect-square"
            />
          </div>
          <div className="flex flex-col px-7">
            <button
              className="w-fit ml-auto text-2xl px-2 py-1 rounded-md mt-4 transition-all hover:bg-[#004399] hover:text-white"
              onClick={() => handleModal(img, category)}
            >
              &#x2715;
            </button>
            <h1 className="text-center text-[#ff964a] font-bold text-xl mb-4">
              {title(category)} Quiz
            </h1>
            <p className="text-[#585858] text-sm leading-7 pr-9">
              <h3 className="text-sm text-[#585858] font-bold mb-2">Rules :</h3>
              <ul>
                <li className="list-disc ml-4">
                  Easy get 2 points, medium get 3 points, hard get 5 points per
                  each question true
                </li>
                <li className="list-disc ml-4">
                  Extra score base of amount of questions you have (7 = +50
                  points, 10 = +70 points, 15 = +111 points)
                </li>
              </ul>
            </p>
            <div className="flex flex-col mt-5 gap-4">
              <h3 className="text-sm text-[#585858] font-bold">
                Difficulties :
              </h3>
              <div className="flex gap-3 text-white font-bold">
                <button
                  onClick={() => handleDifficulty('easy')}
                  className={`px-4 py-3 transition-all rounded-lg ${
                    difficulty === 'easy'
                      ? 'bg-[#004399]'
                      : 'bg-[#f9a826] hover:bg-[#004399]'
                  }`}
                >
                  Easy
                </button>
                <button
                  onClick={() => handleDifficulty('medium')}
                  className={`px-4 py-3 transition-all rounded-lg ${
                    difficulty === 'medium'
                      ? 'bg-[#004399]'
                      : 'bg-[#f9a826] hover:bg-[#004399]'
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => handleDifficulty('hard')}
                  className={`px-4 py-3 transition-all rounded-lg ${
                    difficulty === 'hard'
                      ? 'bg-[#004399]'
                      : 'bg-[#f9a826] hover:bg-[#004399]'
                  }`}
                >
                  Hard
                </button>
              </div>
            </div>
            <div className="flex flex-col mt-5 gap-4">
              <h3 className="text-sm text-[#585858] font-bold">
                Amount Of Question :
              </h3>
              <div className="flex gap-3 text-white font-bold">
                <button
                  onClick={() => handleAmountOfQuestion(7)}
                  className={`px-4 py-3 transition-all rounded-lg ${
                    amountOfQuestion === 7
                      ? 'bg-[#004399]'
                      : 'bg-[#f9a826] hover:bg-[#004399]'
                  }`}
                >
                  7
                </button>
                <button
                  onClick={() => handleAmountOfQuestion(10)}
                  className={`px-4 py-3 transition-all rounded-lg ${
                    amountOfQuestion === 10
                      ? 'bg-[#004399]'
                      : 'bg-[#f9a826] hover:bg-[#004399]'
                  }`}
                >
                  10
                </button>
                <button
                  onClick={() => handleAmountOfQuestion(15)}
                  className={`px-4 py-3 transition-all rounded-lg ${
                    amountOfQuestion === 15
                      ? 'bg-[#004399]'
                      : 'bg-[#f9a826] hover:bg-[#004399]'
                  }`}
                >
                  15
                </button>
              </div>
            </div>
            <button
              className="text-white w-full p-3 bg-[#f9a826] hover:bg-[#9b6d24] transition-all mt-8 mb-7 rounded-lg font-bold"
              onClick={() => handlePlay(lastAPI)}
            >
              Play The Quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
