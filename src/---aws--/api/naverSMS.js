// featured link
// https://jae04099.tistory.com/entry/Nodejs-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%AC%B8%EC%9E%90-%EC%A0%84%EC%86%A1-API-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0feat-axios

function send_message(contect, contents) {
	// 차후 파라미터 안에 phone, nickname 넣어 보내는사람 핸드폰번호 받기
    // 예약자 번호, 닉네임, 코인이름
    const user_phone_number = contect;
    const user_nickname = "devitter_test";
    const user_contents = contents;
    
    // 모듈들을 불러오기. 오류 코드는 맨 마지막에 삽입 예정
    const finErrCode = 404;
    const axios = require('axios');
    const CryptoJS = require('crypto-js');
    const date = Date.now().toString();
    
    // const serviceId = process.env.SENS_SERVICE_ID; 
    // const secretKey = process.env.SENS_SECRET_KEY;
    // const accessKey = process.env.SENS_ACCESS_KEY;
    // const my_number = process.env.SENS_MYNUM;

    const uri = 'ncp:sms:kr:271744342579:devitter'; 
    const secretKey = 'FlMVF1EtSTpkOU5V3rVmCeWX4xgZoiLCuSoBOvKQ';
    const accessKey = 'VDN6elgezlJfBu3vIJhc';
    const my_number = '01097221183';
    
    // 그 외 url 관련
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    let url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
	
    // crypto-js를 이용한 주요 키 암호화
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    axios({
        method: method,
        // request는 uri였지만 axios는 url이다
        url: url,
        withCredentials: false,
        headers: {
            "Access-Control-Allow-Headers": "Content-type",
            "Content-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        // request는 body였지만 axios는 data다
        data: {
            type: "SMS",
            countryCode: "82",
            from: user_phone_number,
            // 원하는 메세지 내용
            content: `from - ${user_nickname}
                    contents - ${user_contents}`,
            messages: [
            // 신청자의 전화번호
                { to: `${my_number}`, },],
        },
    }).then(res => {
        console.log(res.data);
    })
        .catch(err => {
            console.log(err);
        })
    return finErrCode;
}

module.exports = send_message;