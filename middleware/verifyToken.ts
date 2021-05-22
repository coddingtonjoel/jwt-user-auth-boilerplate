import jwt from "jsonwebtoken";

// token verification middleware
const verify = (req: any, res: any, next: any) => {
    const token = req.header("auth-token");

    if (!token) {
        // TODO have this redirect to login page?
        return res.status(401).send("User not logged in");
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET!);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid token");
    }
};

export default verify;
