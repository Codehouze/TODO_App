import App from "./app";
import config from "./config";
import express from "express";


require("dotenv").config();



const app = new App(express(), Number(config.APP_PORT));





