// authService.ts

/*import bcrypt from 'bcrypt';
import Person from '../model/person';
import db from '../integration/DAO';

interface LoginCredentials {
  username: string;
  password: string;
}

class AuthService {
  public static async login({ username, password }: LoginCredentials): Promise<Person | null> {
    try {
      const user = await Person.findOne({ where: { username } });
      if (!user) {
        return null; // User not found
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null; // Invalid password
      }

      return user; // Login successful
    } catch (error) {
      throw new Error('Login failed');
    }
  }
}

export default AuthService;*/


// authService.ts

import Person from '../model/person';

interface LoginCredentials {
  username: string;
  password: string;
}

class AuthService {
  public static async login({ username, password }: LoginCredentials): Promise<Person | null> {
    try {
      const user = await Person.findOne({ where: { username } });
      if (!user) {
        return null; // User not found
      }

      // Compare plain text passwords directly
      if (user.password !== password) {
        return null; // Incorrect password
      }

      return user; // Login successful
    } catch (error) {
      throw new Error('Login failed');
    }
  }
}

export default AuthService;

