"use client";

import AirdropForm from "@/components/AirdropForm";

export default function HomeContent() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-zinc-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md">
        <AirdropForm />
      </div>
    </main>
  );
}