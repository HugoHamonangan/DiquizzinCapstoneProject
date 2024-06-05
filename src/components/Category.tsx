import React from 'react';
import mathImage from '../img/quizImage.png';
import sportsImage from '../img/sportsImage.png';
import geographyImage from '../img/geographyImages.png';
import animalsImage from '../img/animalsImage.png';
import booksImage from '../img/booksImage.png';
import computersImage from '../img/computerImage.png';
import { Link } from 'react-router-dom';

interface CategoryProps {
  setCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayAPI: React.Dispatch<React.SetStateAction<string>>;
}

const Category: React.FC<CategoryProps> = ({ setCategory, setPlayAPI }) => {
  const dataOfCard = [
    {
      img: mathImage,
      title: 'Mathematic',
      handle: () => {
        setCategory(true);
        setPlayAPI('Mathematic');
      },
    },
    {
      img: sportsImage,
      title: 'Sports',
      handle: () => {
        setCategory(true);
        setPlayAPI('Sports');
      },
    },
    {
      img: geographyImage,
      title: 'Geography',
      handle: () => {
        setCategory(true);
        setPlayAPI('Geography');
      },
    },
    {
      img: animalsImage,
      title: 'Animals',
      handle: () => {
        setCategory(true);
        setPlayAPI('Animals');
      },
    },
    {
      img: booksImage,
      title: 'Books',
      handle: () => {
        setCategory(true);
        setPlayAPI('Books');
      },
    },
    {
      img: computersImage,
      title: 'Computer',
      handle: () => {
        setCategory(true);
        setPlayAPI('Computer');
      },
    },
  ];

  return (
    <div className="container mx-auto px-10 md:px-0 flex flex-col gap-7">
 
      <h1 className="text-[#ff964a] text-2xl text-center font-bold mt-11 mb-6">
        CHOOSE THE QUIZZES TOPIC YOU WANT TO PLAY
      </h1>
      <div className="flex justify-center gap-7 flex-wrap">
        {dataOfCard.map((item, index) => (
          <div
            className="flex flex-col shadow-lg p-0 rounded-lg overflow-hidden pb-6"
            key={index}
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
              <h4>15 Questions</h4>
            </div>

            <button
              className="rounded-lg text-white bg-[#ff964a] hover:bg-[#bc6222] transition-all p-2 mx-5 font-bold"
              onClick={item.handle}
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
  );
};

export default Category;
