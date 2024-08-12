export default defineEventHandler(async (event) => {
	const db = useDatabase()
	const body = await readBody(event)
	db.sql`
		INSERT INTO applications (username, message, email, is_view)
		VALUES (${body.username}, ${body.message}, ${body.email}, 0)
	`
	const { rows } = await db.sql`SELECT * FROM applications ORDER BY id DESC`

	event.context?.appSocket.emit('applications', {
		title: 'Заявки',
		data: rows
	})

	event.context?.appSocket.emit('appsCount', rows?.length)

	return { message: 'success' }
})