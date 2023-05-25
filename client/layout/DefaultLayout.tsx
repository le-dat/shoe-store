import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Footer, Header, ModalSearch } from "@/components";

interface IProps {
  children: React.ReactNode;
}
const DefaultLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div id="app">
      <Header />
      {children}
      <Footer />

      {/* MODAL */}
      <ModalSearch />
      {/* toastify */}
      <ToastContainer />
    </div>
  );
};

export default DefaultLayout;
