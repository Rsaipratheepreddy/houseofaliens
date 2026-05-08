import Link from 'next/link';
import { cn } from '@/lib/cn';
import styles from './Button.module.scss';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

type AnchorProps = CommonProps & {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type NativeButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

function classes(p: CommonProps) {
  const { variant = 'primary', size = 'md', fullWidth, className } = p;
  return cn(
    styles.btn,
    styles[`v-${variant}`],
    styles[`s-${size}`],
    fullWidth && styles.full,
    className,
  );
}

export function Button(props: ButtonProps) {
  if ('href' in props && props.href) {
    const { href, onClick, children, variant, size, fullWidth, className } = props;
    return (
      <Link
        href={href}
        onClick={onClick}
        className={classes({ variant, size, fullWidth, className, children })}
      >
        <span className={styles.inner}>{children}</span>
      </Link>
    );
  }

  const { children, variant, size, fullWidth, className, ...rest } = props as NativeButtonProps;
  return (
    <button {...rest} className={classes({ variant, size, fullWidth, className, children })}>
      <span className={styles.inner}>{children}</span>
    </button>
  );
}
