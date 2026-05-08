import type { Metadata } from 'next';
import { CollectionPage } from '@/components/product/CollectionPage';

export const metadata: Metadata = { title: 'Limited Edition' };

export default function LimitedEditionPage() {
  return <CollectionPage slug="limited-edition" />;
}
