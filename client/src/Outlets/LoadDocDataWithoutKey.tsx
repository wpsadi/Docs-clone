import LoadingPage from "@/components/Loading";
import LoginFailed from "@/pages/landingPages/loginFailed/LoginFailed";
import { useDocStore } from "@/store/docStore";
import React, { useEffect } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";

function LoadDocViewData() {
  const { id } = useParams();
  const searchParams = useSearchParams()[0];
  const key = searchParams.get("key") || "";
  // // console.log(key);
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const [data, setData] = React.useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });
  const docStore = useDocStore();
  useEffect(() => {
    if (id) {
      docStore
        .getviewDocData(id, key)
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((e) => {
          // // console.log(e);
          setLoading(false);
          setFailed(true);
        });
    }
  }, []);
  return (
    <>
      {!id ? (
        <LoginFailed text={"Invalid Values"} />
      ) : loading ? (
        <LoadingPage text="Loading doc..." />
      ) : failed ? (
        <LoginFailed text={"Failed to load doc"} />
      ) : (
        <Outlet context={data} />
      )}
    </>
  );
}

export default LoadDocViewData;
