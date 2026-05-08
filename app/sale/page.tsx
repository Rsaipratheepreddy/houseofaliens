import type { Metadata } from 'next';
import { CollectionPage } from '@/components/product/CollectionPage';

export const metadata: Metadata = { title: 'Sale' };

export default function SalePage() {
  return <CollectionPage slug="sale" />;
}
