import { serialize } from "cookie";

const TOKEN_NAME = "api_token";
const MAX_AGE = 60 * 60 * 8;

function createCookie(name, data, options = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
    sameSite: "None Secure",
    ...options,
  });
}

function setTokenCookie(res, token) {
  res.setHeader("Set-Cookie", [
    createCookie(TOKEN_NAME, token),
    createCookie("authed", true, { httpOnly: false }),
  ])
/*   res.setHeader('Access-Control-Expose-Headers', 'true');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/"); */
}

function removeCookie(res, token) {
  res.removeHeader("Set-Cookie");
}

function getAuthToken(cookies) {
  return cookies[TOKEN_NAME];
}

export { setTokenCookie, getAuthToken, removeCookie };


/* 
  "Access-Control-Allow-Origin", "https://ksav5iu2.api.sanity.io/v2022-02-21/", "http://localhost:3000")
  res.setHeader("Access-Control-Allow-Methods: GET, PUT, DELETE, HEAD, OPTIONS");
/*   res.setHeader("Access-Control-Allow-Origin", "https://ksav5iu2.api.sanity.io/v2022-02-21/");
  res.header(
    "Access-Control-Allow-Headers",
	"Access-Control-Allow-Origin", "https://ksav5iu2.api.sanity.io/v2022-02-21/",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); */

