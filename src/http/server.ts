import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { signInRoute } from "../routes/sign-in";
import { callbackRoute } from "../routes/callback";
import { env } from "../env";
const app = fastify();

const PORT = env.PORT;

app.register(signInRoute);
app.register(callbackRoute);

app.register(fastifyCors, {
  origin: "*",
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
