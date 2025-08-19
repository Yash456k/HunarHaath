import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isSeller: user.isSeller },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


export default generateToken;
