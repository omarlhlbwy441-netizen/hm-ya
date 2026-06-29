
import { Request, Response, NextFunction } from 'express';

export const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.connection.remoteAddress;
  
  // 1. تسجيل النشاط (Logging for Admin)
  console.log(`[SECURE_LOG] ${new Date().toISOString()} - ${req.method} ${req.originalUrl} - IP: ${ip}`);

  // 2. فحص أمني بسيط (مثال: حظر الطلبات التي لا تحتوي على User-Agent)
  if (!req.headers['user-agent']) {
    return res.status(403).json({ error: "طلب مشبوه تم حظره." });
  }

  next();
};
