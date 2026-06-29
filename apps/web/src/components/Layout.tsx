import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="w-64 border-r border-slate-800 p-6">
        <h2 className="text-2xl font-bold text-yellow-500 mb-8">مملكتي</h2>
        <nav className="space-y-4">
          <a href="/dashboard" className="block p-2 hover:bg-slate-800 rounded">لوحة التحكم</a>
          <a href="/store" className="block p-2 hover:bg-slate-800 rounded">متجر الترقيات</a>
          <a href="/profile" className="block p-2 hover:bg-slate-800 rounded">إعدادات الملك</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
