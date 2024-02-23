import db from '../integration/dbConfig';
import bcrypt from 'bcrypt';

async function hashExistingPasswords() {
  try {
    await db.authenticate();
    console.log("Database connection successful.");

    // Use a raw SQL query to find all users with non-null passwords
    const [results, metadata] = await db.query('SELECT * FROM "person" WHERE "password" IS NOT NULL AND "email" IS NULL');

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
