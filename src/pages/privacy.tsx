import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-6 selection:bg-indigo-500/30">
      <Head>
        <title>Privacy Policy | theuselessweb.wtf</title>
      </Head>

      <main className="max-w-2xl mx-auto w-full space-y-8 pt-12 md:pt-24">
        <Link href="/" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 mb-8">
          ← Back to the Void
        </Link>

        <h1 className="text-4xl md:text-6xl font-black">Privacy Policy</h1>
        
        <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
          <p>
            Last Updated: June 17, 2026
          </p>
          <p>
            At <span className="text-white font-bold">theuselessweb.wtf</span>, we take your privacy as seriously as we take being useless. 
            That is to say, we don't really want anything from you.
          </p>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">1. Data Collection</h2>
            <p>
              We do not collect personal information like your name, email, or physical address. 
              We use local storage in your browser to keep track of your "Wasted Time" metric so it persists when you return. 
              This data never leaves your machine.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">2. Global Stats</h2>
            <p>
              We track the total seconds spent on the site across all users to display our "Global Wasted Time" counter. 
              This data is aggregated and contains no identifying information.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">3. Third-Party Content</h2>
            <p>
              Some sites in the shuffle are external and hosted by third parties. When you view these sites, 
              they are loaded in an <code>&lt;iframe&gt;</code>. These third-party sites may have their own privacy policies and may 
              collect data according to their own practices. We encourage you to be cautious.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">4. Cookies</h2>
            <p>
              We don't use tracking cookies. We're too busy shuffling ducks for that.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
