import styles from './Marquee.module.scss';

const ITEMS = [
  'FREE SHIPPING ON ORDERS OVER $200',
  'LIMITED DROPS · NEVER RESTOCKED',
  'WORLDWIDE TRANSMISSION',
  'NEW ARRIVALS EVERY THURSDAY',
  'JOIN THE COLLECTIVE — 10% OFF',
];

export function Marquee() {
  const row = (
    <ul className={styles.row} aria-hidden>
      {ITEMS.map((t, i) => (
        <li key={i}>
          <span>{t}</span>
          <span className={styles.dot} aria-hidden>◇</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={styles.root} role="presentation">
      <div className={styles.track}>
        {row}
        {row}
      </div>
    </div>
  );
}
