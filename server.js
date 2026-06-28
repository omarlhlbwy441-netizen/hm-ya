const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('frontend/app')); // تقديم واجهات المستخدم

// الخزينة المركزية للمشروع
let projectTreasury = {
    balance_usd: 250000.00,
    ads_enabled: true
};

// مسار سحب الأموال (يدعم بنك الخرطوم وفودافون كاش)
app.post('/api/withdraw', (req, res) => {
    const { amount, method, accountDetails } = req.body;
    
    // نظام الحماية الاستباقي (Anti-Fraud)
    if (amount > projectTreasury.balance_usd || amount <= 0) {
        return res.status(400).json({ error: 'رصيد غير كافٍ أو مبلغ غير صالح' });
    }
    
    // معالجة السحب حسب الطريقة
    console.log(`[معاملة جديدة] سحب ${amount}$ عبر ${method} للحساب: ${accountDetails}`);
    projectTreasury.balance_usd -= amount;
    
    res.json({ success: true, message: `تم تأكيد السحب عبر ${method}`, newBalance: projectTreasury.balance_usd });
});

// التحكم في نظام الإعلانات
app.post('/api/toggle-ads', (req, res) => {
    projectTreasury.ads_enabled = !projectTreasury.ads_enabled;
    res.json({ adsActive: projectTreasury.ads_enabled });
});

// حالة الخزينة
app.get('/api/treasury', (req, res) => {
    res.json(projectTreasury);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 خادم hm-ya المالي يعمل على المنفذ ${PORT}`);
});
