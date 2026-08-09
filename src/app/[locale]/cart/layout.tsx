import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-4 h-screen max-w-11/12 mx-auto mt-15.5">
        <section className="relative lg:col-span-2">{children}</section>
        <section className="lg:col-span-1 bg-blue-600"></section>
      </div>
      <div className="h-56 bg-yellow-200">Products</div>
    </div>
  );
}
