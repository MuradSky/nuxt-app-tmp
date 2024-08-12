import {EventHandlerRequest, H3Event} from "h3";
import {verifyToken} from "~/server/utils/session";
export const checkAuth = async (event: H3Event<EventHandlerRequest>) => {
	const db = useDatabase()
	const headers = getHeaders(event)
	const refreshToken = headers.authorization?.split(' ')[1] || ''
	if (!refreshToken) throw createError({ status: 401, message: 'Token not found' })
	const { rows: dbToken} = await db.sql`SELECT * FROM refreshTokens WHERE token = ${refreshToken}`
	const admin = await verifyToken(refreshToken)
	if (dbToken?.length === 0 || !admin) throw createError({ status: 401, message: 'Unauthorized' })
	return {
		token: refreshToken || '',
		admin
	}
}