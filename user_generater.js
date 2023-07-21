const appendFileSync = require('fs').appendFileSync;
const faker = require('faker');

class UserList {
    constructor(id = "", name = "")
    {
        this.name = name;
        this.id = id;
    }
    saveAsCSV() {
        const csv = `${this.id},${this.name}\n`;
        try {
            appendFileSync("./user_list.csv", csv);
        } catch (err) {
            console.error(err);
        }
    }
}

const startApp = () => {
    for (let i = 0; i < 1000000; i++) {
        const username = faker.internet.userName();
        const id = faker.datatype.number({ min: 1000000, max: 1000000000});
        const random_user = new UserList(id, username);
        random_user.saveAsCSV();
      }
}

startApp();