import React from 'react';
import instagramIcon from '../img/InstagramIcon.png';
import youtubeIcon from '../img/YouTubeIcon.png';
import githubIcon from '../img/GitHubIcon.png';
import facebookIcon from '../img/FacebookIcon.png';

type CardProps = {
  img: string;
  name: string;
  explanation: string;
  instagramUser: string;
  youtubeUser: string;
  githubUser: string;
  facebookUser: string;
};

const Card: React.FC<CardProps> = ({
  img,
  name,
  explanation,
  instagramUser,
  youtubeUser,
  githubUser,
  facebookUser,
}) => {
  return (
    <div className="w-[22rem] shadow-card relative overflow-hidden rounded-lg">
      <div className="absolute gradient-blue h-full w-[99.9%] -z-10"></div>
      <div className="absolute bg-white card-clipPath h-full w-full z-0"></div>
      <div className=" z-10 pb-7 relative ml-7 mt-9 pr-9 flex flex-col gap-3">
        <img src={img} alt="Profile" className="w-[11rem]" />
        <h3 className="font-bold text-xl mt-2">{name}</h3>
        <p className="leading-7">{explanation}</p>
        <div className="flex gap-2">
          <a
            href={`https://www.instagram.com/${instagramUser}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="w-[2.4rem] hover:scale-125 transition-all"
              src={instagramIcon}
              alt="Instagram"
            />
          </a>
          <a
            href={`https://www.youtube.com/${youtubeUser}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="w-[2.4rem] hover:scale-125 transition-all"
              src={youtubeIcon}
              alt="YouTube"
            />
          </a>
          <a
            href={`https://www.github.com/${githubUser}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="w-[2.4rem] hover:scale-125 transition-all    "
              src={githubIcon}
              alt="GitHub"
            />
          </a>
          <a
            href={`https://www.facebook.com/${facebookUser}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="w-[2.4rem] hover:scale-125 transition-all"
              src={facebookIcon}
              alt="Facebook"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
