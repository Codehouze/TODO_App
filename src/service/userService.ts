import User from "../entity/User";

class UserService {
  static async signUp(userName: string, password: string): Promise<any> {
    await this.getOne(userName);

    const user = new User();
    user.userName = userName;
    user.password = password;

    await user.save();
  }

  // const validPassword = await bcrypt.compare(
  //   req.body.password,
  //   user.password
  // );
  // if (!validPassword) {
  //   return res.status(401).json({ error: "Invalid username or password" });
  // }
  // const token = jwt.sign({ userId: user.id }, "mysecretkey");
  // res.json({ token });

  static async login(userName: string, password: string): Promise<any> {}

  static async getOneById(id: number): Promise<any> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
  }

  static async getOne(userName: string): Promise<any> {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      throw new Error("User not found");
    }
  }
}

export default UserService;
