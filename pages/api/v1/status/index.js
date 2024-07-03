import database from "infra/database.js";

async function status(req, res) {
  const updateAt = new Date().toISOString();
  const dbVersionResult = await database.query("SHOW server_version;");
  const dbVersion = dbVersionResult.rows[0].server_version;

  const dbMaxConnectionsResult = await database.query("SHOW max_connections;");
  const dbMaxConnections = dbMaxConnectionsResult.rows[0].max_connections;

  const dbName = process.env.POSTGRES_DB;
  const dbOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName],
  });
  console.log(dbOpenedConnectionsResult);
  const dbOpenedConnections = dbOpenedConnectionsResult.rows[0].count;

  res.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: dbVersion,
        max_connections: parseInt(dbMaxConnections),
        opened_connections: dbOpenedConnections,
      },
    },
  });
}

export default status;
