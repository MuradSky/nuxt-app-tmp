// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: ['@nuxt/ui'],
	runtimeConfig: {
		tokenSecret: process.env.TOKEN_SECRET,
		tokenExpiration: process.env.TOKEN_EXPIRES,
		tokenRefresh: process.env.TOKEN_SECRET_REFRESH
	},
	nitro: {
		experimental: {
			database: true
		},
	},
	app: {
		// pageTransition: { name: 'page', mode: 'out-in' },
	}
})
