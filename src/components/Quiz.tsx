import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface QuizProps {
  playAPI: string;
}

interface QuizData {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const generateAPI = (category: string): string => {
  switch (category) {
    case 'Mathematic':
      return 'https://opentdb.com/api.php?amount=15&category=19&difficulty=medium&type=multiple';
    case 'Sports':
      return 'https://opentdb.com/api.php?amount=15&category=21&difficulty=medium&type=multiple';
    case 'Geography':
      return 'https://opentdb.com/api.php?amount=15&category=22&difficulty=medium&type=multiple';
    case 'Animals':
      return 'https://opentdb.com/api.php?amount=15&category=27&difficulty=medium&type=multiple';
    case 'Books':
      return 'https://opentdb.com/api.php?amount=15&category=10&difficulty=medium&type=multiple';
    case 'Computer':
      return 'https://opentdb.com/api.php?amount=15&category=18&difficulty=medium&type=multiple';
    default:
      return '';
  }
};

const Quiz: React.FC<QuizProps> = ({ playAPI }) => {
  const [api, setAPI] = useState<string>('');
  const [data, setData] = useState<QuizData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        setData(response.data.results);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    if (api) {
      fetchData();
    }

    return () => {};
  }, [api]);

  useEffect(() => {
    setAPI(generateAPI(playAPI));
  }, [playAPI]);

  return (
    <>
      {data.map((question: QuizData, index: number) => (
        <div key={index}>
          <h3>Question {index + 1}:</h3>
          <p>{question.question}</p>
          <ul>
            {[...question.incorrect_answers, question.correct_answer].map(
              (answer: string, answerIndex: number) => (
                <li key={answerIndex}>{answer}</li>
              )
            )}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Quiz;
