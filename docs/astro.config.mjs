import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: 'Chameleon Docs',
      customCss: ['./src/styles/global.css', './src/styles/theme.css'],
      components: {
        Hero: './src/components/ChameleonHero.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      sidebar: [
        { label: 'Getting Started', link: '/getting-started/' },
      ],
    }),
  ],
});
