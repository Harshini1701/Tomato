import  express, { urlencoded }  from "express";
import cors from "cors";
import helmet from "helmet";

const tomato = express();

//application middlewares
tomato.use(express.json());
tomato.use(express.urlencoded({extended:false}));
tomato.use(helmet());
tomato.use(cors());



tomato.get("/",(req,res) => res.json({message: "running"}));

tomato.listen(4140, () => console.log("server is running"));