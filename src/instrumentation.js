"use server"
import { Pool } from "pg";

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
})

export async function query(q, v = []) {
    return await pool.query(q, v);
}

export async function register() {
    await query(`CREATE TABLE IF NOT EXISTS songs (
                id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                artist BIGINT,
                title VARCHAR,
                description VARCHAR,
                duration SMALLINT,
                last_duration SMALLINT,
                ext VARCHAR,
                timestamp BIGINT
            )`);
    await query(`CREATE TABLE IF NOT EXISTS artists (
                id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR
            )`);
    await query(`CREATE TABLE IF NOT EXISTS settings (
                skey VARCHAR PRIMARY KEY,
                svalue VARCHAR
            )`);
    await defaultSettings();
}

async function defaultSettings() {
    const settings = {
        "background-color": "#0b0a0b",
        "color": "white",
        "navbar-content-font": "poppins",
        "nav-border-color": "#736873",
        "nav-bg-color": "#121315",
        "nav-button-background-color": "#c8c8ff",
        "nav-button-color": "white",
        "nav-button-color-hover": "black",
    }

    const entries = Object.entries(settings);

    const values = entries
        .map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
        .join(", ");

    const params = entries.flat();

    await query(
        `INSERT INTO settings (skey, svalue)
         VALUES ${values}
             ON CONFLICT (skey) DO NOTHING`,
        params
    );
}

export async function songs(artist) {
    const { rows: songs } = await query("SELECT * FROM songs WHERE artist = $1", [artist]);
    return songs;
}

export async function artists() {
    const { rows: artists } = await query("SELECT * FROM uploaders");
    return artists;
}