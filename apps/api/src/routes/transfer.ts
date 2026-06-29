
import { Router } from 'express';
import { processLevelUp } from '../services/leveling';
import { prisma } from '../db';

const router = Router();

router.post('/', async (req, res) => {
  const { senderId, receiverId, amount } = req.body;
  const COMMISSION_RATE = 0.10; // 10%

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. التحقق من رصيد المرسل
      const sender = await tx.user.findUnique({ where: { id: senderId } });
      if (!sender || sender.diamonds < amount) {
        throw new Error("رصيد غير كافٍ");
      }

      // 2. جلب بيانات المستقبل مع وكالته
      const receiver = await tx.user.findUnique({ 
          where: { id: receiverId },
          include: { agency: true } 
      });

      if (!receiver) throw new Error("المستخدم المستقبل غير موجود");

      // 3. خصم المبلغ من المرسل
      await tx.user.update({
        where: { id: senderId },
        data: { diamonds: { decrement: amount } }
      });

      // 4. منطق العمولات
      if (receiver.agencyId && receiver.agency) {
        const commission = Math.floor(amount * COMMISSION_RATE);
        const netAmount = amount - commission;

        // إضافة الصافي للمستقبل
        await tx.user.update({
          where: { id: receiverId },
          data: { diamonds: { increment: netAmount } }
        });

        // إضافة العمولة لمالك الوكالة
        await tx.user.update({
          where: { id: receiver.agency.ownerId }, 
          data: { diamonds: { increment: commission } }
        });

        // سجل المعاملات
        await tx.transaction.createMany({
          data: [
            { senderId, receiverId, amount: netAmount, type: 'TRANSFER' },
            { senderId: receiverId, receiverId: receiver.agency.ownerId, amount: commission, type: 'AGENCY_COMMISSION' }
          ]
        });
      } else {
        // تحويل عادي
        await tx.user.update({
          where: { id: receiverId },
          data: { diamonds: { increment: amount } }
        });
        await tx.transaction.create({
          data: { senderId, receiverId, amount, type: 'TRANSFER' }
        });
      }

      return { success: true };
    });

    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
