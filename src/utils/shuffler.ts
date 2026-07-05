import { RegistryService, RegistryItem } from '../lib/registryService';
import registry from '../data/registry.json'; // Still needed for immediate sync filter, but we use Service for logic

export function getNextSlug(currentSlug?: string, category?: string): string {
  // 1% chance of sponsor/serendipity redirect
  const isSponsor = Math.random() < 0.01;
  if (isSponsor && !category) {
    const sponsors = (registry as any[]).filter((item: any) => item.type === 'sponsor');
    if (sponsors.length > 0) {
      return sponsors[Math.floor(Math.random() * sponsors.length)].slug;
    }
  }

  // Filter by category and exclude current
  let available = (registry as RegistryItem[]).filter(item => item.slug !== currentSlug);
  
  if (category && category !== 'all') {
    available = available.filter(item => item.tags.includes(category));
  }
  
  if (available.length === 0) {
    // If no filtered sites, fallback to everything except current
    available = (registry as RegistryItem[]).filter(item => item.slug !== currentSlug);
    if (available.length === 0) return (registry as any[])[0].slug;
  }

  // Weighted Selection
  const totalWeight = available.reduce((sum, item) => sum + (item.weight || 1), 0);
  let random = Math.random() * totalWeight;

  for (const item of available) {
    random -= (item.weight || 1);
    if (random <= 0) {
      return item.slug;
    }
  }

  return available[0].slug;
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  (registry as RegistryItem[]).forEach(item => {
    item.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}

export function getRegistryItem(slug: string): RegistryItem | undefined {
  return (registry as RegistryItem[]).find(item => item.slug === slug);
}
