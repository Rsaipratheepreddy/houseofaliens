# Image Generation Prompt Manifest

> All prompts target a **dark, futuristic streetwear** aesthetic — equal parts
> Veirdo Supreme Edition, Bluorng, A-COLD-WALL\*, and Rick Owens. Cinematic
> editorial mood. Heavy contrast, deep blacks, occasional alien-green or
> cyan rim light. Models read as confident, cool, slightly otherworldly.
>
> **Recommended models**: Midjourney v6.1 (best for cinematic fashion),
> Flux 1.1 Pro (best for product on figure + lighting realism),
> SDXL with `juggernaut` / `realvisxl` checkpoints.
>
> **Conventions used in every prompt below**:
> - end with `--style raw --ar X:Y --v 6.1` for Midjourney
> - for Flux/SDXL strip the trailing flags
> - keep negative prompts: `cartoon, anime, illustration, 3d render, plastic skin, watermark, text, logo, deformed hands, blurry, low quality`
>
> **File-path convention** — drop the generated images into `public/`
> at the path each section calls out, then update `data/products.ts`.

---

## 1 · Hero — landing page (full-bleed)

Three variants for a slow crossfade carousel. All `--ar 21:9` (cinematic).

### `public/hero/01-orbit.jpg`

```
A confident model standing in an empty concrete bunker lit only by a single
overhead green LED, wearing an oversized boxy heavyweight black hoodie with
reflective alien glyph on chest, hands in pockets, dramatic chiaroscuro,
volumetric haze, atmospheric dust particles, 35mm film grain, deep blacks,
single neon-green rim light from above, editorial fashion photography,
shot on Phase One, shallow depth of field, hero composition with negative
space on the right for typography, color palette: void black #050507,
alien green #b6ff3c rim, cool ash grey midtones --style raw --ar 21:9 --v 6.1
```

### `public/hero/02-aurora.jpg`

```
Wide cinematic shot of a model from the back walking across a dystopian
salt flat at dusk, wearing wide-leg cargo pants in iridescent ripstop nylon
that shifts cyan-to-violet, distant retrofuturist monolith silhouette on
horizon, sky gradient from deep void blue to plasma violet, atmospheric haze,
backlit by twin suns, dust kicked up at feet, editorial fashion campaign,
shot on Mamiya 7, --ar 21:9 --style raw --v 6.1
```

### `public/hero/03-flux.jpg`

```
Close-up portrait of a model lit by a flickering CRT television in a dark
warehouse, wearing a satin-lined cropped bomber jacket with embroidered
alien sigil and metallic numbered hem-plate, half face in shadow half lit
in cold blue from the screen, water droplets on jacket, defiant expression,
extreme contrast, Wong Kar-wai influenced color, editorial fashion,
--ar 21:9 --style raw --v 6.1
```

---

## 2 · Product photography

Each product gets **3 images**: front on figure, back/detail on figure,
and flat-lay studio still. Drop them in `public/products/<slug>/01.jpg`,
`02.jpg`, `03.jpg`. **Aspect ratio for all product shots: `--ar 4:5`** — this
matches the grid card aspect.

### Master template — figure shots

```
Editorial fashion shot of a [GENDER] model wearing [PRODUCT DESCRIPTION],
shot on a seamless [BACKDROP] backdrop, [LIGHTING] lighting, model in
confident [POSE] pose, full-frame mirrorless 85mm lens, shallow depth of
field, premium streetwear lookbook, color palette: deep black #050507,
alien green #b6ff3c, cool ash grey, --ar 4:5 --style raw --v 6.1
```

### Master template — flat-lay still

```
Top-down studio still life of [PRODUCT], laid flat on a textured concrete
surface with subtle directional rim light, single hard shadow, premium
streetwear product photography, magazine quality, --ar 4:5 --style raw --v 6.1
```

### `public/products/orbit-hoodie-void/`

`01.jpg` — figure front:
```
Male model 6'1" wearing an oversized 480gsm loopback cotton hoodie in
deep void black, boxy fit, kangaroo pocket, hood up casting partial face
shadow, reflective alien-glyph chest print picking up the studio strobe,
arms relaxed at sides, against deep charcoal seamless backdrop, single
overhead key light + cyan kicker from camera-left, editorial streetwear
lookbook, --ar 4:5 --style raw --v 6.1
```
`02.jpg` — figure back/detail:
```
Three-quarter back view of the same model, hood down, showing the bonded
shoulder seams and reflective glyph at the back yoke catching the cyan
rim light, hands tucked in front pocket from behind, --ar 4:5 --style raw
```
`03.jpg` — flat-lay:
```
Top-down studio still life of the void-black oversized hoodie folded
asymmetrically on a textured raw-concrete surface, alien-green care label
visible, single hard directional shadow, --ar 4:5 --style raw
```

### `public/products/aurora-cargo-pant/`

