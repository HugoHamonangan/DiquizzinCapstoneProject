import React from 'react';

type InputsProps = {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  setter: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Inputs = ({
  id,
  type,
  placeholder,
  value,
  setter,
}: InputsProps): JSX.Element => {
  return (
    <input
      className="appearance-none bg-transparent border border-[#0C356A] rounded-lg w-full p-3 text-gray-700 leading-tight "
      id={id}
      type={type}
      value={value}
      onChange={setter}
      placeholder={placeholder}
      required
    />
  );
};

export default Inputs;
