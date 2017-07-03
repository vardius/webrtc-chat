import express from "express";
import fspath from "path";
import cookieParser from "cookie-parser";
import http from "http";
import PeerDataServer from "peer-data-server";

const port = process.env.PORT || 3000;
const index = fspath.join(__dirname, "index.html");

const app = express();
app.use("/css", express.static(fspath.join(__dirname, "css")));
app.use("/fonts", express.static(fspath.join(__dirname, "fonts")));
app.use("/images", express.static(fspath.join(__dirname, "images")));
app.use("/js", express.static(fspath.join(__dirname, "js")));
app.use(cookieParser());
app.get("/favicon.ico", (req, res) => res.sendStatus(404));
app.get("*", (req, res) => res.sendFile(index));

const server = http.createServer(app);
PeerDataServer(server);

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Server started at port ${port}`));
