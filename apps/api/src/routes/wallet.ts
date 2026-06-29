
import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

router.get('/:userId/balance', async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.userId } });
  res.json({ balance: user?.diamonds || 0 });
});

export default router;
