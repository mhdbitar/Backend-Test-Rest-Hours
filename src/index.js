const express = require("express");
const cors = require("cors");

const openRestaurants = require("./openRestaurants");

const app = express();

// Solve CORS ORIGIN problem
app.use(cors());

app.use(express.json());

// console.log(restaurants)
app.get('/restaurants', async (req, res) => {
  const fileName = req.body.file
  const date = req.body.date;
  try {
    await openRestaurants.findOpenRestaurants(`./src/${fileName}`, new Date(date)).then((data) => {
      if (data) {
        res.send({ success: true, data: Array.from(data), error: '' })
      } else {
        res.status(400).send({ success: false, data: null, error: "Something wrong was happend" });    
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, data: null, error });
  }
})

// new Date(year, month, day, hours, minutes, seconds, milliseconds)
const PORT = 3000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
