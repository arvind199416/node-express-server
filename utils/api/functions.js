exports.createTable = (schema, tableName, pool) => {
  if (!Object.keys(schema).length) {
    throw new Error("object schemea is missing.");
  }
  if (!tableName) {
    throw new Error("oops! you forget to pass table name.");
  }

  const columnDefinitions = Object.keys(schema)
    .map((key) => `${key} ${userScheme[key].type}`)
    .join(", ");

  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        ${columnDefinitions}
        );
        `;

  pool.query(createTableQuery);
};
