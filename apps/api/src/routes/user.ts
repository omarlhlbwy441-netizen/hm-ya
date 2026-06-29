
import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

router.post('/register', async (req, res) => {
  const { username, role } = req.body;
  try {
    const user = await prisma.user.create({ data: { username, role } });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: "خطأ في إنشاء المستخدم، ربما الاسم مكرر." });
  }
});

export default router;
