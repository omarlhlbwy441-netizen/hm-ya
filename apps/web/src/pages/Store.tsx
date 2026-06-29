import React from 'react';

const Store = () => {
  const handlePurchase = async (item: any) => {
    try {
      const response = await fetch('/api/purchase/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: '1', itemId: item.id, cost: item.cost })
      });
      
      const data = await response.json();
      if (data.success) {
        alert('تم الشراء بنجاح! رصيدك الجديد: ' + data.newBalance);
      } else {
        alert('خطأ: ' + data.error);
      }
    } catch (e) {
      alert('فشل الاتصال بالخادم');
    }
  };

  const items = [
    { id: 'crown', name: "تاج ذهبي", cost: 500, effect: "+10 مستوى" },
    { id: 'shield', name: "درع الحماية", cost: 200, effect: "VIP لمدة شهر" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">سوق المملكة</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="p-6 bg-slate-900 border border-slate-700 rounded-xl">
            <h3 className="text-xl font-bold text-yellow-400">{item.name}</h3>
            <p className="text-slate-400 mt-2">{item.effect}</p>
            <button 
              onClick={() => handlePurchase(item)}
              className="mt-4 w-full bg-yellow-600 hover:bg-yellow-500 py-2 rounded font-bold transition-all"
            >
              شراء بـ {item.cost} عملة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
