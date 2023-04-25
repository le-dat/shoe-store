import React from "react";

interface IProps {
  title: string;
  onClick?: any;
  disabled?: boolean;
}
const ButtonPagination: React.FC<IProps> = ({ title, disabled, onClick }) => {
  const className = `py-2 px-4 rounded-md transition ${
    disabled ? "bg-gray-200" : "bg-black text-white hover:bg-opacity-80"
  }`;

  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonPagination;
