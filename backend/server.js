//시작점이 되는 server.js이다.

//먼저 package.json에서 정의했던 모듈들을 가져온다.

const express = require("express");
const bodyparser = require("body-parser");


//디비를 불러준다.
const db = require('./db');


//express 서버를 생성한다.

const app = express();

//json  형태로 오는 요청의 본문을 해석해줄 수 있게 등록.

app.use(bodyparser.json());


//테이블 생성하기
//이름은 list이다.


//list를 만든다.
//db.pool.query(`CREATE TABLE lists (
//    id INTEGER AUTO_INCREMENT,
//    value Text,
//    PRIMARY KEY (id)
//)`,(err,results,fields)=>{
//    console.log('results',results)
//})


//디비에 있는 모든 데이터를 프론트 서버에 보내주기.

app.get('api/values',function(req,res){
    //데이터베이스에서 모든 정보 가져오기

    //이 때, 쿼리문을 작성한다.
db.pool.query('SELECT * FROM lists;',
(err,results,fields)=>{
    
    //에러가 났을 때
    if(err)
    return res.status(500).send(err)
    //성공적으로 완료되었을 때
    else
    return res.json(results)
})
})


//클라이언트에서 입력한 값을 데이터베이스에 넣어 주기

app.post('/api/value',function (req,res,next){
    //데이터 베이스에 값 넣어주기
    //이렇게 넣은 값은 bodyparser를 통해 다시 가져온다.
    db.pool.query('INSERT INTO lists (value) VALUES("${req.body.vaule}")'),
    (err,results,fields)=>{
        if(err)
        return res.status(500).send(err)
        else
        return res.json({success: true, value :req.body.value})
    }
})



//서버를 실행 시켜 줄 수 있는 코드이다.
app.listen(5000, ()=>{
    console.log('이장한은 부자입니다.');

})