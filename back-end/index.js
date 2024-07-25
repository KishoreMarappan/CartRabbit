import express from 'express';
import cookie from 'cookie-parser';
import cors from 'cors';
import connectmongodb from './DataBase/mongodbConnection.js'
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js'; 
import AdminRoutes from './routes/AdminRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true
}));
app.use('/uploads', express.static('uploads'));
app.use(cookie());

const PORT = process.env.PORT ; 

app.use('/auth' ,userRoutes) ;
app.use('/api/admin',AdminRoutes);

console.log('starting');
app.listen(PORT,(req,res)=>{
    connectmongodb();
    console.log(`server running successfully in ${PORT}`);
});

