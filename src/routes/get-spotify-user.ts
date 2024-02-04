import { FastifyInstance } from "fastify";
import axios from "axios";
export async function getSpotifyUser(app: FastifyInstance) {
  app.get("/user", async (req, res) => {
    try {
      // Obtenha o token de acesso do cabeçalho da solicitação
      const accessToken = req.headers.authorization!.split(" ")[1];

      // Faça uma solicitação à API do Spotify para obter informações do usuário usando o accessToken
      const userResponse = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = userResponse.data;
      res.send(userData);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erro ao obter informações do usuário" });
    }
  });
}
