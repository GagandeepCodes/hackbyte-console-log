import express from "express"
import { applicationUpdate, postApplication } from "../controller/applicationController.js"
import { isAuthorized } from "../middlewares/auth.js"

const router = express.Router()

router.post("/post",isAuthorized,postApplication)
router.put("/update/:id",isAuthorized,applicationUpdate)

export default router