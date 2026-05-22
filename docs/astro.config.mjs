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
        Pagination: './src/components/ChameleonPagination.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      sidebar: [
        {
          label: 'Start',
          items: [
            { label: 'Getting Started', link: '/getting-started/' },
          ],
        },
        {
          label: 'Core Features',
          items: [
            { label: 'Rules', link: '/rules/' },
            { label: 'Palettes', link: '/palettes/' },
            { label: 'Popup Controls', link: '/popup/' },
          ],
        },
        {
          label: 'Examples',
          items: [
            { label: 'CSS Recipes', link: '/css-recipes/' },
          ],
        },
        {
          label: 'Help',
          items: [
            { label: 'Troubleshooting', link: '/troubleshooting/' },
            { label: 'Privacy and Storage', link: '/privacy-and-storage/' },
          ],
        },
      ],
    }),
  ],
});
