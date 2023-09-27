const App = require("./app");

const PORT = process.env.PORT;

App.listen(PORT, () => {
  console.log(`the server is running at port is ${PORT}`);
});
