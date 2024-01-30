import { FastifyInstance } from "fastify";
import queryString from "node:querystring";
import { env } from "../env";
const SPOTIFY_CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3333/callback/spotify";

export async function callbackRoute(app: FastifyInstance) {
  app.get("/callback/spotify", (req, res) => {
    const CODE = req.query || null;
    const STATE = req.query || null;

    if (STATE === null) {
      res.redirect(
        "/#" +
          queryString.stringify({
            error: "invalid_state",
            error_description: "The state parameter is missing or invalid.",
          })
      );
    } else {
      let authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: CODE,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer(
              SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
        },
        json: true,
      };
    }
  });
}
