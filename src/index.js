const express = require("express");

const app = express();

const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
