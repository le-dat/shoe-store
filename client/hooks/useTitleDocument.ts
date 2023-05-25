import React, { useEffect } from "react";

const useTitleDocument = (title: string) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = "Online Shoe Store | Dat Shoe";
    }
  }, [title]);
};

export default useTitleDocument;
