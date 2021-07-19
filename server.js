const express = require("express");
const app = express();
const port = 3030;
const mongoose = require("mongoose");
const dotenv = require("dotenv");





dotenv.config();
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));



// 페이지 없을때 처리 미들웨어
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url}는 없는 페이지 입니다`);
      error.status = 404;
      next(error);
  });
  
  
  // 오류 처리 미들웨어
  app.use((err, req, res, next) => { 
    res.locals.error = err;
      res.status(err.status || 500).render('error');
  });
  
  
  app.listen(port, () => {
    console.log(`${port}에서 대기중`);
  });