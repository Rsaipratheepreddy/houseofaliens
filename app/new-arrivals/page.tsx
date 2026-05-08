import type { Metadata } from 'next';
import { CollectionPage } from '@/components/product/CollectionPage';

export const metadata: Metadata = { title: 'New Arrivals' };

export default function NewArrivalsPage() {
  return <CollectionPage slug="new-arrivals" />;
}
