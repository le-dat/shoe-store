import React from "react";

interface IProps {
  icon: React.ReactNode;
  onClick: any;
  customClass?: string;
  disabled?: boolean;
  quantity?: number;
}

const ButtonNavigation: React.FC<IProps> = ({ icon, quantity = 0, disabled, onClick, customClass }) => {
  return (
    <button
      disabled={disabled}
      className={`flex items-center justify-center relative gap-3 hover:bg-gray-300 rounded-full p-2 cursor-pointer transition [-webkit-tap-highlight-color:transparent] ${customClass}`}
      onClick={onClick}
    >
      {icon}

      {quantity > 0 && (
        <span className="absolute z-10 -right-2 -top-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-medium">
          {quantity}
        </span>
      )}
    </button>
  );
};

export default ButtonNavigation;
