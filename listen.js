const app = require('./app.js');
const port = process.env.PORT || 9090;

app.listen(port, () => console.log(`Listening on ${PORT}...`));