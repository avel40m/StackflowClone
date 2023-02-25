import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import UserRoutes from "./UserRoutes.js";

const app = express();
const port = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.get('/', (req, res) => {
    res.send('test');
});

app.use(UserRoutes);

app.listen(port, () => {
    console.log('Listening on port ' + port);
});