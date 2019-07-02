const fs = require("fs");
const csv = require("fast-csv");

// Read CSV file and return an array
module.exports.readCSVFile = (filePath) => {
    return new Promise((resolve, reject) => {
        let output = [];
        var fh = fs.createReadStream(filePath);

        fh.pipe(csv.parse({ headers: false }))
            .on("data", row => {
            output.push(row);
        })
        .on("end", () => {
            resolve(output);
        });
        fh.on("error", reject);
    });
};