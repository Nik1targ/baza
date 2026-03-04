const express = require("express");
const sql = require("mssql");

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server started on port 3000!, http://localhost:3000");
});


const dbConfig = {
    server:"A102PCPREPOD\A102PCPREPOD";
    databaes:"TESTBOBR",
    driver:"msnodesqlv8",
    options:{
        trustesConnction:true,
        trustServerCertificate:true,

    },
};

app.get("TESTBOBR", async (req,res) => {
    const connection = await sql.connection(dbConfig);

    const result = await connection.request().query("select *from dbo.TESTBOBR");

    res.json(result.recordset);
});

