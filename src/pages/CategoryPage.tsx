import React, { useState, useEffect } from 'react';
import mathImage from '../img/quizImage.png';
import sportsImage from '../img/sportsImage.png';
import geographyImage from '../img/geographyImages.png';
import animalsImage from '../img/animalsImage.png';
import booksImage from '../img/booksImage.png';
import computersImage from '../img/computerImage.png';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Modal from '../components/Modal';

type InterfaceDataOfCard = {
  img: string;
  title: string;
  category: number;
};

type Props = {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  amountOfQuestion: number;
  setAmountOfQuestion: (amountOfQuestion: number) => void;
};

const dataOfCard: InterfaceDataOfCard[] = [
  {
    img: mathImage,
    title: 'Mathematic',
    category: 19,
  },
  {
    img: sportsImage,
    title: 'Sports',
    category: 21,
  },
  {
    img: geographyImage,
    title: 'Geography',
    category: 22,
  },
  {
    img: animalsImage,
    title: 'Animals',
    category: 27,
  },
  {
    img: booksImage,
    title: 'Books',
    category: 10,
  },
  {
    img: computersImage,
    title: 'Computer',
    category: 18,
  },
];

const CategoryPage: React.FC<Props> = ({ difficulty, setDifficulty, amountOfQuestion, setAmountOfQuestion }) => {
  const [modal, setModal] = useState<boolean>(false);
  // const [difficulty, setDifficulty] = useState<string>('');
  // const [amountOfQuestion, setAmountOfQuestion] = useState<number>(0);
  const [imgModal, setImgModal] = useState<string>('');
  const [category, setCategory] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isUserPlaying') === '"yes"') {
      // navigate('/quiz');
    }
  }, [navigate]);

  const handleDifficulty = (difficult: string) => {
    setDifficulty(difficult);
  };

  const handleAmountOfQuestion = (amount: number) => {
    setAmountOfQuestion(amount);
  };

  const handleModal = (img: string, category: number) => {
    setModal(!modal);
    setImgModal(img);
    setCategory(category);
  };

  return (
    <>
      <Modal modal={modal} handleModal={handleModal} difficulty={difficulty} handleDifficulty={handleDifficulty} amountOfQuestion={amountOfQuestion} handleAmountOfQuestion={handleAmountOfQuestion} img={imgModal} category={category} />

      <PageTransition>
        <div className="container mx-auto px-10 md:px-0 flex flex-col gap-7">
          <h1 className="text-[#ff964a] text-2xl text-center font-bold mt-11 mb-6">CHOOSE THE QUIZZES TOPIC YOU WANT TO PLAY</h1>
          <div className="flex justify-center gap-7 flex-wrap">
            {dataOfCard.map((item, index) => (
              <div className="flex flex-col shadow-lg p-0 rounded-lg overflow-hidden pb-6 hover:scale-105 transition-all cursor-pointer" key={index}>
                <div className="overflow-hidden border">
                  <img src={item.img} alt={item.img} className="object-cover w-full scale-105 rounded-lg" />
                </div>

                <div className="flex flex-col gap-2 my-5 px-5">
                  <h3 className="font-bold">Quiz</h3>
                  <h1 className="font-extrabold text-xl">{item.title}</h1>
                </div>

                <button className="rounded-lg text-white bg-[#ff964a] hover:bg-[#bc6222] transition-all p-2 mx-5 font-bold" onClick={() => handleModal(item.img, item.category)}>
                  Play
                </button>
              </div>
            ))}
          </div>

          <Link to={'/dashboard'} className="rounded-lg text-white bg-[#ff964a] hover:bg-[#bc6222] transition-all py-3 px-5 mx-auto my-20 font-bold w-fit">
            Back To Dashboard
          </Link>
        </div>
      </PageTransition>
    </>
  );
};

export default CategoryPage;
