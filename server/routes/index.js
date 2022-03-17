const express = require("express")
const router = express.Router()
const jwt = require("express-jwt")
const jwks = require("jwks-rsa")
const githubRouter = require("./github")
const memberRouter = require("./member")

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

router.get("/ping", (_, res) => {
  res.status(200).send("The backend is alive")
})

router.get("/github", githubRouter)

router.get("/member", memberRouter)

module.exports = router
