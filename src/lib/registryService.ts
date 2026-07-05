import registryData from '../data/registry.json';

export interface RegistryItem {
  slug: string;
  type: 'internal' | 'external' | 'sponsor';
  title: string;
  author: string;
  description: string;
  github?: string;
  path?: string;
  external_url?: string;
  tags: string[];
  weight?: number;
}

/**
 * Registry Service
 * 
 * This is the central gatekeeper for all site data. 
 * If you move to a database (Supabase, MongoDB, etc.) in the future,
 * you ONLY need to update this file.
 */

export const RegistryService = {
  // Get all sites (Used for Sitemaps and Bulk Processing)
  async getAllSites(): Promise<RegistryItem[]> {
    return registryData as RegistryItem[];
  },

  // Get a single site by slug
  async getSiteBySlug(slug: string): Promise<RegistryItem | undefined> {
    return (registryData as RegistryItem[]).find(s => s.slug === slug);
  },

  // Get sites filtered by tag
  async getSitesByCategory(category: string): Promise<RegistryItem[]> {
    if (!category || category === 'all') return registryData as RegistryItem[];
    return (registryData as RegistryItem[]).filter(s => s.tags.includes(category));
  },

  // Get all unique tags
  async getAllTags(): Promise<string[]> {
    const tags = new Set<string>();
    (registryData as RegistryItem[]).forEach(item => {
      item.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }
};
