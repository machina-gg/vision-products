// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://machina-gg.github.io',
	base: '/vision-products',
	integrations: [
		starlight({
			title: 'machina.gg',
			description: 'Official products and documentation for machina.gg',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/machina-gg' }
			],
			head: [
				// OGP 画像設定（TODO: Replace with actual brand image）
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: 'https://machina-gg.github.io/vision-products/og-image.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image',
						content: 'https://machina-gg.github.io/vision-products/og-image.png',
					},
				},
			],
			sidebar: [
				{
					label: 'Products',
					items: [
						{ label: 'VisionFocus', slug: 'vision-focus' },
					],
				},
				{
					label: 'VisionFocus Documentation',
					autogenerate: { directory: 'docs/vision-focus' },
				},
				{
					label: 'Legal',
					items: [
						{ label: 'Privacy Policy', slug: 'legal/privacy' },
						{ label: 'Terms of Service', slug: 'legal/terms' },
					],
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
		}),
		sitemap(),
	],
});
