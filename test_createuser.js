/* Run a database command */

import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string
const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function run() {
  try {
    // Get the "sample_mflix" database
    const db = client.db("mydb");

    // Find and print the storage statistics for the "sample_mflix" database using the 'dbStats' command
    const result = await db.command({
      createUser: 'test',
      pwd: '1234',
      roles: [{role: 'readWrite', db: 'mydb'}],
    });
    console.log(result);
  } finally {
    // Close the database connection on completion or error
    await client.close();
  }
}
run().catch(console.dir);
