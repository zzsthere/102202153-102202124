const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

let users = [];
let projects = [];

// 用户注册
app.post('/register', async (req, res) => {
  const { phone, code, password } = req.body;
  if (!phone ||!code ||!password) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ phone, password: hashedPassword });
  res.json({ success: true });
});

// 用户登录
app.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  if (!phone ||!password) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const user = users.find(u => u.phone === phone);
  const isValidPassword = user? await bcrypt.compare(password, user.password) : false;
  res.json({ success: isValidPassword });
});

// 发布项目
app.post('/publishProject', (req, res) => {
  const { projectName, description, requirements, recruitmentNumber, deadline } = req.body;
  if (!projectName ||!description ||!requirements || recruitmentNumber == null ||!deadline) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  projects.push({ projectName, description, requirements, recruitmentNumber, deadline });
  res.json({ success: true });
});

// Socket.IO 实时聊天
io.on('connection', (socket) => {
  console.log('New client connected');

  // 当用户发送消息时
  socket.on('sendMessage', (message) => {
    if (!message) return;
    // 检查是否有其他在线用户（除了发送者本身）
    const otherUsers = users.filter(user => user.socketId!== socket.id);
    if (otherUsers.length === 0) {
      // 没有其他在线用户，发送自动回复
      const autoReplyMessage = {
        _id: uuid.v4(), // 生成唯一ID
        content: '[自动回复]目前小程序还未连接用户，sorry哟~',
        timestamp: Date.now(),
        isSender: false, // 标记为自动回复，不是用户发送
      };
      socket.emit('message', autoReplyMessage);
    } else {
      // 有其他在线用户，正常广播消息
      io.emit('message', message);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    users = users.filter(user => user.socketId!== socket.id);
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});