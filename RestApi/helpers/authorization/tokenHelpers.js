const sendJwtToClient = (user, res) => {
  //Generate JWT
  const token = user.generateJwtFromUser();
  const { JWT_COOKIE, NODE_ENV } = process.env;

  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 100 * 60),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      access_token: token,
      name: user.name,
      email: user.email,
      id: user.id,
    });
  //Response
};

const isTokenIncluded = (req) => {
  return req.headers.authorization && req.headers.authorization;
};

const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;
  const access_token = authorization;
  return access_token;
};

module.exports = { sendJwtToClient, isTokenIncluded, getAccessTokenFromHeader };
