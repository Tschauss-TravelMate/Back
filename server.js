const express = require("express"); // npm i express | yarn add express
const cors = require("cors"); // npm i cors | yarn add cors
const mysql = require("mysql"); // npm i mysql | yarn add mysql
const app = express();
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
app.use(express.urlencoded({ extended: true }));

// 서버 연결 시 발생
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// get 요청 시 응답
app.get("/api/Home_get", (req, res) => {
  const sqlSelect = "SELECT * FROM Home;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
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
