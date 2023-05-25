import React from "react";

interface IProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const WrapperModal: React.FC<IProps> = ({ showModal, setShowModal, children }) => {
  if (!showModal) return null;

  return (
    <div
      className="bg-black bg-opacity-20 flex items-center justify-center fixed inset-0 z-40"
      onClick={() => setShowModal(false)}
    >
      <div className="bg-slate-100 shadow-lg rounded-lg" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default WrapperModal;
