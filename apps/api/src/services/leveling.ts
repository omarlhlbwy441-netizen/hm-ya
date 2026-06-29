
import { prisma } from '../db';

export const processLevelUp = async (userId: string, amount: number) => {
  // 1. حساب الـ XP (نفرض أن كل 10 عملات = 1 XP)
  const xpGain = Math.floor(amount / 10);
  
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const newXp = user.exp + xpGain;
  const nextLevelXp = user.level * 1000; // مثال: الوصول للفل التالي يحتاج ليفل * 1000

  if (newXp >= nextLevelXp) {
    await prisma.user.update({
      where: { id: userId },
      data: { 
        level: user.level + 1,
        exp: 0, // تصفير الـ XP عند الصعود للفل التالي
        isVip: user.level + 1 >= 5 ? true : false // تلقائياً يصبح VIP في مستوى 5
      }
    });
  } else {
    await prisma.user.update({
      where: { id: userId },
      data: { exp: newXp }
    });
  }
};
