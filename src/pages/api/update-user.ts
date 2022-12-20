import { NextApiHandler } from "next";

const updateUserHandler: NextApiHandler = (req, res) => {
  res.status(200).json({ message: "success" });
};
export default updateUserHandler;
