import React, { useState } from 'react';
import Category from '../components/Category';
import Quiz from '../components/Quiz';

const PlayPage: React.FC = () => {
  const [category, setCategory] = useState<boolean>(false);
  const [playAPI, setPlayAPI] = useState<string>('');

  return (
    <>
      {!category ? (
        <Category setCategory={setCategory} setPlayAPI={setPlayAPI} />
      ) : (
        <Quiz playAPI={playAPI} />
      )}
    </>
  );
};

export default PlayPage;
