import React from 'react';

type LeaderboardItemProps = {
  ranking: string;
  name: string;
  email: string;
  img: string;
  score: string;
};

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  ranking,
  name,
  email,
  img,
  score,
}): JSX.Element => {
  const backgroundColorBaseOnRanking = (ranking: string) => {
    switch (ranking) {
      case '1':
        return 'bg-golden';
      case '2':
        return 'bg-silver';
      case '3':
        return 'bg-bronze';
      case '4':
        return 'bg-forth';
      default:
        return 'bg-default';
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1 ">
        <div className="flex items-center justify-between">
          <img
            src={img}
            alt={name}
            className="object-scale-down block md:hidden w-[9rem] h-[1.5rem] self-end"
          />
          <h3 className="font-bold text-xl block sm:hidden">{score}</h3>
        </div>
        <div
          className={` ${backgroundColorBaseOnRanking(
            ranking
          )} flex items-center justify-between gap-3 px-8 py-5 rounded-ss-xl relative `}
        >
          <div className="absolute bg-black opacity-35 triangle w-10 h-10 left-0 bottom-0"></div>
          <div className="flex items-center gap-9">
            <h3 className="font-bold text-3xl">{ranking}</h3>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-xl">{name}</p>
              <p className="text-sm md:text-base">{email}</p>
            </div>
          </div>
          <div className="flex items-center gap-11">
            <img
              src={img}
              alt={name}
              className="object-contain hidden md:block md:w-full"
            />
            <h3 className="font-bold text-4xl hidden sm:block">{score}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderboardItem;
