import * as express from "express";
import * as path from "path";
import indexRouter from "./routes";
import { configurePassport } from "./middlewares/passport";

const app = express();

configurePassport(app);

app.use(express.json());
app.use(express.static("public"));
app.use(indexRouter);

app.use(["/api/*", "/auth/*"], (req, res) => res.status(404).json({ message: `U sorry motherfucker, ${req.method} to ${req.originalUrl} not supported. Dolt.` }));

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
