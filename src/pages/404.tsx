import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <Head>
        <title>404 - Absolute Void | theuselessweb.wtf</title>
      </Head>

      <div className="space-y-6 max-w-md">
        <div className="text-9xl animate-pulse">🛸</div>
        <h1 className="text-5xl font-black tracking-tighter">404: LOST IN THE VOID</h1>
        <p className="text-slate-400 text-lg">
          You've reached a level of uselessness that even we didn't plan for. 
          This page does not exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold transition-all"
          >
            <Home size={20} />
            <span>Go Home</span>
          </Link>
          <Link 
            href="/site/click-the-duck" 
            className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 px-6 py-3 rounded-xl font-bold transition-all"
          >
            <Search size={20} />
            <span>Find a Duck</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
