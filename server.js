// ============================================================================
// Sea Theme Web Server
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

<title>Sea Web Server</title>

<style>

*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{
    font-family:'Segoe UI',sans-serif;
    background-image:
      linear-gradient(rgba(0,30,60,0.45),rgba(0,10,30,0.75)),
      url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920");
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    background-attachment:fixed;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100vh;
    color:#eaf6ff;
}

.container{
    width:92%;
    max-width:880px;
    background:linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
    backdrop-filter:blur(10px);
    -webkit-backdrop-filter:blur(10px);
    border:1px solid rgba(255,255,255,0.08);
    border-radius:24px;
    padding:40px 50px;
    text-align:center;
    box-shadow:0 20px 50px rgba(0,20,40,0.5), inset 0 1px 0 rgba(255,255,255,0.02);
    position:relative;
    overflow:hidden;
}

.logo{
    font-size:76px;
    margin-bottom:10px;
    animation:float 4s ease-in-out infinite;
}
@keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-12px)}100%{transform:translateY(0)}}

h1{font-size:44px;margin:6px 0 8px;text-shadow:0 6px 22px rgba(0,0,0,0.6)}
.subtitle{font-size:20px;color:#bfe9ff;margin-bottom:18px}

.info{
    background:rgba(0,0,0,0.18);
    padding:20px 22px;
    border-radius:14px;
    margin-top:18px;
    line-height:1.8;
    font-size:18px;
    color:#e8f9ff;
}

.badge{
    display:inline-block;
    margin-top:28px;
    padding:12px 30px;
    background:linear-gradient(90deg,#00b4ff,#0077ff);
    border-radius:999px;
    font-size:18px;
    font-weight:700;
    color:white;
    box-shadow:0 10px 30px rgba(0,120,255,0.25);
}

.description{margin-top:26px;font-size:17px;line-height:1.9;color:#dff6ff}

.footer{margin-top:26px;font-size:14px;color:#cfeefc}

button{
    margin-top:22px;padding:12px 26px;font-size:16px;border:none;border-radius:28px;background:#00aeea;color:white;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease;box-shadow:0 8px 24px rgba(0,150,255,0.18)
}
button:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(0,150,255,0.28)}

/* Bubbles */
.bubble{
    position:absolute;border-radius:50%;background:rgba(255,255,255,0.12);backdrop-filter:blur(2px);pointer-events:none;
}
.bubble.one{width:120px;height:120px;right:-40px;top:-60px;animation:drift 12s linear infinite}
.bubble.two{width:80px;height:80px;left:-30px;bottom:-40px;animation:drift 10s linear infinite}
.bubble.three{width:50px;height:50px;left:20%;top:-30px;animation:drift 14s linear infinite}
@keyframes drift{0%{transform:translateY(0) translateX(0) scale(1)}50%{transform:translateY(18px) translateX(8px) scale(1.02)}100%{transform:translateY(0) translateX(0) scale(1)}}

/* Waves at the bottom */
.waves{position:absolute;left:0;right:0;bottom:-40px;height:220px;overflow:hidden;pointer-events:none}
.wave{position:absolute;left:0;right:0;bottom:0;height:120px;background:rgba(255,255,255,0.03);border-radius:100%;filter:blur(18px);opacity:0.4}
.wave.w1{height:120px;transform:translateY(12px);animation:waveAnim 6s ease-in-out infinite}
.wave.w2{height:140px;transform:translateY(8px);opacity:0.28;animation:waveAnim 8s ease-in-out infinite}
@keyframes waveAnim{0%{transform:translateY(8px) translateX(-5%)}50%{transform:translateY(16px) translateX(5%)}100%{transform:translateY(8px) translateX(-5%)}}

/* Sea icons falling */
.sea-item{position:absolute;font-size:28px;top:-60px;opacity:0;animation:fallSea linear infinite}
.sea-item.s1{left:8%;animation-duration:10s}
.sea-item.s2{left:22%;animation-duration:13s}
.sea-item.s3{left:38%;animation-duration:11s}
.sea-item.s4{left:56%;animation-duration:12s}
.sea-item.s5{left:72%;animation-duration:9s}
.sea-item.s6{left:88%;animation-duration:14s}
@keyframes fallSea{0%{transform:translateY(-120px) rotate(0deg);opacity:0}20%{opacity:1}100%{transform:translateY(120vh) rotate(360deg);opacity:0}}

/* Responsive */
@media(max-width:768px){
    .logo{font-size:58px}
    h1{font-size:28px}
    .subtitle{font-size:16px}
    .info{font-size:16px}
    .container{padding:24px}
    button{width:100%}
}

</style>

</head>

<body>

<div class="bubble one"></div>
<div class="bubble two"></div>
<div class="bubble three"></div>

<div class="sea-item s1">🐚</div>
<div class="sea-item s2">🌊</div>
<div class="sea-item s3">🐠</div>
<div class="sea-item s4">🪸</div>
<div class="sea-item s5">🐙</div>
<div class="sea-item s6">🪼</div>

<div class="container">

<div class="logo">🌊</div>

<h1>Sea Web Server</h1>

<div class="subtitle">ยินดีต้อนรับสู่ Web Server ธีมทะเล</div>

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

<div class="badge">🟦 SERVER ONLINE</div>

<div class="description">

ยินดีต้อนรับเข้าสู่เว็บไซต์ตัวอย่างธีมทะเล (Sea Theme) ที่ออกแบบให้รู้สึกเย็นสบาย สดชื่น
พร้อมเอฟเฟกต์ฟองอากาศและคลื่นเพื่อเพิ่มบรรยากาศของท้องทะเล

</div>

<button onclick="showMessage()">🌊 คลิกเพื่อทักทาย</button>

<div class="footer">© 2026 Sea Theme Web Server<br>สร้างโดย นายฐิติกร ชัยสิงห์</div>

</div>

<div class="waves">
    <div class="wave w1"></div>
    <div class="wave w2"></div>
</div>

<script>
function showMessage(){
    alert("🌊 ยินดีต้อนรับสู่ Sea Web Server! 🐚\n\nขอให้สนุกกับการเรียน Web Server และสำรวจธีมทะเลนี้นะครับ");
}
</script>

</body>

</html>
`);
});

// เริ่มทำงานของ Server
server.listen(port, () => {

    console.log("======================================");
    console.log(" Sea Theme Web Server Started");
    console.log(" Server Running Successfully");
    console.log(" Port : " + port);
    console.log(" Student : นายฐิติกร ชัยสิงห์");
    console.log(" Student ID : 69319011590");
    console.log("======================================");

});
