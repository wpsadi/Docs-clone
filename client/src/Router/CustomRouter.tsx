import { Route, Routes } from "react-router-dom";
import EditorPage from "@/pages/landingPages/editor/EditorPage";
import HomePage from "@/pages/landingPages/home/HomePage";
import FeaturesPage from "@/pages/landingPages/features/FeaturesPage";
import PricingPage from "@/pages/landingPages/pricing/PricingPage";
import AboutPage from "@/pages/landingPages/about/AboutPage";
import Signuppage from "@/pages/landingPages/signup/Signuppage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import Signinpage from "@/pages/landingPages/signin/SigninPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import DocumentEditorPage from "@/pages/EditorPage/EditorPage";
import LoginFailed from "@/pages/landingPages/loginFailed/LoginFailed";
import EnsureLoggedIn from "@/Outlets/EnsureLoggedIn";
import EnsureNotLoggedIn from "@/Outlets/EnsureNotLoggedIn";
import LoadDocData from "@/Outlets/LoadDocData";
import DocumentViewPage from "@/pages/viewDoc/ViewDocPage";
import LoadDocViewData from "@/Outlets/LoadDocDataWithoutKey";

function CustomRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Auth */}
        {/* <Route path="/login" element={<LoginPage/>} /> */}
        <Route element={<EnsureNotLoggedIn />}>
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/signin" element={<Signinpage />} />
        </Route>

        <Route
          path="/signup-failed"
          element={<LoginFailed text={"Signup Failed"} />}
        />

        <Route
          path="/signin-failed"
          element={<LoginFailed text={"Signin Failed"} />}
        />

        {/* login must */}
        <Route element={<EnsureLoggedIn />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/new-doc" element={<DocumentEditorPage />} />
        </Route>

    {/* With realtime */}
        <Route element={<LoadDocData />}>
          <Route path="/doc/:id" element={<DocumentEditorPage />} />
        </Route>

      {/* Just for view */}
        <Route element={<LoadDocViewData/>}>
          <Route path="/doc/:id/view" element={<DocumentViewPage />} />
        </Route>



        {/* Error */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default CustomRouter;
