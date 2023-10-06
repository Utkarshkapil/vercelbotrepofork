// api/login.js
// import { verifyPassword, createToken } from '../../lib/auth';
// import db from '../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log("request callledddd for login",JSON.stringify(req.body));
    // const { email, password } = req.body;
    
    try {
      // Retrieve the user from the database by email
      // const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

      // if (!user || !(await verifyPassword(password, user.password_hash))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      // }

      // Create and send a JWT token
      // const token = createToken(user.id);
      // res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Login failed' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
