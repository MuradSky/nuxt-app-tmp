import {checkAuth} from "~/server/utils/checkAuth";

export default defineEventHandler(async (event) => {
	await checkAuth(event)
	const db = useDatabase()

	const { rows: apps }: any = await db.sql`SELECT * FROM applications`

	const applications = {
		name: 'Заявки',
		count: apps.length,
		path: '/admin/applications',
	}

	event.context?.appSocket.emit('appsCount', apps?.length)

	return [applications]
})