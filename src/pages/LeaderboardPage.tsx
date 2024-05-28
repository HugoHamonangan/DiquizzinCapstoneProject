import React from 'react';
import leaderboardTitle from '../img/TitleBG.png';
import goldenStar from '../img/goldenStar.png';
import silverStar from '../img/silverStar.png';
import bronzeStar from '../img/bronzeStar.png';
import forthStar from '../img/4thStar.png';
import defaultStar from '../img/defaultStar.png';
import LeaderboardItem from '../components/LeaderboardItem';
import { translate } from '../utils/helperFunction';
import { useAppSelector } from '../states/hooks/hooks';

const generateRandomName = () => {
  const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hannah', 'Ian', 'Jack', 'Kara', 'Liam', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quincy', 'Rachel', 'Sam', 'Tina'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Wilson', 'Davis', 'Miller', 'Lee', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark'];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

const generateRandomEmail = (name: string) => {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'mail.com', 'aol.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = `${name.toLowerCase().replace(' ', '')}@${domain}`;
  return email;
};

const generateDummyData = () => {
  const imgTypes = [goldenStar, silverStar, bronzeStar, forthStar, defaultStar];
  const dummyData = [];
  const minScore = 200;
  const maxScore = 5600;

  for (let i = 0; i < 100; i++) {
    const name = generateRandomName();
    const email = generateRandomEmail(name);
    const imgIndex = i < imgTypes.length ? i : imgTypes.length - 1;
    const score = minScore + Math.floor(Math.random() * (maxScore - minScore + 1));

    dummyData.push({
      ranking: (i + 1).toString(),
      name: name,
      email: email,
      img: imgTypes[imgIndex],
      score: score.toString(),
    });
  }

  return dummyData;
};

const dummyData = generateDummyData();

const LeaderboardPage: React.FC = () => {
  const language = useAppSelector((state) => state.language);

  return (
    <section id="leaderboard" className="container mx-auto px-10 md:px-0 mt-[10.5rem]">
      <div className="relative w-fit mx-auto ">
        <img src={leaderboardTitle} alt="Leaderboard Title" className="object-cover w-[19rem] mx-auto" loading="lazy" />
        <h1 className=" left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-3xl font-extrabold text-white text-center w-full">{translate(language, 'Leaderboard', 'Papan Skor')}</h1>
      </div>

      <div className="flex flex-col gap-7 mt-[4rem] mb-[2rem]">
        {dummyData.map((item) => (
          <LeaderboardItem key={item.ranking} ranking={item.ranking} name={item.name} email={item.email} img={item.img} score={item.score} />
        ))}
      </div>
    </section>
  );
};

export default LeaderboardPage;
