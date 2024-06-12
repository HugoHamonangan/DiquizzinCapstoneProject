import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Plane from '../img/plane.png';
import Decoration from '../img/decoration.png';
import { UserAuth } from '../context/AuthContext';
import { translate } from '../utils/helperFunction';
import { useAppSelector } from '../states/hooks/hooks';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const language = useAppSelector((state) => state.language);
  const { user } = UserAuth();
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      navigate('/category');
    }, 1100); // Delay navigation to allow the animation to complete
  };

  const exitAnimation = {
    x: [0, -90, 1000],
    transition: { duration: 1, ease: 'easeInOut' },
  };

  return (
    <div className="relative mx-auto px-10 md:px-0 flex flex-col items-center justify-center gap-7 h-screen pt-9 mt-5 ">
      <AnimatePresence>
        {!isClicked && (
          <motion.div
            className="w-full max-w-[40rem] flex flex-col gap-7"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={exitAnimation}
            style={{ position: 'relative' }}
          >
            <h1 className="font-extrabold text-[#F9A826] text-xl md:text-3xl w-full max-w-[40rem] text-center">
              {translate(
                language,
                `HELLO ${user?.name} WELCOME TO DIQUIZZIN LET'S START !!!`,
                `HALLO ${user?.name} SELAMAT DATANG DI DIQUIZZIN, AYO MULAI!!!`
              )}
            </h1>
            <p className="w-full max-w-[40rem] text-center">
              {translate(
                language,
                `Its ok to search the result on the internet, remember the important thing to do is you need to read the information, and become the person that rich of knowledge !!!`,
                `Boleh kok untuk mencari jawabannya di internet, tapi ingat untuk membaca informasi yang ada disitu, sedikit aja ga apa, yang penting Anda dapat informasi untuk wawasan Anda. `
              )}
            </p>
            <button
              onClick={handleClick}
              className="bg-[#0C356A] hover:bg-blue-600 px-[2rem] py-[1.3rem] rounded-lg w-full relative overflow-hidden transition-all flex justify-center shadow-xl"
            >
              <img
                src={Decoration}
                alt="Decoration"
                className="absolute -left-0 -bottom-[1rem] w-[30%] group-hover:-left-5"
              />
              <p className="text-white font-bold text-xl">
                {translate(language, 'Play The Quiz', 'Mainkan Quiz')}
              </p>
              <img
                src={Plane}
                alt="Plane"
                className="absolute -right-[0rem] bottom-0 md:-bottom-[1rem] w-[30%] group-hover:-right-5"
              />
            </button>
            <h1 className="p-3 rounded-lg mt-8 border border-[#F9A826] w-fit mx-auto">
              {translate(language, 'Your Score is', 'Skor Kamu adalah') + ' '}
              {user?.score}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
