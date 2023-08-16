const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY_SID;
const auth = async(req, res, next) => {
    if(req.method === "GET"){
        return next();
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG1vbm90ZWluLmNvbSIsImlhdCI6MTY5MjE5NDQ5OCwiZXhwIjoxNjkyMTk0Nzk4fQ.Cf16vE-QZZKH4bzWldmy4M1K_miNmX36XW1n3LKStCg";
    // const token = await req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(400).json({message: "トークンがありません"});
    };
    try {
        const decoded = jwt.verify(token, secret_key);
        console.log(decoded);
        req.body.email = decoded.email;
        return next();
    } catch (err) {
        return res.status(400).json({message: "トークンが正しくないので、ログインしてください"})
    }
};

module.exports = auth;
