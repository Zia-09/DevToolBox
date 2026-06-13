'use client';
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F1117] text-white text-center px-4">
      <h1 className="text-8xl font-bold text-blue-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
      <p className="text-gray-400 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
