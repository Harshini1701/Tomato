//since we will be running it directly we use require
//importing env files
require("dotenv").config();


//libraries
import  express, { urlencoded }  from "express";
import cors from "cors";
import helmet from "helmet";

//microservices routes
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";

//db connection
import ConnectDB from "./database/connections";


const tomato = express();

//application middlewares
tomato.use(express.json());
tomato.use(express.urlencoded({extended:false}));
tomato.use(helmet());
tomato.use(cors());

//application routes
tomato.use("/auth",Auth);
tomato.use("/restaurant",Restaurant);
tomato.use("/food",Food);

tomato.get("/",(req,res) => res.json({message: "running"}));

tomato.listen(4140, () => ConnectDB()
.then(() =>console.log("server is running"))
.catch(()=>console.log("server running db not connected"))
);