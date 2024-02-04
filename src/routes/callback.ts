import { z } from "zod";
import { FastifyInstance } from "fastify";
import { env } from "../env";
import axios from "axios";

const SPOTIFY_CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3333/callback/spotify";

export async function callbackRoute(app: FastifyInstance) {
  app.get("/callback/spotify", async (req, res) => {
    const codeSchema = z.object({
      code: z.string(),
    });
    const { code } = codeSchema.parse(req.query);

    const tokenUrl = "https://accounts.spotify.com/api/token";
    const authOptions = {
      grant_type: "authorization_code",
      code, // Corrigido aqui para usar a variável correta
      redirect_uri: REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
    };

    try {
      const response = await axios.post(tokenUrl, null, {
        params: authOptions,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token } = response.data;
      res.redirect(`http://localhost:3000/?access_token=${access_token}`);
    } catch (error) {
      console.error(error);
      res.redirect("/error");
    }
  });
}
