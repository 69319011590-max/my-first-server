const http = require('http');
// 1. เรียกใช้งาน Pool จากไลบรารี pg สำหรับจัดการการเชื่อมต่อฐานข้อมูล
const { Pool } = require('pg');
// 2. ตั้งค่าการเชื่อมต่อ โดยดึง URL มาจาก Environment Variable ของ Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const port = process.env.PORT || 3000;

// ฟังก์ชันสร้างแถวตาราง แยกออกมาต่างหาก เพื่อไม่ต้องซ้อน template literal หลายชั้น
function buildTableRows(rows) {
  return rows
    .map(
      (row, index) => `
        <tr style="animation-delay: ${index * 0.05}s;">
          <td>${row.student_id}</td>
          <td>${row.student_name}</td>
        </tr>`
    )
    .join('');
}

function buildTableOrEmpty(rows) {
  if (rows.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">🌊</div>
        <h3>ยังไม่มีข้อมูลนักศึกษา</h3>
        <p>กรุณาเพิ่มข้อมูลในฐานข้อมูล</p>
      </div>`;
  }

  return `
    <table>
      <thead>
        <tr>
          <th>🆔 รหัสนักศึกษา</th>
          <th>👤 ชื่อ-นามสกุล</th>
        </tr>
      </thead>
      <tbody>
        ${buildTableRows(rows)}
      </tbody>
    </table>`;
}

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  try {
    // 3. ขอเชื่อมต่อและส่งคำสั่ง SQL ไปดึงข้อมูลจากตาราง students
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM students');
    client.release(); // คืนการเชื่อมต่อเมื่อใช้งานเสร็จ

    // 4. นำข้อมูลที่ได้ (result.rows) มาประกอบเป็นตาราง HTML พร้อมธีมทะเล
    const html = `
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>🌊 ระบบฐานข้อมูลนักศึกษา</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0a1f3f 0%, #1a4d7f 50%, #2a7db9 100%);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* คลื่นพื้นหลัง */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-position: 0 0;
          animation: wave 10s linear infinite;
          z-index: 1;
          pointer-events: none;
        }

        @keyframes wave {
          0% { background-position: 0 0; }
          100% { background-position: 1200px 0; }
        }

        .container {
          position: relative;
          z-index: 2;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
          animation: fadeInDown 0.8s ease-out;
        }

        .header h1 {
          color: #ffffff;
          font-size: 2.5em;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: 1px;
        }

        .header p {
          color: #b0e0e6;
          font-size: 1.1em;
          font-weight: 300;
        }

        .card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          animation: fadeInUp 0.8s ease-out;
          backdrop-filter: blur(10px);
        }

        .card-header {
          background: linear-gradient(135deg, #00a8d8 0%, #005a7c 100%);
          color: white;
          padding: 20px;
          font-size: 1.3em;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .card-header::before {
          content: '🌊';
          font-size: 1.5em;
        }

        .card-content {
          padding: 30px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        thead {
          background: linear-gradient(135deg, #00a8d8 0%, #0088a8 100%);
        }

        th {
          color: white;
          padding: 15px;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #0077a8;
        }

        tbody tr {
          border-bottom: 1px solid #e0e0e0;
          transition: all 0.3s ease;
        }

        tbody tr:hover {
          background-color: #e0f7ff;
          transform: translateX(5px);
        }

        tbody tr:nth-child(even) {
          background-color: #f5fafb;
        }

        td {
          padding: 15px;
          color: #333;
        }

        td:first-child {
          font-weight: 600;
          color: #00a8d8;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-box {
          background: linear-gradient(135deg, #00a8d8 0%, #005a7c 100%);
          color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          animation: fadeIn 1s ease-out;
        }

        .stat-box .number {
          font-size: 2.5em;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .stat-box .label {
          font-size: 0.9em;
          opacity: 0.9;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .empty-state-icon {
          font-size: 4em;
          margin-bottom: 20px;
        }

        .footer {
          text-align: center;
          margin-top: 40px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9em;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .bubble {
          position: fixed;
          bottom: -50px;
          background: rgba(0, 168, 216, 0.1);
          border-radius: 50%;
          opacity: 0.5;
          animation: float-up 8s infinite ease-in;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes float-up {
          0% { bottom: -50px; opacity: 0; }
          50% { opacity: 0.5; }
          100% { bottom: 100vh; opacity: 0; }
        }
      </style>
    </head>
    <body>
      <!-- ฟองอากาศลอยขึ้น -->
      <div class="bubble" style="width: 40px; height: 40px; left: 10%; animation-delay: 0s;"></div>
      <div class="bubble" style="width: 60px; height: 60px; left: 30%; animation-delay: 2s;"></div>
      <div class="bubble" style="width: 30px; height: 30px; left: 50%; animation-delay: 4s;"></div>
      <div class="bubble" style="width: 50px; height: 50px; left: 70%; animation-delay: 1s;"></div>
      <div class="bubble" style="width: 35px; height: 35px; left: 90%; animation-delay: 3s;"></div>

      <div class="container">
        <div class="header">
          <h1>🌊 ระบบฐานข้อมูลนักศึกษา</h1>
          <p>ทดสอบการเชื่อมต่อและการดึงข้อมูลจากฐานข้อมูล</p>
        </div>

        <div class="stats">
          <div class="stat-box">
            <div class="number">${result.rows.length}</div>
            <div class="label">จำนวนนักศึกษา</div>
          </div>
          <div class="stat-box" style="animation-delay: 0.1s;">
            <div class="number">✓</div>
            <div class="label">สถานะการเชื่อมต่อ</div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">ข้อมูลนักศึกษา</div>
          <div class="card-content">
            ${buildTableOrEmpty(result.rows)}
          </div>
        </div>

        <div class="footer">
          <p>🌴 ระบบฐานข้อมูลนักศึกษา | ข้อมูลอัพเดท: ${new Date().toLocaleString('th-TH')} 🏖️</p>
        </div>
      </div>
    </body>
    </html>
    `;

    res.end(html);
  } catch (err) {
    // กรณีเชื่อมต่อไม่ได้หรือเขียนชื่อตารางผิด
    console.error(err);

    const errorHtml = `
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>⚠️ เกิดข้อผิดพลาด</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #1a0a0a 0%, #4a1a1a 50%, #7a3a3a 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .error-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          padding: 40px;
          text-align: center;
          animation: slideIn 0.5s ease-out;
        }
        .error-icon { font-size: 4em; margin-bottom: 20px; }
        h1 { color: #d32f2f; margin-bottom: 10px; font-size: 2em; }
        .error-message {
          background: #fff3cd;
          border-left: 4px solid #ff9800;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
          text-align: left;
          font-family: monospace;
          color: #333;
          overflow-x: auto;
        }
        .debug-info { margin-top: 20px; font-size: 0.9em; color: #666; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
    </head>
    <body>
      <div class="error-container">
        <div class="error-icon">⚠️</div>
        <h1>เกิดข้อผิดพลาด!</h1>
        <p>ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้</p>
        <div class="error-message">
          <strong>ข้อความข้อผิดพลาด:</strong><br>
          ${err.message}
        </div>
        <div class="debug-info">
          <p>🔍 โปรดตรวจสอบ:</p>
          <ul style="text-align: left; display: inline-block;">
            <li>DATABASE_URL Environment Variable</li>
            <li>ชื่อของตาราง (students)</li>
            <li>การเชื่อมต่อเครือข่าย</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
    `;

    res.end(errorHtml);
  }
});

server.listen(port, () => {
  console.log(`🌊 Server is running on port: ${port}`);
  console.log(`📍 Open browser: http://localhost:${port}`);
});
