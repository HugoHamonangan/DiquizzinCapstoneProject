import React, { useState, useEffect } from 'react';
import mathImage from '../img/quizImage.png';
import sportsImage from '../img/sportsImage.png';
import geographyImage from '../img/geographyImages.png';
import animalsImage from '../img/animalsImage.png';
import booksImage from '../img/booksImage.png';
import computersImage from '../img/computerImage.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAnimate, stagger } from 'framer-motion';
import Modal from '../components/Modal';
import HangingLanguageChanger from '../components/HangingLanguageChanger';

import { translate } from '../utils/helperFunction';

import { useAppSelector } from '../states/hooks/hooks';


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

const CategoryPage: React.FC<Props> = ({
  difficulty,
  setDifficulty,
  amountOfQuestion,
  setAmountOfQuestion,
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [imgModal, setImgModal] = useState<string>('');
  const [category, setCategory] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  const [scope, animate] = useAnimate();
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.language);

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

  useEffect(() => {
    const images = Array.from(document.images);
    let loadedImagesCount = 0;

    const handleImageLoad = () => {
      loadedImagesCount++;
      if (loadedImagesCount === images.length) {
        setTimeout(() => setImagesLoaded(true), 130); // Add delay before animations
      }
    };

    images.forEach((image) => {
      if (image.complete) {
        handleImageLoad();
      } else {
        image.addEventListener('load', handleImageLoad);
      }
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener('load', handleImageLoad);
      });
    };
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      const cardItems = document.querySelectorAll('.card-item');

      animate(
        cardItems,
        { top: [100, 0], opacity: [0, 0, 1] },
        { delay: stagger(0.2) }
      );
    }
  }, [imagesLoaded, animate]);

  return (
    <>
      <Modal
        modal={modal}
        handleModal={handleModal}
        difficulty={difficulty}
        handleDifficulty={handleDifficulty}
        amountOfQuestion={amountOfQuestion}
        handleAmountOfQuestion={handleAmountOfQuestion}
        img={imgModal}
        category={category}
      />

      <HangingLanguageChanger />

      <div className="container mx-auto px-10 md:px-0 flex flex-col gap-7">
        <h1 className="text-[#ff964a] text-2xl text-center font-bold mt-11 mb-6">
          {translate(language, 'CHOOSE THE QUIZZES TOPIC YOU WANT TO PLAY', 'MOHON PILIH TOPIK QUIZ')}
        </h1>
        <div className="flex justify-center gap-7 flex-wrap">
          {dataOfCard.map((item, index) => (
            <div
              className="flex flex-col shadow-lg p-0 rounded-lg overflow-hidden pb-6 hover:scale-105 transition-all cursor-pointer relative card-item opacity-0"
              key={index}
              ref={scope}
            >
              <div className="overflow-hidden border">
                <img
                  src={item.img}
                  alt={item.img}
                  className="object-cover w-full scale-105 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2 my-5 px-5">
                <h3 className="font-bold">Quiz</h3>
                <h1 className="font-extrabold text-xl">{item.title}</h1>
              </div>

              <button
                className="rounded-lg text-white bg-[#ff964a] hover:bg-[#bc6222] transition-all p-2 mx-5 font-bold"
                onClick={() => handleModal(item.img, item.category)}
              >
                Play
              </button>
            </div>
          ))}
        </div>

        <Link
          to={'/dashboard'}
          className="rounded-lg text-white bg-[#ff964a] hover:bg-[#bc6222] transition-all py-3 px-5 mx-auto my-20 font-bold w-fit"
        >
          Back To Dashboard
        </Link>
      </div>
    </>
  );
};

export default CategoryPage;
