import User from "../model/user";
import db from "../integration/dbConfig";
import bcrypt from "bcrypt";

async function hashExistingPasswords() {
  try {
    await db.authenticate();
    console.log("Database connection successful.");

    const users = await User.findAll();

    console.log(users);

    // for (const user of users) {
    //   const hashedPassword = await bcrypt.hash(user.password, 10);
    //   await user.update({ password: hashedPassword });
    // }

    console.log("Passwords hashed successfully.");
  } catch (error) {
    console.error("Error hashing passwords:", error);
  }
}

hashExistingPasswords();
