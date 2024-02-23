import db from "../integration/dbConfig";
import bcrypt from "bcrypt";
/**
 * Asynchronously hashes existing plaintext passwords for users in the database.
 * This function first establishes a database connection and then retrieves all users
 * who have a non-null password but a null email. For each of these users, it hashes
 * their password using bcrypt with a salt round of 10, and updates the database
 * with the hashed password. The process is logged to the console, including the
 * number of users found and a message upon successful completion of hashing.
 * If no users are found or if an error occurs, an appropriate message is logged.
 *
 * Note: The actual password hashing and updating logic is commented out. To
 * complete the functionality, uncomment the for-loop that hashes each user's password
 * and updates the database.
 *
 * @async
 * @function hashExistingPasswords
 * @returns {Promise<void>} A promise that resolves when the operation is complete,
 * indicating successful hashing of passwords or logging an error if the operation fails.
 */

async function hashExistingPasswords() {
  try {
    await db.authenticate();
    console.log("Database connection successful.");

    const [results, metadata] = await db.query(
      'SELECT * FROM "person" WHERE "password" IS NOT NULL AND "email" IS NULL'
    );

    if (results.length === 0) {
      console.log("No users found with non-null password and null email.");
      return;
    }

    console.log(`Found ${results.length} users. Hashing passwords...`);
    console.log(results);

    // results will contain the rows returned by the query
    // for (const user of results) {
    //   const hashedPassword = await bcrypt.hash(user.password, 10);
    //   await db.query('UPDATE "person" SET "password" = :hashedPassword WHERE "person_id" = :id', {
    //     replacements: { hashedPassword, id: user.person_id }
    //   });
    // }

    console.log("Passwords hashed successfully.");
  } catch (error) {
    console.error("Error hashing passwords:", error);
  }
}
