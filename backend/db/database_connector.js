const { Pool } = require('pg');

// إعداد الاتصال المركزي بقاعدة بيانات railway
const pool = new Pool({
    connectionString: process.env.RAILWAY_DATABASE_URL || "postgresql://user:password@containers-us-west-XX.railway.app:5432/railway",
    ssl: { rejectUnauthorized: false }
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ فشل الاتصال بقاعدة بيانات railway:', err.stack);
    } else {
        console.log('✅ تم الاتصال بنظام قواعد بيانات railway بنجاح.');
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
