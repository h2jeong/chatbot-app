const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./server/config/keys");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
// server for chat
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { Chat } = require("./server/models/Chat");

const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api/users", require("./server/routes/users"));
app.use("/api/dialogflow", require("./server/routes/dialogflow"));
app.use("/api/chat", require("./server/routes/chat"));
app.use("/api/video", require("./server/routes/video"));

io.on("connection", socket => {
  socket.on("Input Chat Message", msg => {
    connect.then(db => {
      try {
        let chat = new Chat({
          message: msg.chatMessage,
          sender: msg.userId,
          type: msg.type
        });

        chat.save((err, doc) => {
          if (err) return res.json({ success: false, err });

          Chat.find({ _id: doc._id })
            .populate("sender")
            .exec((err, doc) => {
              return io.emit("Output Chat Message", doc);
            });
        });
      } catch (err) {
        console.log(err);
      }
    });
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
