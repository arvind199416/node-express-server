module.exports = (err, client, release) => {
  if (err) {
    console.error(err);
    return err;
  }

  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query");
    } else {
      console.log("====================================");
      console.log("Connected to database");
      console.log("====================================");
    }
  });
};
