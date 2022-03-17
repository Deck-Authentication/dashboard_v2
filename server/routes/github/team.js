const express = require("express")
const githubTeam = express.Router()

// import all users and teams data from github, then save to Deck's database
githubTeam.put("/imports", async (req, res) => {})

// list all teams under the organization
githubTeam.get("/list-all", async (req, res) => {})

// delete a team & remove all members from it
githubTeam.delete("/delete", async (req, res) => {})

// create a new team
githubTeam.post("/create", async (req, res) => {})

// remove members from a team
githubTeam.delete("/remove-members", async (req, res) => {})

// add members to a team
githubTeam.post("/add-members", async (req, res) => {})

module.exports = githubTeam