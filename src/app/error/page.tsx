'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function ErrorPage() {
  const params = useSearchParams();
  const router = useRouter();

  const message = params.get('msg') || 'Đã xảy ra lỗi';

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-3 text-red-500">Lỗi</h1>
      <p className="text-gray-600 mb-6">{message}</p>

      <div className="flex gap-3">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Quay lại
        </button>
        <button
          onClick={() => router.replace('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Trang chủ
        </button>
      </div>
    </main>
  );
}
