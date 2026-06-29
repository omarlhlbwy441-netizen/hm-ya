
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(express.json());

// مسار الاختبار الأساسي
app.get('/api/status', (req, res) => {
  res.json({ status: 'المملكة تعمل بنجاح!', timestamp: new Date() });
});

// مسار للتحقق من الاتصال بقاعدة البيانات
app.get('/api/db-test', async (req, res) => {
  try {
    // محاولة تنفيذ استعلام بسيط للتأكد من الاتصال
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'success', message: 'تم الاتصال بقاعدة البيانات بنجاح!' });
  } catch (error) {
    console.error('DB Connection Error:', error);
    res.status(500).json({ status: 'error', message: 'فشل الاتصال بقاعدة البيانات', error: String(error) });
  }
});

app.listen(port, () => {
  console.log(`المملكة تستمع على المنفذ: ${port}`);
});
