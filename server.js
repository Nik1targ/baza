const express = require("express");
const sql = require("mssql/msnodesqlv8");
const path = require("path");


app.listen(3000, () => {
    console.log("Server started on port 3000!, http://localhost:3000");
});

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


const dbConfig = {
    connectionString:
      "Driver={SQL Server};Server=A102PCPREPOD\\A102PCPREPOD;Database=students-Marina;Trusted_Connection=Yes;",
    driver: "msnodesqlv8"
  };


app.get("TESTBOBR", async (req,res) => {
    const connection = await sql.connection(dbConfig);

    const result = await connection.request().query("select *from dbo.TESTBOBR");

    res.json(result.recordset);
});


app.post("/students", async (req,res) => {
    const { name, lastname, birthday, group_id} = req.body;
    const connection = await sql.connect(dbConfig);

    await connection
    .request()
    .input("name", sql.VarChar, name)
    .input("lastname", sql.VarChar, lastname)
    .input("birthday", sql.date, birthday)
    .input("group_id", sql.int, group_id).query(`INSERT INTO dbo.TESTBOBR(name,lastname,birthday,group_id) 
    VALUES (@name, @lastname, @birthday, @group_id)`)

    res.send("OK");
});