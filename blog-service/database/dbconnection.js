var mysql = require('mysql');
const DB_HOST = process.env.DB_HOST 
const DB_USER = process.env.DB_USER 
const DB_PASSWORD = process.env.DB_PASSWORD 
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

var con = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
});

con.connect(function (err) {
    if (err) throw err;
    //log.debug("Connected!");
});

const query = (q, data) => {
    return new Promise((resolve, reject) => {
        con.query(q, data, (err, res) => {
            err ? reject(err) : resolve(res)
        })
    })
}

const beginTransaction = () => {
    return new Promise((resolve, reject) => {
        con.beginTransaction((err) => {
            err ? reject(err) : resolve()
        })
    })
}

const commit = () => {
    return new Promise((resolve, reject) => {
        con.commit((err) => {
            err ? reject(err) : resolve()
        })
    })
}

const rollback = () => {
    return new Promise((resolve, reject) => {
        con.rollback(() => {
            resolve()
        })
    })
}

module.exports = {
    query,
    beginTransaction,
    commit,
    rollback
};