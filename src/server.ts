import fastify from "fastify";
import fastifyCors from "@fastify/cors";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("Server is running on port 3333");
  });
