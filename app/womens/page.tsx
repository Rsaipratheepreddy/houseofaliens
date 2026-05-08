import type { Metadata } from 'next';
import { CollectionPage } from '@/components/product/CollectionPage';

export const metadata: Metadata = { title: 'Womens' };

export default function WomensPage() {
  return <CollectionPage slug="womens" />;
}
