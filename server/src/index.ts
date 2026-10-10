import express from 'express';

const app = express();

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log('Server: http://localhost:3000');
});