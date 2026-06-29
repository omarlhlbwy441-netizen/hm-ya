
import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

router.post('/', async (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. التحقق من رصيد المرسل
      const sender = await tx.user.findUnique({ where: { id: senderId } });
      if (!sender || sender.diamonds < amount) {
        throw new Error("رصيد غير كافٍ");
      }

      // 2. خصم المبلغ من المرسل
      await tx.user.update({
        where: { id: senderId },
        data: { diamonds: { decrement: amount } }
      });

      // 3. إضافة المبلغ للمستقبل
      await tx.user.update({
        where: { id: receiverId },
        data: { diamonds: { increment: amount } }
      });

      // 4. تسجيل العملية في سجل المعاملات (Audit Log)
      await tx.transaction.create({
        data: { senderId, receiverId, amount, type: 'TRANSFER' }
      });

      return { success: true };
    });

    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
