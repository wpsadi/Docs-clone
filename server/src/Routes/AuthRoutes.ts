import { GithubCallback, GithubLogin, Logout, UserInfo } from "@/Controllers/AuthControllers/controller";
import { isLoggedIn } from "@/middlewares/isLoggedIn";
import { Router } from "express";


const authRouter = Router();


authRouter.get("/github",GithubLogin);

authRouter.get("/github/callback",GithubCallback);
authRouter.get("/me",isLoggedIn,UserInfo)
authRouter.get("/logout",Logout)


export default authRouter;