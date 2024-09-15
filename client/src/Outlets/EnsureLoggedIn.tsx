import { Navigate, Outlet } from "react-router-dom";
import React from 'react'
import { useAuthStore } from "@/store/authStore";
import LoadingPage from "@/components/Loading";

function EnsureLoggedIn() {
    const {isLoggedIn} = useAuthStore();
  return (
    <>

        {isLoggedIn === null ? <LoadingPage text="Checking account status..."/> : isLoggedIn === false ? <>
            <LoadingPage text="Redirecting to login..."/>
            <Navigate to="/signin"/>
        </>  : <Outlet/>}
    </>
  )
}

export default EnsureLoggedIn