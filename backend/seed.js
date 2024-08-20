/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();
const fs = require("fs");
const csv = require("csv-parser");
const { v4: uuidv4 } = require("uuid");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)
    // await database.query("truncate borne");

    // Insert fake data into the 'item' table

    fs.createReadStream("./database/bornes.csv")
      .pipe(csv({ separator: "," }))
      .on("data", (data) => {
        const line = data;

        if (data.n_enseigne === "") {
          line.n_enseigne = "non renseigné";
        }

        if (data.n_station === "") line.n_station = "non renseigné";

        if (data.ad_station === "") line.ad_station = "non renseigné";

        if (data.code_insee === "") line.code_insee = "non renseigné";

        if (data.xlongitude === "") line.xlongitude = 0.1;

        if (data.ylatitude === "") line.ylatitude = 0.1;

        if (data.puiss_max === "") line.puiss_max = "non renseigné";

        if (data.type_prise === "") line.type_prise = "non renseigné";

        if (data.accessibilite === "") line.accessibilite = "non renseigné";

        queries.push(
          database.query(
            `INSERT INTO borne (id, n_station, ad_station, code_postal, lng, lat, puiss_max,
                                            accessibilite, type_prise, n_enseigne,
                                            date_maj)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              uuidv4(),
              line.n_station,
              line.ad_station,
              line.code_insee,
              line.xlongitude,
              line.ylatitude,
              line.puiss_max,
              line.accessibilite,
              line.type_prise,
              line.n_enseigne,
              line.date_maj,
            ]
          )
        );
      });
    /* ************************************************************************* */


    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    setTimeout(() => {
      database.end();
      console.info(`${database.databaseName} filled from ${__filename} 🌱`);
    }, 10000);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
