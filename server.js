const app = require("./app");
// require("./database/database")
require("dotenv").config();
require("./utils/load.events/load.process.events")(app);

app.listen(process.env.PORT || "9090", () => {
  console.log(`Application is running on port ${process.env.PORT || "9090"}`);
});



