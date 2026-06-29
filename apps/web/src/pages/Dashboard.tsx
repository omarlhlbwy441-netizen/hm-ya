import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState({ balance: 0, level: 1, isVip: false });

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">لوحة تحكم الملك</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-800 rounded-xl border border-yellow-500">
          <p className="text-slate-400">الرصيد الحالي</p>
          <h2 className="text-3xl font-bold text-yellow-500">{user.balance} 💰</h2>
        </div>
        <div className="p-6 bg-slate-800 rounded-xl">
          <p className="text-slate-400">مستوى الملك</p>
          <h2 className="text-3xl font-bold text-white">{user.level} 👑</h2>
        </div>
        <div className="p-6 bg-slate-800 rounded-xl">
          <p className="text-slate-400">الحالة</p>
          <h2 className="text-3xl font-bold text-purple-500">{user.isVip ? 'VIP' : 'عادي'}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