`01.jpg`:
```
Male model wearing wide-leg cargo pants in iridescent cyan-to-violet
shifting ripstop nylon, bellows pockets fastened, drawcord cuffs, shot
mid-stride at golden hour against a brutalist concrete wall, motion blur
in the fabric, single warm key + cool fill, editorial street fashion
campaign, --ar 4:5 --style raw --v 6.1
```
`02.jpg`:
```
Detail shot of the cargo pant pocket bellows and cuff drawcord, model
crouched, alien-green stitching visible, sharp focus on hardware, blurred
warm bokeh background, --ar 4:5 --style raw
```
`03.jpg`:
```
Flat-lay of the iridescent cargo pant on raw concrete, the iridescent
fabric catching multiple highlights showing the colour shift, --ar 4:5
```

### `public/products/beacon-tee/`

`01.jpg`:
```
Female model wearing an oversized boxy heavyweight cotton t-shirt in bone
white with dropped shoulder seams, shot against a black void seamless,
single Rembrandt key light, glow-stitched House of Aliens signal logo
visible at the back yoke caught in grazing light, defiant expression,
editorial portrait, --ar 4:5 --style raw --v 6.1
```
`02.jpg`:
```
Three-quarter rear of same model showing the glow-stitched alien beacon
logo on back yoke under UV-tinged backlight that makes the stitch glow
faintly green, --ar 4:5 --style raw
```
`03.jpg`:
```
Flat-lay of the boxy bone-white tee folded with alien-green woven
neck-label visible, on textured concrete, --ar 4:5 --style raw
```

### `public/products/flux-bomber/`

`01.jpg`:
```
Male model wearing a cropped crinkle-nylon bomber jacket in plasma black
with embroidered metallic alien sigil at chest and a numbered metal plate
at the hem, lit by a flickering CRT screen offscreen, half face in deep
shadow, water droplets on the satin lining catching cyan light,
Wong-Kar-wai cinematic mood, --ar 4:5 --style raw --v 6.1
```
`02.jpg`:
```
Macro detail of the embroidered alien sigil on the chest and the
hand-numbered metal plate at the hem reading "002 / 200", thread texture
visible, --ar 4:5 --style raw
```
`03.jpg`:
```
Flat-lay of the cropped bomber on raw concrete with the satin lining
folded out exposing alien-green inner label, --ar 4:5 --style raw
```

### `public/products/gravity-mini-dress/`

`01.jpg`:
```
Female model wearing a sculpted black stretch-jersey mini dress with
asymmetric hem and laser-etched alien lattice down the side seam, lit
by a single hard top-down key with cool fill, posing confidently against
a textured concrete column, single shadow, editorial fashion lookbook,
--ar 4:5 --style raw --v 6.1
```
`02.jpg`:
```
Detail of the laser-etched alien lattice pattern running down the side
seam of the dress, sharp directional light, --ar 4:5 --style raw
```
`03.jpg`:
```
Flat-lay of the mini dress on raw concrete showing the asymmetric hem
arrangement, --ar 4:5 --style raw
```

### `public/products/signal-cap/`

`01.jpg`:
```
Cool model wearing a six-panel cap in void black with reflective brim
trim and embroidered alien icon at front, head tilted slightly down,
shot in moody overhead key with the brim casting an exact shadow line
across the eyes, editorial portrait, --ar 4:5 --style raw --v 6.1
```
`02.jpg`:
```
Three-quarter side of cap showing the metal adjustable strap closure
at the back and the alien-green underbrim, --ar 4:5 --style raw
```
`03.jpg`:
```
Flat-lay of the void-black six-panel cap on raw concrete, the embroidered
alien icon centered, single hard shadow, --ar 4:5 --style raw
```

### `public/products/protocol-overshirt/`

`01.jpg`:
```
Male model wearing a relaxed-fit lichen-green 12oz cotton-twill overshirt
with snap closures and chest flap pockets, shot at golden hour against
a brutalist wall, sun-flare lens, editorial streetwear, --ar 4:5
--style raw --v 6.1
```
`02.jpg`:
```
Three-quarter rear of model showing the storm placket and the alien
beacon embroidered at upper back, --ar 4:5 --style raw
```
`03.jpg`:
```
Flat-lay of the lichen overshirt folded on concrete with the custom
alien-shaped snap hardware visible, --ar 4:5 --style raw
```

### `public/products/nebula-knit/`

`01.jpg`:
```
Female model wearing a jacquard-knit crew sweater with cosmic gradient
that shifts from cyan to plasma violet, ribbed cuffs, cropped fit, shot
against a deep black backdrop with a soft fog, single warm key + cool
rim light, editorial campaign, --ar 4:5 --style raw --v 6.1
```
`02.jpg`:
```
Macro of the jacquard knit weave showing the gradient transition from
cyan to violet, sharp focus on yarn texture, --ar 4:5 --style raw
```
`03.jpg`:
```
Flat-lay of the nebula knit folded on raw concrete with the cosmic
gradient pattern fully visible, --ar 4:5 --style raw
```

---

## 3 · Category mood imagery

Each collection page gets a moody hero. **`--ar 21:9`**, used as a wide
banner. Drop in `public/categories/<slug>.jpg`.

