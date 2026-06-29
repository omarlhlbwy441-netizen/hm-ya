import React, { useEffect, useState } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // نفترض أن ID المستخدم '1' كما في المتجر
    fetch('/api/history/1')
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);

  return (
    <div className="p-6 bg-slate-900 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">سجل المشتريات</h2>
      <div className="space-y-2">
        {history.map((h: any, i) => (
          <div key={i} className="flex justify-between p-3 border-b border-slate-700">
            <span>{h.item}</span>
            <span className="text-red-400">-{h.cost}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
