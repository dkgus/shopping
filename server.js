const express = require("express");
const app = express();
const port = 3030;
const methodOverride = require("method-override");
const User = require("./models/User"); 
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

app.get("/", (req,res)=> res.send('hello world! 안녕하세요!'));

app.post("/register",(req,res)=>{
    //회원가입 할 때 필요한 정보들을 client에서 가져오면
    //그것을 데이터 베이스에 넣어준다.

    const user = new User(req.body)
    //이 req.body안에는 사용자가 입력한 아이디 및 비밀번호와 같은 정보들이 들어있음

    user.save((err, userInfo) => {
        if(err) return res.json({success :false, err})//성공하지못했음을 json형태로 전달하고 err도 같이 전달
        return res.status(200).json({
            success :true
        })
    });
})


app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



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