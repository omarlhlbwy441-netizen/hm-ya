
import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

// 1. إنشاء وكالة جديدة
router.post('/create', async (req, res) => {
  const { name, ownerId } = req.body;
  try {
    const agency = await prisma.agency.create({
      data: { name, ownerId }
    });
    res.json(agency);
  } catch (e) {
    res.status(400).json({ error: "فشل إنشاء الوكالة، تأكد من أن المالك موجود." });
  }
});

// 2. إضافة مستخدم (صانع محتوى) للوكالة
router.post('/add-member', async (req, res) => {
  const { agencyId, userId } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { agencyId: agencyId }
    });
    res.json({ message: "تمت إضافة العضو للوكالة بنجاح", user: updatedUser });
  } catch (e) {
    res.status(400).json({ error: "فشل إضافة العضو" });
  }
});

// 3. عرض أعضاء الوكالة
router.get('/:agencyId/members', async (req, res) => {
  const { agencyId } = req.params;
  const members = await prisma.user.findMany({
    where: { agencyId: agencyId }
  });
  res.json(members);
});

export default router;
