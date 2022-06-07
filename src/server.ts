import App from "./app";
import UrlController from "./controllers/UrlController";

const app = new App([new UrlController()]);
const PORT: Number = parseInt(process.env.PORT!) || 3000;

app.startListening(PORT);
