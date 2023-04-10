import { IUser } from "../Interface/index";

import { NextFunction, Request, Response } from "express";
import UserService from "../service/userService";

class UserController {
  static async signUp(req: any, res: Response, next: NextFunction) {
    try {
      const {
        body: { userName, password },
      } = req;
      const signUp = await UserService.signUp(userName, password);
      return res.json({ message: "User created successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: any, res: Response, next: NextFunction) {
    try {
      const {
        body: { userName, password },
      } = req;
      const login = await UserService.login(userName, password);
      return res.json({ message: "Login successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req: any, res: Response, next: NextFunction) {
    try {
      const {
        body: { userName },
      } = req;
      const getOne = await UserService.getOne(userName);
      return getOne;
    } catch (err) {
      next(err);
    }
  }
  static async getOneById(req: any, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = req;
      const getOneBy = await UserService.getOneById(id);
      return getOneBy;
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
