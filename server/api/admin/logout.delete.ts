import {checkAuth} from "~/server/utils/checkAuth";

export default defineEventHandler(async (event) => {
	const { token } = await checkAuth(event)
	const db = useDatabase();
	await db.sql`DELETE FROM refreshTokens WHERE token = ${token}`
	deleteCookie(event, 'token')
	return {
		message: 'success'
	}
})