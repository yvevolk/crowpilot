const app = require('./app.js');
const { PORT = 9090 } = process.env.PORT || 9090;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));