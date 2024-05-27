import React from 'react';
import Plane from '../img/plane.png';
import Decoration from '../img/decoration.png';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-10 md:px-0 flex flex-col items-center justify-center gap-7 h-screen pt-9">
      <h1 className="font-extrabold text-[#F9A826] text-3xl w-full max-w-[40rem] text-center">
        HELLO SOMENONE WELCOME TO DIQUIZZIN LET'S START !!!
      </h1>
      <p className="w-full max-w-[40rem] text-center">
        Its ok to search the result on the internet, remember the important
        thing to do is you need to read the information, and become the person
        that rich of knowledge !!!
      </p>
      <button className="bg-[#0C356A] hover:bg-blue-600 px-[2rem] py-[1.3rem] text-white font-bold text-xl rounded-lg w-full max-w-[40rem] relative overflow-hidden transition-all">
        <img
          src={Decoration}
          alt={Decoration}
          className="absolute -left-0 -bottom-[1rem] w-[30%] group-hover:-left-5"
        />
        Play The Quiz
        <img
          src={Plane}
          alt={Plane}
          className="absolute -right-[0rem] bottom-0 md:-bottom-[1rem] w-[30%] group-hover:-right-5"
        />
      </button>
    </div>
  );
};

export default DashboardPage;
