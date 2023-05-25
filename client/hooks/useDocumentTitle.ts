import { useLayoutEffect } from "react";

const useDocumentTitle = (title?: string) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = "Online Shoe | Dat Shoe";
    }
  }, [title]);
};

export default useDocumentTitle;
