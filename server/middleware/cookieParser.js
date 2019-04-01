// write a middleware function that will access the cookies on an incoming request, parse them into an object, and assign 
// this object to a cookies property on the request.

const parseCookies = (req, res, next) => {
    // parse the cookie strings
    // first by ; , then by =
    var cookies = {};
    if (req.headers.cookie) {
      var cookieStrings = req.headers.cookie.split('; ');
      for (let i = 0; i < cookieStrings.length; i++) {
        var splitCookie = cookieStrings[i].split('=');
        cookies[splitCookie[0]] = splitCookie[1];
      }
    }
    req.cookies = cookies;
    next();
};

module.exports = parseCookies;