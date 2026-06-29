
import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

// مسار جلب بيانات الملف الشخصي (محاكاة لجلب المستخدم الأول حالياً)
router.get('/profile', async (req, res) => {
  try {
    // نستخدم findFirst كمثال لجلب مستخدم، في الحقيقة ستحتاج لنظام Auth
    const user = await prisma.user.findFirst();
    if (!user) {
      return res.status(404).json({ error: 'المستخدم غير موجود' });
    }
    res.json({
      balance: user.balance,
      level: user.level,
      isVip: user.isVip
    });
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ في جلب البيانات' });
  }
});

export default router;
