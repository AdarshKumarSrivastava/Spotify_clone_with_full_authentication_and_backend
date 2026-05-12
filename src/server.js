require('dotenv').config();
const app = require(`./app.js`);
const dbConnect = require('../db/db.js');


dbConnect();




app.listen(3000, () => {
    console.log(`server is running on port 3000`);
})        