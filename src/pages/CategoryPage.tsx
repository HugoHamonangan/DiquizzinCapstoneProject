import React, { useEffect } from 'react';
import mathImage from '../img/quizImage.png';
import sportsImage from '../img/sportsImage.png';
import geographyImage from '../img/geographyImages.png';
import animalsImage from '../img/animalsImage.png';
import booksImage from '../img/booksImage.png';
import computersImage from '../img/computerImage.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../states/hooks/hooks';
import { setIsUserPlayingYes } from '../states/slices/isUserPlayingSlices';
import CryptoJS from 'crypto-js';

type InterfaceDataOfCard = {
  img: string;
  title: string;
  category: string;
  api: string;
};

const dataOfCard: InterfaceDataOfCard[] = [
  {
    img: mathImage,
    title: 'Mathematic',
    category: 'Mathematic',
    api: 'https://opentdb.com/api.php?amount=15&category=19&difficulty=medium&type=multiple',
  },
  {
    img: sportsImage,
    title: 'Sports',
    category: 'Sports',
    api: 'https://opentdb.com/api.php?amount=15&category=21&difficulty=medium&type=multiple',
  },
  {
    img: geographyImage,
    title: 'Geography',
    category: 'Geography',
    api: 'https://opentdb.com/api.php?amount=15&category=22&difficulty=medium&type=multiple',
  },
  {
    img: animalsImage,
    title: 'Animals',
    category: 'Animals',
    api: 'https://opentdb.com/api.php?amount=15&category=27&difficulty=medium&type=multiple',
  },
  {
    img: booksImage,
    title: 'Books',
    category: 'Books',
    api: 'https://opentdb.com/api.php?amount=15&category=10&difficulty=medium&type=multiple',
  },
  {
    img: computersImage,
    title: 'Computer',
    category: 'Computer',
    api: 'https://opentdb.com/api.php?amount=15&category=18&difficulty=medium&type=multiple',
  },
];

const CategoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const secretKey = 'b8@#gF^7jD!kLQpO4rT$zXcV9nW1yU5&'; // Example of a strong secret key

  useEffect(() => {
    if (localStorage.getItem('isUserPlaying') === '"yes"') {
      navigate('/quiz');
    }
  }, [navigate]);

  const handlePlay = async (api: string) => {
    dispatch(setIsUserPlayingYes());

    try {
      const response = await fetch(api);
      const data = await response.json();
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
      localStorage.setItem('quizData', encryptedData);

      navigate('/quiz');
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  return (
    <div className="container mx-auto px-10 md:px-0 flex flex-col gap-7">
      <h1 className="text-[#ff964a] text-2xl text-center font-bold mt-11 mb-6">CHOOSE THE QUIZZES TOPIC YOU WANT TO PLAY</h1>
      <div className="flex justify-center gap-7 flex-wrap">
        {dataOfCard.map((item, index) => (
          <div className="flex flex-col shadow-lg p-0 rounded-lg overflow-hidden pb-6" key={index}>
            <div className="overflow-hidden border">
              <img src={item.img} alt={item.img} className="object-cover w-full scale-105 rounded-lg" />
            </div>

            <div className="flex flex-col gap-2 my-5 px-5">
              <h3 className="font-bold">Quiz</h3>
              <h1 className="font-extrabold text-xl">{item.title}</h1>
              <h4>15 Questions</h4>
            </div>

            <button className="rounded-lg text-white bg-[#ff964a] hover:bg-[#bc6222] transition-all p-2 mx-5 font-bold" onClick={() => handlePlay(item.api)}>
              Play
            </button>
          </div>
        ))}
      </div>
      <Link to={'/dashboard'} className="rounded-lg text-white bg-[#ff964a] hover:bg-[#bc6222] transition-all py-3 px-5 mx-auto my-20 font-bold w-fit">
        Back To Dashboard
      </Link>
    </div>
  );
};

export default CategoryPage;
