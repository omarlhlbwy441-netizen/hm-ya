
import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

router.post('/buy', async (req, res) => {
  const { userId, itemId, cost } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.balance < cost) {
      return res.status(400).json({ error: 'رصيد غير كافٍ' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { balance: { decrement: cost } }
    });

    res.json({ success: true, newBalance: updatedUser.balance });
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ أثناء الشراء' });
  }
});

export default router;
