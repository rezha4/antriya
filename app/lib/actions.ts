"use server";

import { sql } from "@vercel/postgres";
import { db } from "@vercel/postgres";
import bcrypt from "bcrypt";

export async function signup(data: any) {
  const { username, password } = data;
  const hashedPassword = await bcrypt.hash(password, 4);

  try {
    const client = await db.connect();
    const result = await client.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2)",
      [username, hashedPassword]
    );
    client.release();
    return result.rowCount > 0;
  } catch (error) {
    console.error(error);
  }
}

export async function login(data: any) {
  const { username, password } = data;
  try {
    const client = await db.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password_hash);

    console.log(match);
  } catch (error) {
    console.error(error);
  }
}