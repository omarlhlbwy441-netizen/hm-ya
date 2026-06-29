
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // جلب بيانات المستخدم
    axios.get('/api/user/profile') 
      .then(res => setData(res.data))
      .catch(err => console.error("خطأ في جلب البيانات", err));
  }, []);

  if (!data) return <div>جاري تحميل بيانات المملكة...</div>;

  return (
    <div className="p-8 bg-slate-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">مرحباً بك في مملكتك</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800 rounded">
          <p className="text-gray-400">الرصيد</p>
          <h2 className="text-2xl">{data.balance}</h2>
        </div>
        <div className="p-4 bg-slate-800 rounded">
          <p className="text-gray-400">المستوى (Level)</p>
          <h2 className="text-2xl">{data.level}</h2>
        </div>
        <div className="p-4 bg-slate-800 rounded">
          <p className="text-gray-400">الحالة</p>
          <h2 className={`text-2xl ${data.isVip ? 'text-yellow-400' : 'text-gray-400'}`}>
            {data.isVip ? '👑 VIP' : 'عضو عادي'}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
