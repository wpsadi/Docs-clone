import { Navigate, Outlet } from "react-router-dom";
import React from 'react'
import { useAuthStore } from "@/store/authStore";
import LoadingPage from "@/components/Loading";

function EnsureNotLoggedIn() {
    const {isLoggedIn} = useAuthStore();
  return (
    <>

        {isLoggedIn === null ? <LoadingPage text="Checking account status..."/> : isLoggedIn === true ? <>
            <LoadingPage text="Redirecting to dashboard..."/>
            <Navigate to="/dashboard"/>
        </>  : <Outlet/>}
    </>
  )
}

export default EnsureNotLoggedIn