import React from 'react';
import { useAppDispatch, useAppSelector } from '../states/hooks/hooks';
import { setIsUserPlayingYes } from '../states/slices/isUserPlayingSlices';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../utils/sweetAlert';
import { translate } from '../utils/helperFunction';

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
  const language = useAppSelector((state) => state.language);

  const handlePlay = async (api: string) => {
    if (difficulty === '' && amountOfQuestion === 0) {
      await showAlert(
        translate(
          language,
          'Choose Difficulty and Amount Of Questions',
          'Pilih Kesulitan dan Jumlah Pertanyaan'
        ),
        translate(
          language,
          'Please choose difficulty and amount of question first',
          'Silakan pilih kesulitan dan jumlah pertanyaan terlebih dahulu'
        ),
        'error'
      );
      return;
    }

    if (difficulty === '') {
      await showAlert(
        translate(language, 'Choose Difficulty', 'Pilih Kesulitan'),
        translate(
          language,
          'Please choose difficulty first',
          'Silakan pilih kesulitan terlebih dahulu'
        ),
        'error'
      );
      return;
    }

    if (amountOfQuestion === 0) {
      await showAlert(
        translate(
          language,
          'Choose Amount Of Question',
          'Pilih Jumlah Pertanyaan'
        ),
        translate(
          language,
          'Please choose amount of question first',
          'Silakan pilih jumlah pertanyaan terlebih dahulu'
        ),
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
          translate(language, 'Not enough questions', 'Pertanyaan tidak cukup'),
          translate(
            language,
            'Questions are not enough, please try another difficulties and amount of questions',
            'Pertanyaannya tidak cukup, silakan coba kesulitan dan jumlah pertanyaan lain'
          ),
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
    const translatedTitles: { [key: string]: string } = {
      19: translate(language, 'Mathematics', 'Matematika'),
      21: translate(language, 'Sports', 'Olahraga'),
      22: translate(language, 'Geography', 'Geografi'),
      27: translate(language, 'Animals', 'Hewan'),
      10: translate(language, 'Books', 'Buku'),
      18: translate(language, 'Computer', 'Komputer'),
    };

    return (
      translatedTitles[number] ||
      translate(language, 'Not Found', 'Tidak Ditemukan')
    );
  };

  return (
    <>
      <div
        className={`${
          !modal
            ? 'bg-opacity-0 invisible pointer-events-none'
            : 'bg-opacity-40 visible pointer-events-auto'
        } fixed inset-0 w-full h-screen z-50 bg-black transition-all cursor-pointer`}
      ></div>
      <div
        className={`${
          !modal
            ? 'opacity-0 scale-0 invisible pointer-events-none'
            : 'opacity-100 scale-95 visible pointer-events-auto'
        } funky-animation delay-75 fixed inset-0 w-full z-50 flex items-center justify-center`}
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
              <h3 className="text-sm text-[#585858] font-bold mb-2">
                {translate(language, 'Rules', 'Aturan')}:
              </h3>
              <ul>
                <li className="list-disc ml-4">
                  {translate(
                    language,
                    'Easy get 2 points, medium get 3 points, hard get 5 points per each question true',
                    'Mudah dapat 2 poin, sedang dapat 3 poin, sulit dapat 5 poin untuk setiap pertanyaan yang benar'
                  )}
                </li>
                <li className="list-disc ml-4">
                  {translate(
                    language,
                    'Extra score based on amount of questions you have (7 = +50 points, 10 = +70 points, 15 = +111 points)',
                    'Skor tambahan berdasarkan jumlah pertanyaan yang Anda miliki (7 = +50 poin, 10 = +70 poin, 15 = +111 poin)'
                  )}
                </li>
              </ul>
            </p>
            <div className="flex flex-col mt-5 gap-4">
              <h3 className="text-sm text-[#585858] font-bold">
                {translate(language, 'Difficulties', 'Tingkat Kesulitan')}:
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
                  {translate(language, 'Easy', 'Mudah')}
                </button>
                <button
                  onClick={() => handleDifficulty('medium')}
                  className={`px-4 py-3 transition-all rounded-lg ${
                    difficulty === 'medium'
                      ? 'bg-[#004399]'
                      : 'bg-[#f9a826] hover:bg-[#004399]'
                  }`}
                >
                  {translate(language, 'Medium', 'Sedang')}
                </button>
                <button
                  onClick={() => handleDifficulty('hard')}
                  className={`px-4 py-3 transition-all rounded-lg ${
                    difficulty === 'hard'
                      ? 'bg-[#004399]'
                      : 'bg-[#f9a826] hover:bg-[#004399]'
                  }`}
                >
                  {translate(language, 'Hard', 'Sulit')}
                </button>
              </div>
            </div>
            <div className="flex flex-col mt-5 gap-4">
              <h3 className="text-sm text-[#585858] font-bold">
                {translate(
                  language,
                  'Amount Of Questions',
                  'Jumlah Pertanyaan'
                )}
                :
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
              {translate(language, 'Play The Quiz', 'Mainkan Kuis')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
