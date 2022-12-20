import express from "express";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();
dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send(
    `<h1 style="color: #8B9D77; text-align: center">Welcome to Mural Backend !<h1>`
  );
});

app.post("/generate", async (req, res) => {
  try {
    const keyword = req.body;
    console.log("key : ", keyword.keyword);
    const response = await openai.createImage({
      prompt: keyword.keyword,
      n: 2,
      size: "512x512",
    });

    const imageUrl = response.data.data[0].url;
    console.log("response : ", response);
    console.log("imageUrl : ", imageUrl);
    res.send(`<img src=${imageUrl} alt="image" />`);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      res.send(`error occured ${error.response.data.error.message}`);
    } else {
      console.log(error.message);
    }
  }
});

app.listen(PORT, () => {
  console.log(`App is running on PORT : ${PORT}`);
});
