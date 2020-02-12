const config = require("./config");
const app = require("./app");

require("./db");
require("./redis");

app.listen(config.port, () =>
  console.info(`Server is running at port ${config.port}`)
);
