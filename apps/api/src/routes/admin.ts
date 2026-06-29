
import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

// 1. مراقبة حركة النظام (عرض كل المعاملات)
router.get('/transactions', async (req, res) => {
  const transactions = await prisma.transaction.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50 // آخر 50 عملية
  });
  res.json(transactions);
});

// 2. إيقاف/حظر مستخدم (في حال وجود شكاوى)
router.post('/ban-user', async (req, res) => {
  const { userId } = req.body;
  // في المستقبل يمكنك إضافة حقل 'isBanned' في الـ Schema
  res.json({ message: `تمت معالجة الطلب للمستخدم ${userId} (ميزة قيد التطوير)` });
});

// 3. عرض إحصائيات سريعة
router.get('/stats', async (req, res) => {
  const userCount = await prisma.user.count();
  const agencyCount = await prisma.agency.count();
  res.json({ userCount, agencyCount });
});

export default router;
