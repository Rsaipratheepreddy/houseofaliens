import styles from './CollectionHero.module.scss';

interface Props {
  title: string;
  description: string;
  count: number;
  /** Photographic hero for the collection (already server-resolved). */
  image?: string;
}

export function CollectionHero({ title, description, count, image }: Props) {
  const bg = image ?? '/header-bg.svg';
  return (
    <section className={styles.root} aria-labelledby="col-heading">
      {/* Plain <img> — bypasses next/image optimizer (path has spaces) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={bg} alt="" className={styles.bg} />
      <div className={styles.scrim} />
      <div className={`container ${styles.inner}`}>
        <span className="eyebrow">Collection · {count} pieces</span>
        <h1 id="col-heading" className={styles.title}>{title}</h1>
        <p className={styles.lede}>{description}</p>
      </div>
    </section>
  );
}
