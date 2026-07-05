import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import NavigationFrame from '@/components/NavigationFrame';
import SandboxIframe from '@/components/SandboxIframe';
import { RegistryService, RegistryItem } from '@/lib/registryService';

interface SitePageProps {
  site: RegistryItem;
}

export default function SitePage({ site }: SitePageProps) {
  const iframeSrc = site.type === 'internal' ? site.path : site.external_url;

  // Strict allowlist: only alphanumeric, hyphens, and dots are valid GitHub username characters
  const safeGithubUrl =
    site.github && /^[a-zA-Z0-9\-\.]+$/.test(site.github)
      ? `https://github.com/${site.github}`
      : undefined;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col overflow-hidden">
      <Head>
        <title>{site.title} | theuselessweb.wtf</title>
        <meta name="description" content={site.description} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${site.title} | theuselessweb.wtf`} />
        <meta property="og:description" content={site.description} />
        <meta property="og:image" content="https://theuselessweb.wtf/og-preview.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${site.title} | theuselessweb.wtf`} />
        <meta property="twitter:description" content={site.description} />
        <meta property="twitter:image" content="https://theuselessweb.wtf/og-preview.png" />
      </Head>

      <NavigationFrame 
        currentSlug={site.slug} 
        siteTitle={site.title} 
        githubUrl={safeGithubUrl} 
      />

      <main className="flex-grow relative">
        {iframeSrc ? (
          <SandboxIframe src={iframeSrc} title={site.title} />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            Site source not found.
          </div>
        )}
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const registry = await RegistryService.getAllSites();
  const paths = registry.map((item) => ({
    params: { slug: item.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const site = await RegistryService.getSiteBySlug(slug);

  if (!site) {
    return { notFound: true };
  }

  return {
    props: { site },
  };
};
