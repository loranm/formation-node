const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const config = require("config");

require("./db/mongoose")();
require("./startup/routes")(app);

app.listen(PORT, () => {
  console.log(`${config.get("name")} started at PORT:${PORT}`);
});
