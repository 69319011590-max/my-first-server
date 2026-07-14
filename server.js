// ============================================================================
// Forest Theme Web Server
// ผู้จัดทำ : นายฐิติกร ชัยสิงห์
// รหัสนักศึกษา : 69319011590
// วิชา : Web Server
// ============================================================================

// เรียกใช้งานโมดูล HTTP ของ Node.js
const http = require("http");

// กำหนด Port
const port = process.env.PORT || 3000;

// สร้าง Web Server
const server = http.createServer((req, res) => {

    // ส่งสถานะการทำงาน
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });

    // ส่ง HTML กลับไปยัง Browser
    res.end(`
<!DOCTYPE html>
<html lang="th">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Forest Web Server</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{

    font-family:'Segoe UI',sans-serif;

    background-image:
    linear-gradient(rgba(0,40,10,.45),rgba(0,20,0,.70)),
    url("https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920");

    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    background-attachment:fixed;

    display:flex;
    justify-content:center;
    align-items:center;

    width:100%;
    height:100vh;

    overflow:hidden;

}

/* ============================= */

.container{

    width:90%;
    max-width:800px;

    background:rgba(255,255,255,.15);

    backdrop-filter:blur(12px);
    -webkit-backdrop-filter:blur(12px);

    border:2px solid rgba(255,255,255,.25);

    border-radius:30px;

    padding:50px;

    text-align:center;

    color:white;

    box-shadow:0 20px 40px rgba(0,0,0,.45);

    animation:show 1.2s ease;

}

/* ============================= */

@keyframes show{

0%{

opacity:0;
transform:translateY(50px);

}

100%{

opacity:1;
transform:translateY(0);

}

}

/* ============================= */

.logo{

font-size:70px;

margin-bottom:20px;

animation:bounce 3s infinite;

}

@keyframes bounce{

0%{transform:translateY(0);}
50%{transform:translateY(-10px);}
100%{transform:translateY(0);}

}

/* ============================= */

h1{

font-size:42px;

margin-bottom:15px;

text-shadow:3px 3px 10px black;

}

.subtitle{

font-size:24px;

color:#c8ffb0;

margin-bottom:30px;

}

/* ============================= */

.info{

background:rgba(0,0,0,.25);

padding:25px;

border-radius:20px;

margin-top:20px;

line-height:2;

font-size:22px;

}

/* ============================= */

.badge{

display:inline-block;

margin-top:35px;

padding:15px 35px;

background:#2E7D32;

border-radius:50px;

font-size:22px;

font-weight:bold;

box-shadow:0 0 25px #66BB6A;

animation:glow 2s infinite;

}

@keyframes glow{

0%{

box-shadow:0 0 10px #4CAF50;

}

50%{

box-shadow:0 0 35px #81C784;

}

100%{

box-shadow:0 0 10px #4CAF50;

}

}

/* ============================= */

.description{

margin-top:30px;

font-size:20px;

line-height:2;

}

/* ============================= */

.footer{

margin-top:35px;

font-size:16px;

color:#dddddd;

}

/* ============================= */
/* ใบไม้ตก */

.leaf{

position:absolute;

font-size:35px;

top:-80px;

animation:fall linear infinite;

}

.leaf:nth-child(1){

left:5%;

animation-duration:9s;

}

.leaf:nth-child(2){

left:20%;

animation-duration:12s;

}

.leaf:nth-child(3){

left:35%;

animation-duration:10s;

}

.leaf:nth-child(4){

left:50%;

animation-duration:11s;

}

.leaf:nth-child(5){

left:65%;

animation-duration:8s;

}

.leaf:nth-child(6){

left:80%;

animation-duration:13s;

}

.leaf:nth-child(7){

left:93%;

animation-duration:9s;

}

@keyframes fall{

0%{

transform:translateY(-120px) rotate(0deg);

opacity:0;

}

20%{

opacity:1;

}

100%{

transform:translateY(120vh) rotate(360deg);

opacity:0;

}

}

/* ============================= */

button{

margin-top:30px;

padding:15px 35px;

font-size:18px;

border:none;

border-radius:30px;

background:#4CAF50;

color:white;

cursor:pointer;

transition:.3s;

}

button:hover{

background:#66BB6A;

transform:scale(1.08);

}

/* ============================= */

@media(max-width:768px){

.logo{

font-size:55px;

}

h1{

font-size:30px;

}

.subtitle{

font-size:20px;

}

.info{

font-size:18px;

}

.description{

font-size:17px;

}

.container{

padding:30px;

}

button{

width:100%;

}

}

</style>

</head>

<body>

<div class="leaf">🍃</div>
<div class="leaf">🌿</div>
<div class="leaf">🍀</div>
<div class="leaf">🌱</div>
<div class="leaf">🍃</div>
<div class="leaf">🌿</div>
<div class="leaf">🍀</div>

<div class="container">

<div class="logo">
🌲
</div>

<h1>Forest Web Server</h1>

<div class="subtitle">
ยินดีต้อนรับสู่ Web Server
</div>

<div class="info">

<h2>👨‍💻 นายฐิติกร ชัยสิงห์</h2>

<p>
รหัสนักศึกษา : <b>69319011590</b>
</p>

<p>
Web Server ทำงานสำเร็จบน Railway
</p>

<p>
Node.js HTTP Server
</p>

</div>

<div class="badge">
🟢 SERVER ONLINE
</div>

<div class="description">

ยินดีต้อนรับเข้าสู่เว็บไซต์ตัวอย่างที่สร้างขึ้นด้วยภาษา JavaScript
บน Node.js โดยใช้ HTTP Module

เว็บไซต์นี้ออกแบบในธีมป่าไม้ (Forest Theme)
เพื่อสื่อถึงธรรมชาติ ความสดชื่น และความเรียบง่าย
พร้อมเอฟเฟกต์ Glassmorphism และ Animation
ที่ช่วยเพิ่มความสวยงามและความทันสมัย

</div>

<button onclick="showMessage()">
🌳 คลิกเพื่อทักทาย
</button>

<div class="footer">

© 2026 Forest Theme Web Server<br>

สร้างโดย นายฐิติกร ชัยสิงห์

</div>

</div>

<script>

function showMessage(){

alert("🌿 ยินดีต้อนรับเข้าสู่ Forest Web Server 🍃\\n\\nขอให้มีความสุขกับการเรียน Web Server");

}

</script>

</body>

</html>
`);
});

// เริ่มทำงานของ Server
server.listen(port, () => {

    console.log("======================================");
    console.log(" Forest Theme Web Server Started");
    console.log(" Server Running Successfully");
    console.log(" Port : " + port);
    console.log(" Student : นายฐิติกร ชัยสิงห์");
    console.log(" Student ID : 69319011590");
    console.log("======================================");

});
