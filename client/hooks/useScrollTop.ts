import React, { useEffect } from "react";

const useScrollTop = (name: string = "app") => {
  useEffect(() => {
    document.getElementById(name)?.scrollTo(0, 0);
  }, []);
};

export default useScrollTop;
