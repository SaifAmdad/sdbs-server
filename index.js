const app = require("./src/app");
const { port } = require("./src/secrets");

app.listen(port, async (req, res) => {
  console.log(`Server is runnit at http://localhost:${port}`);
});