### `public/categories/mens.jpg`
```
Atmospheric wide shot of three male models in head-to-toe House of Aliens
fits walking in formation across a wet concrete plaza at night, neon
green sign reflection underfoot, soft rain, dramatic backlighting, telephoto
compression, cinematic streetwear campaign, --ar 21:9 --style raw --v 6.1
```

### `public/categories/womens.jpg`
```
Atmospheric wide shot of two female models posing on the steps of a
brutalist concrete monument at dusk, wearing oversized House of Aliens
sets, plasma-violet gradient sky, single backlight rimming silhouettes,
volumetric mist, editorial fashion campaign, --ar 21:9 --style raw --v 6.1
```

### `public/categories/limited-edition.jpg`
```
Single hero model spotlit on a dark stage with a crinkle-nylon bomber
jacket numbered 042/200, holding the metal numbered plate up to camera,
extreme key light + dark falloff, theatrical, --ar 21:9 --style raw --v 6.1
```

### `public/categories/new-arrivals.jpg`
```
Top-down birds-eye flat-lay of a curated selection of new House of Aliens
pieces — hoodie, cargo, cap, jacket — laid on textured raw concrete in a
grid, single hard directional shadow, editorial product still life,
--ar 21:9 --style raw --v 6.1
```

### `public/categories/sale.jpg`
```
A single mannequin draped under translucent plastic sheeting in a back-of-
house warehouse setting, pendant lights, lonely mood, editorial,
--ar 21:9 --style raw --v 6.1
```

---

## 4 · Lookbook / editorial sticky-scroll

Six tall portrait shots used in the home-page lookbook section. Each
**`--ar 4:5`**. Drop in `public/lookbook/01.jpg` … `06.jpg`.

```
01: Solo model in a desert salt flat, wide-leg cargo + cropped bomber, low
sun, dust kicked up, anamorphic flare, --ar 4:5 --style raw --v 6.1

02: Two models embracing in a neon-green-lit subway tunnel at 3am, both in
oversized hoodies, cinematic, --ar 4:5 --style raw

03: Solo model walking up a brutalist concrete staircase, shot from below,
backlit silhouette, --ar 4:5 --style raw

04: Single hand close-up holding a numbered metal hem-plate, shallow DoF,
moody product macro, --ar 4:5 --style raw

05: Solo model leaning against a dusty mirror reflecting twin moons, cyan
rim light, --ar 4:5 --style raw

06: Group portrait of four models in head-to-toe House of Aliens against a
single hard fluorescent wash, deadpan expressions, deadpan editorial,
--ar 4:5 --style raw
```

---

## 5 · Brand / marketing assets

### `public/brand/og.jpg` — Open Graph + Twitter

```
Wide brand campaign image: cinematic group shot of four models in head-
to-toe House of Aliens fits standing under a single beam of green light
in a fog-filled concrete bunker, "HOUSE OF ALIENS" wordmark to be added
in post, editorial fashion, --ar 1.91:1 --style raw --v 6.1
```

### `public/brand/manifesto-bg.jpg` — manifesto section background

```
Macro abstract shot of iridescent oil-on-water swirling in cyan, plasma
violet, alien green; deep black surroundings; high contrast; abstract
texture for typography overlay, --ar 21:9 --style raw --v 6.1
```

---

## 6 · UFO 3D asset (optional upgrade)

If you want the UFO companion to be a real PNG sprite instead of an inline
SVG, generate a single 4-frame sprite-sheet:

```
Hyperrealistic flying saucer sprite, brushed-metal underbody with five
glowing alien-green underlights, transparent crystal cyan dome with cool
blue interior glow, isometric three-quarter view, rendered with Octane,
transparent background PNG, four states stacked: idle, banking-left,
banking-right, beam-active, --ar 4:1 --style raw --v 6.1
```

Drop in `public/ufo/saucer.png` and swap the inline SVG in `UfoCompanion.tsx`.

---

## File checklist

When all assets are dropped in, the tree should look like:

```
public/
├── hero/
│   ├── 01-orbit.jpg
│   ├── 02-aurora.jpg
│   └── 03-flux.jpg
├── categories/
│   ├── new-arrivals.jpg
│   ├── mens.jpg
│   ├── womens.jpg
│   ├── limited-edition.jpg
│   └── sale.jpg
├── products/
│   ├── orbit-hoodie-void/{01,02,03}.jpg
│   ├── aurora-cargo-pant/{01,02,03}.jpg
│   ├── beacon-tee/{01,02,03}.jpg
│   ├── flux-bomber/{01,02,03}.jpg
│   ├── gravity-mini-dress/{01,02,03}.jpg
│   ├── signal-cap/{01,02,03}.jpg
│   ├── protocol-overshirt/{01,02,03}.jpg
│   └── nebula-knit/{01,02,03}.jpg
├── lookbook/01..06.jpg
├── brand/og.jpg
└── brand/manifesto-bg.jpg
```

The site references **all** of these paths already in `data/products.ts`,
`data/categories.ts`, `components/home/Hero.tsx`, and the lookbook section.
Drop the files in and the site goes live without any code edit.
