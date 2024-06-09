import React from 'react';
import Plane from '../img/plane.png';
import Decoration from '../img/decoration.png';
import { UserAuth } from '../context/AuthContext';

import { translate } from '../utils/helperFunction';

import { useAppSelector } from '../states/hooks/hooks';

import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const language = useAppSelector((state) => state.language);
  const { user } = UserAuth();

  return (
    <div className="container mx-auto px-10 md:px-0 flex flex-col items-center justify-center gap-7 h-screen pt-9">
      <h1 className="font-extrabold text-[#F9A826] text-3xl w-full max-w-[40rem] text-center">
        {translate(language, `HELLO ${user?.name} WELCOME TO DIQUIZZIN LET'S START !!!`, `HALLO ${user?.name} SELAMAT DATANG DI DIQUIZZIN, AYO MULAI!!!`)}
      </h1>
      <p className="w-full max-w-[40rem] text-center">
        {translate(
          language,
          `Its ok to search the result on the internet, remember the important
          thing to do is you need to read the information, and become the person
          that rich of knowledge !!!`,
          `Boleh kok untuk mencari jawabannya di internet, tapi ingat untuk membaca informasi yang ada disitu, sedikit aja ga apa, yang penting Anda dapat informasi untuk wawasan Anda. `
        )}
      </p>
      <Link to={'/category'} className="bg-[#0C356A] hover:bg-blue-600 px-[2rem] py-[1.3rem] rounded-lg w-full max-w-[40rem] relative overflow-hidden transition-all flex justify-center shadow-xl ">
        <img src={Decoration} alt={Decoration} className="absolute -left-0 -bottom-[1rem] w-[30%] group-hover:-left-5" />
        <p className="text-white font-bold text-xl ">{translate(language, 'Play The Quiz', 'Mainkan Quiz')}</p>
        <img src={Plane} alt={Plane} className="absolute -right-[0rem] bottom-0 md:-bottom-[1rem] w-[30%] group-hover:-right-5" />
      </Link>
      <h1 className="p-3 rounded-lg mt-8 border border-[#F9A826]">
        {translate(language, 'Your Score is', 'Skor Kamu adalah') + ' '}
        {user?.score}
      </h1>
    </div>
  );
};

export default DashboardPage;
