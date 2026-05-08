import { forwardRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, id, className, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  return (
    <label className={cn(styles.field, error && styles.errored, className)} htmlFor={inputId}>
      {label && <span className={styles.label}>{label}</span>}
      <input ref={ref} id={inputId} className={styles.input} {...rest} />
      {error ? <span className={styles.error}>{error}</span>
        : hint ? <span className={styles.hint}>{hint}</span>
        : null}
    </label>
  );
});
