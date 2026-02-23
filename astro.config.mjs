// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://vision-products.app',
	integrations: [
		starlight({
			title: 'Vision Products',
			description: 'Apps and tools built for focus, productivity, and digital wellbeing.',
			components: {
				SiteTitle: './src/components/overrides/SiteTitle.astro',
				PageTitle: './src/components/overrides/PageTitle.astro',
				Search: './src/components/overrides/Search.astro',
				Footer: './src/components/overrides/Footer.astro',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/machina-gg' }
			],
			head: [
				// OGP 画像設定（TODO: Replace with actual brand image）
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: 'https://vision-products.app/og-image.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image',
						content: 'https://vision-products.app/og-image.png',
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
						{ label: 'プライバシーポリシー', slug: 'legal/privacy' },
						{ label: '利用規約', slug: 'legal/terms' },
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
