const Client = require('pg').Client;
const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>
{
    // Query requests
    console.log(req.query.name)
    res.send('User List')
})

router.get('/new', (req, res) =>
{
    // Render the new.ejs which can take input
    res.render("new")
})

router.post('/', (req, res) =>
{
    const isValid = true
    if ( isValid )
    {
        users.push({ name: req.body.username })

        const client = new Client
        (
            {
                user: "postgres",
                password: "123456",
                host: "localhost",
                port: 5432,
                database: "players",
            }
        )
        const searched_name = req.body.username;
        console.log(searched_name);
        client.connect()
        .then(() => console.log("Connected successfully!"))
        .then(() => client.query("CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;"))
        .catch(err => console.log(err))
        .then(() => client.query("SELECT * FROM user_list WHERE LEVENSHTEIN(name, $1) <= 2.5", [searched_name]))
        .then(results => logger(req, res, results))
        .catch(err => console.log(err))
        .finally(() => client.end())
    }
    else
    {
        res.render("users/new", { name: req.body.username })
    }
})
function logger(req, res, search_results) 
{
    console.table(search_results.rows) 
    res.render('search_result', { results: search_results.rows })
}
// Creating a dynamic route
router
    .route('/:id')
    .get((req, res) => 
    {
        // Can take the user from router.param
        console.log(req.user)
        res.send('Your ID: ' + req.params.id + " Your Name: " + req.user.firstName)
    })
    // Update user with specific id
    .put((req, res) => 
    {
        res.send('Update User with ID: ' + req.params.id)
    })
    // Delete user with specific id
    .delete((req, res) =>
    {
        res.send('Get User with ID: ' + req.params.id)
    })

const users = [{ name: "Mahmut" }, { name: "Eyceykey" }]
// When a parameter with a name id is specified
router.param('id', (req, res, next, id) => 
{
    req.user = users[id]
    next()
})

module.exports = router