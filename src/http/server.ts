import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { signInRoute } from "../routes/sign-in";
import { callbackRoute } from "../routes/callback";
import { env } from "../env";
import { getSpotifyUser } from "../routes/get-spotify-user";
const app = fastify();

const PORT = env.PORT;

app.register(signInRoute);
app.register(callbackRoute);
app.register(getSpotifyUser);

const allowedOrigins = ["http://localhost:3000"];

app.register(fastifyCors, {
  origin: (origin, cb) => {
    // Verifica se a origem está na lista de origens permitidas
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"), false);
    }
  },
  allowedHeaders: "Content-Type, Authorization",
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app
  .listen({
    port: Number(PORT),
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("Server is running on port 3333");
  });
