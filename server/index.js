const express = require("express")
const next = require("next")
const backendRouter = require("./routes/index.js")
const path = require("path")
/* It's loading the .env file and making the variables available to the rest of the application. */
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") })
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.use("/api", backendRouter)

    server.get("*", (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(`Server is ready on http://localhost:${PORT}`)
    })
  })
  .catch((exception) => {
    console.error(exception.stack)
    process.exit(1)
  })
