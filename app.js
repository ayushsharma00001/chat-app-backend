import dotenv from "dotenv";
dotenv.config({});
import express from "express";
import connectDb from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session"
import MongoStore from "connect-mongo";


// Mongo store setup
const db_url = process.env.MONGO_URL;
const store = MongoStore.create({
  mongoUrl:db_url,
  crypto:{
      secret:process.env.SECRET
  },
  tuchAfter:24*3600

});
store.on("error",()=>{
  console.log("Error occured on Mongo session store",err);
})


const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUnintitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true
    },
  };


app.use(session(sessionOptions));




app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
import { app,server } from "./socket/socket.js";


const corsOption = {
    origin:"https://bateyien.pages.dev",
    credentials:true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOption));
// requiring routes
import userRouters from "./routes/userRoute.js"
import messageRouters from "./routes/messageRoute.js"

// using routes
app.use("/api/v1/user",userRouters);
app.use("/api/v1/message",messageRouters);









app.get("/",(req,res,next)=>{
    res.send("Home page")
})




const PORT = process.env.PORT;

server.listen(PORT,()=>{
    connectDb();
    console.log(`App is listening on port ${PORT}`);
});
