
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(express.json());

// مسار الاختبار (للتأكد أن المملكة تعمل)
app.get('/api/status', (req, res) => {
  res.json({ status: 'المملكة تعمل بنجاح!', timestamp: new Date() });
});

// مسار لجلب بيانات المستخدم (تجريبي)
app.get('/api/kingdom/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await prisma.user.findUnique({
      where: { username },
      include: { kingdom: true }
    });
    
    if (!user) return res.status(404).json({ error: 'المستخدم غير موجود' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب بيانات المملكة' });
  }
});

app.listen(port, () => {
  console.log(`المملكة تستمع على المنفذ: ${port}`);
});
