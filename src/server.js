const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Screenly app listening on port ${port}`);
})