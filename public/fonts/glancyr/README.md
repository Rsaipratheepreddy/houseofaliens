# Glancyr

Drop your licensed Glancyr font files in this folder. The site loads them
via `next/font/local` from `app/layout.tsx`.

## Expected filenames

```
glancyr/
├── Glancyr-Regular.otf     (400)
├── Glancyr-Medium.otf      (500)
├── Glancyr-Semibold.otf    (600)
└── Glancyr-Bold.otf        (700)   ← used for hero / display headlines
```

If you later license the **Extrabold (800)** weight, drop
`Glancyr-Extrabold.otf` in this folder and add this entry back to the `src`
array in `app/layout.tsx`:

```ts
{ path: '../public/fonts/glancyr/Glancyr-Extrabold.otf', weight: '800', style: 'normal' },
```

## Notes

- **`.otf` is wired by default**. `next/font/local` also supports `.ttf`,
  `.woff`, and `.woff2` — if you have those instead, edit the extensions in
  `app/layout.tsx`. You can mix formats freely.
- If you only have a subset of weights, **delete the missing entries** from
  the `src` array in `app/layout.tsx` — Next will throw on the first missing
  file otherwise.
- Trial files from Pangram Pangram come named like `Glancyr-Trial-Regular.otf`
  — just rename them by stripping `-Trial-` so they match the list above.
- For best web performance, run a one-time `.otf → .woff2` conversion later
  (e.g. via [`fonttools`](https://github.com/fonttools/fonttools) or
  [transfonter.org](https://transfonter.org/)) and switch the extensions —
  woff2 is ~30% smaller and decodes faster.

## Why `.otf` works fine

Next.js inlines and self-hosts whatever font you point it at, generates
range-subset CSS, and applies its standard font-display strategy. Browsers
parse `.otf` natively — only meaningful difference vs `.woff2` is file size
and a slightly slower decode. Fine for development and small-traffic
production sites.

## License

Glancyr is a commercial typeface by Pangram Pangram Foundry —
<https://pangrampangram.com/products/glancyr>.
