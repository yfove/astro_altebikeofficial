# Astro Landing Page

[![Built with Astro](https://astro.badg.es/v1/built-with-astro.svg)](https://astro.build)

> An Astro + Tailwind CSS example/template for landing pages.

## Features

- 💨 Tailwind CSS for styling
- 🎨 Themeable
  - CSS variables are defined in `src/styles/theme.css` and mapped to Tailwind classes (`tailwind.config.cjs`)
- 🌙 Dark mode
- 📱 Responsive (layout, images, typography)
- ♿ Accessible (as measured by https://web.dev/measure/)
- 🔎 SEO-enabled (as measured by https://web.dev/measure/)
- 🔗 Open Graph tags for social media sharing
- 💅 [Prettier](https://prettier.io/) setup for both [Astro](https://github.com/withastro/prettier-plugin-astro) and [Tailwind](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

## Commands

| Command                | Action                                            |
| :--------------------- | :------------------------------------------------ |
| `npm install`          | Install dependencies                              |
| `npm run dev`          | Start local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`           |
| `npm run preview`      | Preview your build locally, before deploying      |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check`  |
| `npm run astro --help` | Get help using the Astro CLI                      |
| `npm run format`       | Format code with [Prettier](https://prettier.io/) |
| `npm run clean`        | Remove `node_modules` and build output            |

## Credits

- astronaut image
  - source: https://github.com/withastro/astro-og-image; note: this repo is not available anymore
- moon image
  - source: https://unsplash.com/@nasa
- other than that, a lot of material (showcase data, copy) was taken from official Astro sources, in particular https://astro.build/blog/introducing-astro/ and https://github.com/withastro/astro.build

## Hydration

- client:load -> loads immediately
- client:idle -> wait until browser is chilling
- client:visible -> wait until component is visible to viewport

## Limitation

no possible to do client side routing
does not work like single page application

## Responsive Design

sm 640px @media (min-width: 640px) { ... }
md 768px @media (min-width: 768px) { ... }
lg 1024px @media (min-width: 1024px) { ... }
xl 1280px @media (min-width: 1280px) { ... }
2xl 1536px @media (min-width: 1536px) { ... }

## v.4.6.2
### image processing 
import and use Astro's built in <Image /> component for optimized images in webp and svg using astro:assets 

``` js
---
// import the Image component and the image
import { Image } from 'astro:assets';
import myImage from '../assets/my_image.png'; // Image is 1600x900
---

<!-- `alt` is mandatory on the Image component -->
<Image src={myImage} alt="A description of my image." />

```

## astro db
astro db login # Follow prompts, login with Github

astro db link # Again, follow prompts, create a new project or link local db to an existing one

astro db push # Tell the remote DB what you want it to look like

astro db execute db/seed.ts --remote # "db/seed.ts" here is just a path to the file where your seed data is. 
