var config = require("./dbConfig");
const sql = require("mssql/msnodesqlv8");

async function getBills(createTableQuery,name) {
  try {
    console.log('sql server config',config)
    let pool = await sql.connect(config);
    let bills = await pool.request().query(createTableQuery);
    return `Query Executed for table ${name}`
  } catch (error) {
    return `query X not `+'\n'+error
  }
}
//"Server=" + SelServerName + ";Database=" + SelDbName + ";User Id=" + ServerUserName + ";Password=" + ServerPassword + ";Encrypt=False;"
async function dataCreation(createTableQuery) {
  try {
    let pool = await sql.connect(config);
    let bills = await pool.request().query(createTableQuery);
    // console.log('data',bills.recordsets);
    return bills.recordset
  } catch (error) {
    // console.log(`query not for table ${req.body.name}`+'\n'+error);
    return error;
  }
}

module.exports = {
  getBills: getBills,
  dataCreation: dataCreation,
};
