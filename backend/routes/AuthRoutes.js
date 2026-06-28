import express from "express";

import {googleLogin, Login, logOut, Register} from "../controller/AuthController.js";

const authRoutes=express.Router();

authRoutes.post("/register",Register);
authRoutes.post('/login',Login);
authRoutes.post('/googlelogin',googleLogin);
authRoutes.get('/logout',logOut);
export default authRoutes;