import jwt from 'jsonwebtoken';
const checkToken = roleArray => {
  // console.log(roleArray);
  return (req, res, next) => {
    // console.log(req.headers.authorization);
    const bToken = req.headers.authorization;
    if (!bToken) {
      return res.status(403).json({ error: 'you are not authorized 1' });
    }
    const splitToken = bToken.split(' ');
    const token = splitToken[1];
    // console.log(token);
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      if (!roleArray.includes(decoded.role)) {
        return res.status(403).json({ error: 'you are not authorized 2' });
      }
    } catch (e) {
      return res
        .status(403)
        .json({ error: 'You are not authorized', message: e });
    }
    next();
  };
};

export default checkToken;
