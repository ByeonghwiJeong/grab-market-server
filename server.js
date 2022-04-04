const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const res = require("express/lib/response");
const port = 8080;

app.use(express.json());
// express에서 json형식의 데이터를 처리해줌
app.use(cors());
// 모든 브러우져에서 요청가능하게함

app.get("/products", (req, res) => {
  models.Product.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "name", "price", "seller"],
  })
    .then((result) => {
      console.log("PRODUCTS : ", result);
      res.send({
        products: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("에러발생");
    });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, description, price, seller } = body;
  //======방어 코드 colunm값 하나라도 빠졌을때=======
  if (!name || !description || !price || !seller) {
    res.send("모든 필드를 입력해주세요!!");
  }
  models.Product.create({
    name,
    description,
    price,
    seller,
  })
    .then((result) => {
      console.log("상품 생성 결과 : ", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품 업로드에 문제가 발생했습니다.");
    });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Product.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("PRODUCT : ", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품조회에 에러 발생");
    });
});

app.listen(port, () => {
  console.log("그랩의 쇼핑몰 서버가 돌아 가고 있습니다.");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공!!!");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB연결 실패");
      process.exit();
    });
});
