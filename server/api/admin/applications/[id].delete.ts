import {checkAuth} from "~/server/utils/checkAuth";

export default defineEventHandler(async (event) => {
	await checkAuth(event)
	const id = getRouterParam(event, 'id')
	const db = useDatabase()
	await db.sql`DELETE FROM applications WHERE id = ${id}`
	return { message: 'success' }
})