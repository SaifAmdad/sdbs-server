const app = require("./src/app");
const connectDB = require("./src/DB/connectDB");
const { port } = require("./src/secrets");

app.listen(port, async (req, res) => {
  await connectDB();
  console.log(`Server is runnit at http://localhost:${port}`);
});
