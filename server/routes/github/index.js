const express = require("express")
const githubRouter = express.Router()
const githubTeamRouter = require("./team")

githubRouter.use("/team", githubTeamRouter)

module.exports = githubRouter
