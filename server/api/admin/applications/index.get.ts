import {checkAuth} from "~/server/utils/checkAuth";

export default defineEventHandler(async (event) => {
	await checkAuth(event)
	const db = useDatabase()
	const { rows } = await db.sql`SELECT * FROM applications ORDER BY id DESC`

	return {
		title: 'Заявки',
		data: rows
	}
})