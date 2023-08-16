const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}));  // POSTリクエストの解析用
app.use(express.json());                        // POSTリクエストの解析用
const jwt = require("jsonwebtoken");
const auth = require("./utils/auth");
const connectDB = require("./utils/database");
const { ItemModel, UserModel } = require("./utils/schemaModels");



// ITEM functions
// Create Item 
app.post("/item/create", auth, async(req,res) => {
    try{
        await connectDB();
        await ItemModel.create(req.body);
        return res.status(200).json({message: "アイテム作成成功"});
    }catch(err){
        return res.status(400).json({message: "アイテム作成失敗"});
    }
});
// Read All Items
app.get("/", async(req, res) => {
    try{
        await connectDB();
        const allItems = await ItemModel.find();
        await console.log(allItems);
        return res.status(200).json({message: "オールアイテム読み取り成功", allItems: allItems});
    }catch(err){
        return res.status(400).json({message: "オールアイテム読み取り失敗"});
    }

});
// Read Single Item
app.get("/item/:id", async(req, res) =>{
    try{
        await connectDB();
        const singleItem = await ItemModel.findById(req.params.id);
        return res.status(200).json({message: "シングルアイテム読み取り成功"})
    }catch(err){
        return res.status(400).json({message: "シングルアイテム読み取り失敗"})
    };
});
// Update Item
app.put("/item/update/:id", auth, async(req, res) => {
    try{
        await connectDB();
        const singleItem = await ItemModel.findById(req.params.id);
        if(singleItem.email === req.body.email){
            await ItemModel.updateOne({_id: req.params.id}, req.body);
            return res.status(200).json({message: "アイテム編集成功"});
        }else{
            throw new Error();
        };

    }catch(err){
        return res.status(400).json({message: "アイテム編集失敗"});
    }
});
// Delete Item
app.delete("/item/delete/:id", auth, async(req, res) => {
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(req.params.id);
        if (singleItem.email === req.body.email) {
            await ItemModel.deleteOne({_id: req.params.id});
            return res.status(200).json({message: "アイテム削除成功"});            
        } else {
            throw new Error();
        };

    } catch (err) {
        return res.status(400).json({message: "アイテム削除失敗"});
    }


});
// USER functions
// Register User
app.post("/user/register", async(req, res) => {
    try {
        await connectDB();
        await UserModel.create(req.body);
        return res.status(200).json({message: "ユーザー登録成功"});
    } catch (err) {
        return res.status(400).json({message: "ユーザー登録失敗"});
    }
});
// Login User
const secret_key = process.env.SECRET_KEY_SID;
app.post("/user/login", async(req, res) => {
    try {
        await connectDB();
        const savedUserData = await UserModel.findOne({email: req.body.email});
        if (savedUserData) {
            if (req.body.password === savedUserData.password) {
                const payload = {
                    email: req.body.email,
                }
                const token = jwt.sign(payload, secret_key, {expiresIn: "5m"});
                console.log(token);
                return res.status(200).json({message: "ログイン成功", token:token});                
            } else {
                return res.status(400).json({message: "ログイン失敗：パスワードが間違っています"});                     
            };
        } else {
            return res.status(400).json({message: "ログイン失敗：ユーザー登録をしてください"});            
        };
    } catch (error) {
        return res.status(400).json({message: "ログイン失敗"});
    };
});

app.listen(4998, () => {
    console.log("Listening on localhost port 4998.");
});