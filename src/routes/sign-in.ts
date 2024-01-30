import { FastifyInstance } from "fastify";
import { env } from "../env";
import { generateRandomString } from "../utils/generateRandomString";
import queryString from "node:querystring";

const SPOTIFY_CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;

const REDIRECT_URI = "http://localhost:3333/callback/spotify";
const SCOPE = "user-read-private user-read-email";
const STATE = generateRandomString(16);
export async function signInRoute(app: FastifyInstance) {
  app.post("/signin", (req, res) => {
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        queryString.stringify({
          response_type: "code",
          client_id: SPOTIFY_CLIENT_ID,
          scope: SCOPE,
          redirect_uri: REDIRECT_URI,
          state: STATE,
        })
    );
  });
}
