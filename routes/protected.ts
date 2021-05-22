const express = require("express");
const router = express.Router();
import verify from "../middleware/verifyToken";

router.get("/", verify, (req: any, res: any) => {
    res.send("You need the auth-token header to access this route!");
});

module.exports = router;
