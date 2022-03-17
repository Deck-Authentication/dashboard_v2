const express = require("express")
const router = express.Router()
const jwt = require("express-jwt")
const jwks = require("jwks-rsa")

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-fh2bo4e4.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:8080",
  issuer: "https://dev-fh2bo4e4.us.auth0.com/",
  algorithms: ["RS256"],
})

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(require("helmet")())

// Secure the backend auth0 API management in production mode
process.env.ENVIRONMENT === "production" ? app.use(jwtCheck) : null

router.get("/test", (_, res) => {
  res.status(200).send("Hi")
})

router.get("/protected", (req, res) => {
  res.status(200).json({ msg: "We made it! And it's great" })
})

module.exports = router
