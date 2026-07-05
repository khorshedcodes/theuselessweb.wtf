import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-6 selection:bg-indigo-500/30">
      <Head>
        <title>About | theuselessweb.wtf</title>
      </Head>

      <main className="max-w-2xl mx-auto w-full space-y-8 pt-12 md:pt-24">
        <Link href="/" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 mb-8">
          ← Back to the Void
        </Link>

        <h1 className="text-4xl md:text-6xl font-black">About the Project</h1>
        
        <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
          <p>
            <span className="text-white font-bold">theuselessweb.wtf</span> is a digital monument to the beautifully unfiltered and chaotic side of the internet. 
            In an age of algorithms and productivity, we believe there is profound value in something that does absolutely nothing.
          </p>
          <p>
            Our mission is simple: to provide a curated sanctuary for websites that are funny, weird, or just plain useless. 
            We provide a secure, sandboxed environment where creators can showcase their most pointless inventions.
          </p>
          <p>
            This project is open-source and community-driven. Every site you see in the shuffle (that isn't an external classic) 
            was submitted by a developer who took five minutes to share a little bit of nonsense with the world.
          </p>
        </div>

        <div className="pt-8 border-t border-slate-900">
          <h2 className="text-2xl font-bold text-white mb-4">The Team</h2>
          <p className="text-slate-500">
            Maintained by a global collective of people who probably have better things to do, but chose not to.
          </p>
        </div>
      </main>
    </div>
  );
}
