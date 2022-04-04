const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json());
// express에서 json형식의 데이터를 처리해줌
app.use(cors());
// 모든 브러우져에서 요청가능하게함

app.get("/products", (req, res) => {
  const query = req.query;
  console.log("QUERY : ", query);
  res.send({
    products: [
      {
        id: 1,
        name: "농구공",
        price: 100000,
        seller: "조던",
        imageUrl: "images/products/basketball1.jpeg",
      },
      {
        id: 2,
        name: "축구공",
        price: 50000,
        seller: "메시",
        imageUrl: "images/products/soccerball1.jpg",
      },
      {
        id: 3,
        name: "키보드",
        price: 10000,
        seller: "그랩",
        imageUrl: "images/products/keyboard1.jpg",
      },
    ],
  });
});

app.post("/products", (req, res) => {
  const body = req.body;

  res.send({
    body,
    // "body" : body ES6에서 key와 values가 같다면 body하나만 입력해도 무방함
  });
});

app.get("/products/:id/event/:eventId", (req, res) => {
  const params = req.params;
  const { id, eventId } = params;
  // res.send(`id는 ${params.id}입니다`);
  res.send(`id는 ${id} eventId는 ${eventId}입니다`);
});

app.listen(port, () => {
  console.log("그랩의 쇼핑몰 서버가 돌아 가고 있습니다.");
});
