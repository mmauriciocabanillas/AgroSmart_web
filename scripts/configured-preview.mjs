// Solo usado por pruebas. Nunca se guarda como destino real de la aplicación.
process.env.VITE_APP_URL = "https://example.com/agrosmart-app";
const { createServer } = await import("vite");
const server = await createServer({
  server: { host: "127.0.0.1", port: 5174, strictPort: true },
});
await server.listen();
server.printUrls();
