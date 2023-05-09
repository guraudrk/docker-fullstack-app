const mysql = require("mysql");


//데이터를 만든다.

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'johnahn',
    database: 'myapp'
});


//pool을 내보낸다.
exports.pool = pool;