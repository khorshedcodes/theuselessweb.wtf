import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Mail, Code, X } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-6 selection:bg-indigo-500/30">
      <Head>
        <title>Contact | theuselessweb.wtf</title>
      </Head>

      <main className="max-w-2xl mx-auto w-full space-y-8 pt-12 md:pt-24 text-center">
        <Link href="/" className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-2 mb-8">
          ← Back to the Void
        </Link>

        <h1 className="text-4xl md:text-6xl font-black">Get in Touch</h1>
        <p className="text-slate-400 text-lg">
          Have a question? Found a bug? Just want to say something useless? 
          We're (mostly) listening.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <a 
            href="mailto:void@theuselessweb.wtf" 
            className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-indigo-500 transition-all group"
          >
            <Mail className="mx-auto mb-4 text-slate-500 group-hover:text-indigo-400 transition-colors" size={32} />
            <span className="block font-bold">Email</span>
            <span className="text-xs text-slate-500">void@theuselessweb.wtf</span>
          </a>

          <a 
            href="https://github.com/khorshedcodes/theuselessweb.wtf" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-indigo-500 transition-all group"
          >
            <Code className="mx-auto mb-4 text-slate-500 group-hover:text-indigo-400 transition-colors" size={32} />
            <span className="block font-bold">GitHub</span>
            <span className="text-xs text-slate-500">Submit an issue</span>
          </a>

          <a 
            href="https://twitter.com/theuselesswebwtf" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-indigo-500 transition-all group"
          >
            <X className="mx-auto mb-4 text-slate-500 group-hover:text-indigo-400 transition-colors" size={32} />
            <span className="block font-bold">X (Twitter)</span>
            <span className="text-xs text-slate-500">@theuselesswebwtf</span>
          </a>
        </div>

        <div className="pt-24 text-slate-600 text-sm">
          <p>Response time: Between 5 minutes and 5 years.</p>
        </div>
      </main>
    </div>
  );
}
