const app = require("./app");
const fs = require("fs");
const clc = require("cli-color");
const { log } = require("console");

require("./utils/load.events/load.process.events")(app);

function getFiles(controllers) {
  // show all controllers
  fs.readdir(`${process.cwd()}/${controllers}`, (_err, files) => {
    if (_err) {
      return _err;
    }

    log(clc.cyan("================= ", controllers, " ================="));
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let eventName = file.split(".")[0];
      log(clc.magentaBright(eventName));
    });
  });
}

getFiles("controllers");
getFiles("routes");
getFiles("models");
getFiles("database");

log(clc.cyan("================= Server Port ================="));

app.listen(process.env.PORT || "9090", () => {
  console.log(`Application is running on port ${process.env.PORT || "9090"}`);
});
