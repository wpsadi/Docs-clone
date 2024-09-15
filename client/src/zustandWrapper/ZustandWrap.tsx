import { useAuthStore } from "@/store/authStore";
import { useDocStore } from "@/store/docStore";
import React from "react";

function ZustandWrap() {
  const { reinstateSession, isLoggedIn } = useAuthStore();
  const { listDocs } = useDocStore();
  // // console.log(isLoggedIn)
  React.useEffect(() => {
    reinstateSession();
    listDocs();
    // const intervalId = setInterval(reinstateSession, 2000);

    return () => {
      // clearInterval(intervalId);
    };
  }, [isLoggedIn]);

  return <></>;
}

export default ZustandWrap;
