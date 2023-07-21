const pgp = require('pg-promise')({
    /* initialization options */
    capSQL: true // capitalize all generated SQL
});

const client =
    {
        user: "postgres",
        password: "123456",
        host: "localhost",
        port: 5432,
        database: "test",
    }

const db = pgp(client);

const names = [];
const ids = [];
for (let i = 0; i < 100; i++) {
  const username = faker.internet.userName();
  const id = faker.datatype.number({ min: 1000000, max: 1000000000});
  names.push(username);
  ids.push(id);
}

// Combine the two arrays into an array of objects
let data = ids.map((id, index) => {
    return {
        id: id,
        name: names[index]
    };
});

const cs = new pgp.helpers.ColumnSet(['id', 'name'], {table: 'user_list'});
const insert = pgp.helpers.insert(data, cs);

db.none(insert)
    .then(data => {
        console.log("Data inserted successfully");
    })
    .catch(error => {
        console.log("ERROR:", error);
    });
