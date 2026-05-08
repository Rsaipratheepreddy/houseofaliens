'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

const FALLBACK = '/products/placeholder.svg';

/**
 * SmartImage swaps to the brand placeholder if the source 404s — useful while
 * the image generation pipeline is still being filled in. Visually identical
 * to next/image otherwise.
 */
export function SmartImage(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const [errored, setErrored] = useState(false);
  return (
    <Image
      src={errored ? FALLBACK : src}
      alt={alt ?? ''}
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}
