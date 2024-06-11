import React, { useEffect, useState } from 'react';
import leaderboardTitle from '../img/TitleBG.png';
import goldenStar from '../img/goldenStar.png';
import silverStar from '../img/silverStar.png';
import bronzeStar from '../img/bronzeStar.png';
import forthStar from '../img/4thStar.png';
import defaultStar from '../img/defaultStar.png';
import LeaderboardItem from '../components/LeaderboardItem';
import { translate } from '../utils/helperFunction';
import { useAppSelector } from '../states/hooks/hooks';
import { readAllData } from '../firebase/crud';

type Data = {
  name: string;
  email: string;
  score: number;
  uid: string;
};

const LeaderboardPage: React.FC = () => {
  const language = useAppSelector((state) => state.language);
  const [leaderboardData, setLeaderboardData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readAllData('users');

        const sortedData = data.sort((a, b) => b.score - a.score);
        setLeaderboardData(sortedData);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStarImage = (index: number) => {
    switch (index) {
      case 0:
        return goldenStar;
      case 1:
        return silverStar;
      case 2:
        return bronzeStar;
      case 3:
        return forthStar;
      default:
        return defaultStar;
    }
  };

  return (
    <section
      id="leaderboard"
      className="container mx-auto px-10 md:px-0 mt-[10.5rem] pb-7"
    >
      <div className="relative w-fit mx-auto">
        <img
          src={leaderboardTitle}
          alt="Leaderboard Title"
          className="object-cover w-[19rem] mx-auto"
          loading="lazy"
        />
        <h1 className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-3xl font-extrabold text-white text-center w-full">
          {translate(language, 'Leaderboard', 'Papan Skor')}
        </h1>
      </div>
      {loading ? (
        <p className="flex items-center justify-center h-screen">Loading...</p>
      ) : (
        <div className="flex flex-col gap-7 mt-[4rem] mb-[2rem]">
          {leaderboardData.map((user, index) => (
            <LeaderboardItem
              key={index}
              ranking={index + 1}
              name={user.name}
              email={user.email}
              img={getStarImage(index)}
              score={user.score}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default LeaderboardPage;
