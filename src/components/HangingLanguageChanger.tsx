import React from 'react';
import { useAppDispatch, useAppSelector } from '../states/hooks/hooks'; // Combined the imports for simplicity
import { setIndonesian, setEnglish } from '../states/slices/languageSlices';

const HangingLanguageChanger: React.FC = () => {
  const language = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();

  console.log(language);

  return (
    <div className="fixed -right-2 top-16 z-50">
      {language === 'id' ? (
        <button onClick={() => dispatch(setEnglish())} className='p-3 pr-6 rounded-md bg-slate-100 shadow-lg'>🇮🇩</button>
      ) : (
        <button onClick={() => dispatch(setIndonesian())} className='p-3 pr-6 rounded-md bg-slate-100 shadow-lg'>🇬🇧</button>
      )}
    </div>
  );
};

export default HangingLanguageChanger;
