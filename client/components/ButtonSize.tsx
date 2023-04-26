import React from "react";

interface IProps {
  title: string;
  active?: boolean;
  onClick?: any;
  disabled?: boolean;
}
const ButtonSize: React.FC<IProps> = ({ title, active, disabled, onClick }) => {
  const className = `py-2 px-4 border rounded-md transition [-webkit-tap-highlight-color:transparent] ${
    disabled ? "bg-gray-300 opacity-50" : active ? "border-black bg-gray-100" : ""
  }`;

  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonSize;
