const Pool=require('pg').Pool;

const pool=new Pool({
    user: "vpyuecat",
    password: "ErSC_5fWREySpzyQ-TJ4Y3z0MSIqEY3a",
    database: "vpyuecat",
    host: "suleiman.db.elephantsql.com",
    port: 5432
});

module.exports=pool;

