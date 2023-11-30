const express = require("express"); // npm i express | yarn add express
const cors = require("cors"); // npm i cors | yarn add cors
const mysql = require("mysql"); // npm i mysql | yarn add mysql
const app = express();
const path = require("path");
const PORT = 3001; // 포트번호 설정

// MySQL 연결
const db = mysql.createPool({
  host: "cloud.swdev.kr", // 호스트
  user: "root", // 데이터베이스 계정
  password: "1234", // 데이터베이스 비밀번호
  database: "test", // 사용할 데이터베이스
  port: 4009, // 포트번호
});

app.use(
  cors({
    origin: "*", // 출처 허용 옵션
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  })
);

// post 요청 시 값을 객체로 바꿔줌
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 서버 연결 시 발생
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "front/dist/")));
app.get("/", function (req, res) {
  응답.sendFile(path.join(__dirname, "front/dist/index.html"));
});

// get 요청 시 응답
app.get("/api/Home_get", (req, res) => {
  const sqlSelect = "SELECT * FROM Home;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const img = req.body.img;

  const sqlInsert = `INSERT INTO post (title, content, img) VALUES ('${title}', '${content}', '${img}')`;

  console.log(sqlInsert);

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send("데이터베이스에 데이터 삽입 중 오류가 발생했습니다");
    }

    console.log("데이터베이스에 데이터가 삽입되었습니다");
    res.status(200).send("데이터베이스에 데이터가 삽입되었습니다");
  });
});

app.get("/api/Planner_get", (req, res) => {
  const sqlSelect = "SELECT * FROM Planner ORDER BY date;"; // 날짜 순으로 정렬
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/City_get", (req, res) => {
  const sqlSelect = "SELECT * FROM City;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/Post_get", (req, res) => {
  const sqlSelect = "SELECT * FROM post;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/Board_get", (req, res) => {
  const sqlSelect = "SELECT * FROM Board;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
    console.log(result);
  });
});
