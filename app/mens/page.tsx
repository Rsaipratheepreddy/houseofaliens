import type { Metadata } from 'next';
import { CollectionPage } from '@/components/product/CollectionPage';

export const metadata: Metadata = { title: 'Mens' };

export default function MensPage() {
  return <CollectionPage slug="mens" />;
}
