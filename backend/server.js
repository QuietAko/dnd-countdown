const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Словарь паролей и соответствующих страниц персонажей
const users = {
  'cl4y_p@ss': '/characters/4cad36d3de2d23a3b63502f582312c95e5cd07319fb0966dd577e2cd65e6f7e5.html',
  'j@z_m1nt0n': '/characters/404ae905592fb62ab4bce84bffc77c6988f86210f49155ee0a40f1007224e837.html',
  'b@xter_r0x': '/characters/dfea3df68d1931c1b3ac0eeeb1db3ae23ca686368760683cbe4ccaf8f012fa10.html',
  'r1ch13_b@rbeq': '/characters/7c8158e3cd0f812209832fe13273e06287f20d9ba189ab7a3ea8eea9a28ff008.html',
};

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const whitelist = ['http://localhost', 'http://dnd.wazowskii.ru'];
  
  if (whitelist.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Авторизация с проверкой пароля
app.post('/auth', (req, res) => {
  const { password } = req.body;
  if (password && users[password.toLowerCase()]) {
    res.json({ success: true, redirectUrl: users[password.toLowerCase()] });
  } else {
    res.json({ success: false, message: 'Неверный пароль' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
