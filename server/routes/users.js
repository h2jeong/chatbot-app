const express = require("express");
const router = express.Router();
const { User } = require("../models/Users");
const { auth } = require("../middleware/auth");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  // console.log(req.body, user);
  user.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ success: false, err });
    if (!user) {
      return res.json({
        success: false,
        err: "User by this email does not exist"
      });
    }
    console.log("login:", req.body, ",user:", user);
    // 비밀번호 복호화 해서 비교하기.
    user.comparePassword(req.body.password, (err, result) => {
      if (err) return res.json({ success: false, err });
      console.log("result:", result);
      if (!result) {
        return res.json({ success: false, err: "Wrong Password" });
      }
      // 비밀번호 맞다면 토큰 생성하여 db에 저장시키고 유저정보 받아서 쿠키에도 저장해서 보내기
      user.generateToken((err, user) => {
        if (err) return res.status(400).json({ success: false, err });
        console.log("generate:", user);
        res
          .cookie("w_auth", user.token, {
            maxAge: 900000,
            httpOnly: true
          })
          .status(200)
          .json({ success: true });
      });
    });
  });
});

router.post("/logout", auth, (req, res) => {
  // 로그인 상태를 유지, 종료 시켜줄 미들웨어 생성 - 토큰으로 인증처리
  // authentication 성공시 인증처리한 결과가 저장된 유저 정보를 받아
  // 그 정보로 유저 찾고 db에서 토큰 = '' 만들고 성공 응답 주기
  User.findByIdAndUpdate({ _id: req.user._id }, { token: "" }).exec(
    (err, user) => {
      if (err) return res.status(400).json({ success: false, err });
      console.log("logout;", user);
      return res
        .clearCookie("w_auth")
        .status(200)
        .json({ success: true });
    }
  );
});

router.get("/auth", auth, (req, res) => {
  console.log("auth:", req.body, req.user, req.token);
  // req에 보내고 온거 확인 후 res에 담을 정보 처리
  return res.status(200).json({
    user: req.user,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true
  });
});

module.exports = router;
