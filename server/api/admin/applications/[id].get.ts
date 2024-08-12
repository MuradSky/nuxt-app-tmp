import {verifyToken} from "~/server/utils/session";
import {checkAuth} from "~/server/utils/checkAuth";

export default defineEventHandler(async (event) => {
	await checkAuth(event)
	const id = getRouterParam(event, 'id')
	const db = useDatabase()

	const { rows }: any = await db.sql`SELECT * FROM applications WHERE id = ${id}`

	if (!rows[0].is_view) {
		db.sql`UPDATE applications SET is_view = 1 WHERE id = ${id}`
	}

	if (rows?.length === 0) {
		throw createError({ status: 404, message: 'Page not found' })
	}

	return { data: rows }
})