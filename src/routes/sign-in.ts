import { FastifyInstance } from "fastify";
import { env } from "../env";
import { generateRandomString } from "../utils/generateRandomString";
import queryString from "querystring";

const SPOTIFY_CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3333/callback/spotify";
const SCOPE = "user-read-private user-read-email";
const STATE = generateRandomString(16);

export async function signInRoute(app: FastifyInstance) {
  app.get("/signin", async (req, res) => {
    const spotifyAuthUrl = "https://accounts.spotify.com/authorize";

    const queryParams = queryString.stringify({
      response_type: "code",
      client_id: SPOTIFY_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: "user-read-private user-read-email",
    });

    const authUrl = `${spotifyAuthUrl}?${queryParams}`;
    res.redirect(authUrl);
  });
}
