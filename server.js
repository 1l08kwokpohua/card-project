const express = require('express');
const app = express();
app.use(express.json());

const ADMIN_PASSWORD = 'K9mX8pL2qR5vN7jH4fD1sA6gT3wE9yU0iB8cZ4x';

// 管理员登录页面
app.get('/admin-login.html', (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>管理员登录</title>
    <style>
        body {
            font-family: system-ui;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .box {
            background: white;
            padding: 40px;
            border-radius: 20px;
            width: 350px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h2 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        input {
            width: 100%;
            padding: 12px;
            margin: 10px 0 20px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            box-sizing: border-box;
        }
        button {
            width: 100%;
            padding: 12px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover {
            background: #5a67d8;
        }
        #msg {
            text-align: center;
            margin-top: 15px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="box">
        <h2>🔐 管理员登录</h2>
        <input type="password" id="pwd" placeholder="请输入密码">
        <button onclick="login()">登录</button>
        <div id="msg"></div>
    </div>

    <script>
    async function login() {
        const pwd = document.getElementById('pwd').value;
        const msg = document.getElementById('msg');
        
        if (!pwd) {
            msg.innerHTML = '<span style="color:red">请输入密码</span>';
            return;
        }
        
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({password: pwd})
            });
            const data = await res.json();
            
            if (data.success) {
                msg.innerHTML = '<span style="color:green">✅ 登录成功！</span>';
            } else {
                msg.innerHTML = '<span style="color:red">❌ 密码错误</span>';
            }
        } catch (err) {
            msg.innerHTML = '<span style="color:red">❌ 网络错误</span>';
        }
    }
    </script>
</body>
</html>`);
});

// 用户登录页面
app.get('/user-login.html', (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>用户登录</title>
    <style>
        body {
            font-family: system-ui;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .box {
            background: white;
            padding: 40px;
            border-radius: 20px;
            width: 350px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h2 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        input {
            width: 100%;
            padding: 12px;
            margin: 10px 0 20px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            box-sizing: border-box;
        }
        button {
            width: 100%;
            padding: 12px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover {
            background: #5a67d8;
        }
        #msg {
            text-align: center;
            margin-top: 15px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="box">
        <h2>🎫 用户登录</h2>
        <input type="text" id="card" placeholder="请输入卡密">
        <button onclick="login()">登录</button>
        <div id="msg"></div>
    </div>

    <script>
    async function login() {
        const card = document.getElementById('card').value;
        const msg = document.getElementById('msg');
        
        if (!card) {
            msg.innerHTML = '<span style="color:red">请输入卡密</span>';
            return;
        }
        
        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({cardKey: card})
            });
            const data = await res.json();
            
            if (data.success) {
                msg.innerHTML = '<span style="color:green">✅ 登录成功！</span>';
            } else {
                msg.innerHTML = '<span style="color:red">❌ 卡密无效</span>';
            }
        } catch (err) {
            msg.innerHTML = '<span style="color:red">❌ 网络错误</span>';
        }
    }
    </script>
</body>
</html>`);
});

// API接口
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    res.json({ success: password === ADMIN_PASSWORD });
});

app.post('/api/user/login', (req, res) => {
    const { cardKey } = req.body;
    // 只要是 CARD- 开头的就算正确
    res.json({ success: cardKey && cardKey.startsWith('CARD-') });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ 服务器启动成功，端口: ${PORT}`);
    console.log(`管理员登录: /admin-login.html`);
    console.log(`用户登录: /user-login.html`);
    console.log(`管理员密码: ${ADMIN_PASSWORD}`);
    console.log(`测试卡密: CARD-123456`);
});
