
import express from 'express';
import { prisma } from './db';

const app = express();
app.use(express.json());

// مسار للتحقق من عمل السيرفر
app.get('/', (req, res) => {
  res.json({ message: "🚀 مرحبًا بك في API المملكة! يعمل بنجاح." });
});

// مسار تجريبي للـ DB
app.get('/health', async (req, res) => {
  try {
    // اختبار الاتصال
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "Connected to Database" });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed", details: error });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
