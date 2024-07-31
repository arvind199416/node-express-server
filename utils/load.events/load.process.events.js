const fs = require("fs");
module.exports = () => {
  try {
    fs.readdir(`${process.cwd()}/process.events`, (_err, files) => {
      if (_err) {
        return _err;
      }
      console.log('====================================');
      console.log(files);
      console.log('====================================');
      files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`${process.cwd()}/process.events/${file}`);
        console.log('====================================');
        console.log(event);
        console.log('====================================');
        let eventName = file.split(".")[0];

        process.on(eventName, event.bind());
        delete require.cache[
          require.resolve(`${process.cwd()}/process.events/${file}`)
        ];
      });
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};
