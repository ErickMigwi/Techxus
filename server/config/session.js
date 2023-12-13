const session = require('express-session')
const sessionConfig ={
    key: "userId",
    secret: "I'll change this secret key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 24 * 60 * 60 * 1000, // Cookie expiration time (e.g., 24 hours)
    },
  }

module.exports = session(sessionConfig);