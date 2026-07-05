import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Upload, Code, CheckCircle } from 'lucide-react';

export default function Submit() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-6 selection:bg-indigo-500/30">
      <Head>
        <title>Submit a Site | theuselessweb.wtf</title>
      </Head>

      <main className="max-w-3xl mx-auto w-full space-y-12 pt-12 md:pt-24">
        <Link href="/" className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-2">
          ← Back to the Void
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black">Submit a Site</h1>
          <p className="text-slate-400 text-lg">
            Got a beautifully useless creation? We want to see it. 
            Follow the guide below to add your site to our permanent shuffle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-full flex items-center justify-center font-bold text-xl">1</div>
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Code size={20} /> Build It
            </h3>
            <p className="text-slate-500 text-sm">
              Create a static HTML folder. Keep it light, interactive, and completely pointless.
            </p>
          </div>

          <div className="space-y-4 p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-full flex items-center justify-center font-bold text-xl">2</div>
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Upload size={20} /> PR It
            </h3>
            <p className="text-slate-500 text-sm">
              Fork our repo and add your folder to `public/submissions/`. Then update `registry.json`.
            </p>
          </div>

          <div className="space-y-4 p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-full flex items-center justify-center font-bold text-xl">3</div>
            <h3 className="font-bold text-xl flex items-center gap-2">
              <CheckCircle size={20} /> Shuffle It
            </h3>
            <p className="text-slate-500 text-sm">
              Once merged, your site will be live for everyone to stumble upon!
            </p>
          </div>
        </div>

        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Ready to contribute?</h3>
            <p className="text-slate-400">Read our full contributing guide on GitHub.</p>
          </div>
          <a 
            href="https://github.com/khorshedcodes/theuselessweb.wtf" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
          >
            Go to GitHub Repo
          </a>
        </div>

        <div className="pt-12 border-t border-slate-900">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">The Golden Rule</h4>
          <p className="text-slate-400 italic">
            "A site is perfect for theuselessweb.wtf not when there is nothing more to add, but when there is nothing more to take away."
          </p>
        </div>
      </main>
    </div>
  );
}
