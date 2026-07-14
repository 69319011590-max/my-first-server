// 1. เรียกใช้งาน Module ที่ชื่อว่า 'http'
const http = require('http');

// 2. กำหนด Port
const port = process.env.PORT || 3000;

// 3. สร้าง Server
const server = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

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
    font-family: 'Segoe UI', Tahoma, sans-serif;
    background: linear-gradient(rgba(0,60,20,0.4), rgba(0,30,10,0.6)),
    url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80');
    background-size:cover;
    background-position:center;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
}

.card{
    width:700px;
    background:rgba(255,255,255,0.12);
    backdrop-filter:blur(12px);
    border-radius:25px;
    padding:45px;
    text-align:center;
    color:white;
    border:2px solid rgba(255,255,255,.25);
    box-shadow:0 15px 40px rgba(0,0,0,.45);
    animation:fade 1.5s ease;
}

@keyframes fade{
    from{
        opacity:0;
        transform:translateY(30px);
    }
    to{
        opacity:1;
        transform:translateY(0);
    }
}

h1{
    font-size:40px;
    margin-bottom:20px;
    text-shadow:2px 2px 8px black;
}

h2{
    color:#d4ffb2;
    margin-bottom:20px;
}

p{
    font-size:20px;
    line-height:1.8;
}

.info{
    margin-top:30px;
    background:rgba(0,0,0,.25);
    padding:20px;
    border-radius:15px;
}

.badge{
    display:inline-block;
    margin-top:25px;
    background:#2e7d32;
    padding:12px 25px;
    border-radius:30px;
    font-weight:bold;
    font-size:18px;
    box-shadow:0 0 20px #4caf50;
}

.footer{
    margin-top:30px;
    font-size:15px;
    color:#eeeeee;
}

.leaf{
    position:absolute;
    font-size:30px;
    animation:float 8s infinite linear;
}

.leaf:nth-child(1){left:5%;animation-duration:9s;}
.leaf:nth-child(2){left:25%;animation-duration:12s;}
.leaf:nth-child(3){left:50%;animation-duration:8s;}
.leaf:nth-child(4){left:75%;animation-duration:10s;}
.leaf:nth-child(5){left:90%;animation-duration:11s;}

@keyframes float{
    from{
        transform:translateY(-120px) rotate(0deg);
    }
    to{
        transform:translateY(110vh) rotate(360deg);
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

<div class="card">

<h1>🌲 Forest Web Server 🌲</h1>

<h2>ยินดีต้อนรับ</h2>

<p>
สวัสดีครับ!<br>
นี่คือ Web Server ของ
</p>

<div class="info">
<h2>นายฐิติกร ชัยสิงห์</h2>
<p>รหัสนักศึกษา : 69319011590</p>
</div>

<div class="badge">
✅ Railway Server Online
</div>

<div class="footer">
สร้างด้วย Node.js HTTP Server<br>
ธีมธรรมชาติและป่าไม้ 🍃
</div>

</div>

</body>
</html>
`);
});

// 4. เปิด Server
server.listen(port, () => {
    console.log(\`Server is running! เครื่องแม่ข่ายเปิดทำงานแล้วที่ช่องทาง: \${port}\`);
});
