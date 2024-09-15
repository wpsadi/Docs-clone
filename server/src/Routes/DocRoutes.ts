import { createNewDoc, DeleteDoc, getDocContent, getDocViewContent, listDocs, updateDocTitleContent,  } from "@/Controllers/DocsController/controller";
import { isLoggedIn } from "@/middlewares/isLoggedIn";
import { looselyLoggedIn } from "@/middlewares/looslyensureLoggedIn";
import { Router } from "express";

const docRouter = Router();

docRouter.get("/new",isLoggedIn,createNewDoc)
docRouter.get("/list",isLoggedIn,listDocs)

docRouter.get("/:id/:key",getDocContent)
docRouter.get("/:id",getDocViewContent)
docRouter.put("/:id/:key",updateDocTitleContent)
docRouter.delete("/:id/:key",looselyLoggedIn,DeleteDoc)

export default docRouter;