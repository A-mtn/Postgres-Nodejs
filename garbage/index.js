const Client = require('pg').Client;

const client = new Client
(
    {
        user: "postgres",
        password: "123456",
        host: "localhost",
        port: 5432,
        database: "test",
    }
)

client.connect()
.then(() => console.log("Connected successfully!"))
//.then(() => client.query("INSERT INTO user_list (id, name) VALUES ($1, $2)", [userID, username]))
.catch(err => console.log(err))
.then(() => client.query("SELECT * FROM user_list"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())
