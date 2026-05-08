import { cn } from '@/lib/cn';
import styles from './Badge.module.scss';

type Tone = 'neutral' | 'accent' | 'plasma' | 'cyan' | 'danger';

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return <span className={cn(styles.badge, styles[`tone-${tone}`], className)}>{children}</span>;
}
