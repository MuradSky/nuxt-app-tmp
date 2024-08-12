import { loginAdmin } from "~/server/services/admin"
import {createToken} from "~/server/utils/session";

export default defineEventHandler(async (event) => {
	const db = useDatabase()
	const body = await readBody(event)
	const user = await loginAdmin(body)
	const token = await createToken(user)
	const tokenId = String(Math.round(Math.random() * 10_000));

	db.sql`INSERT INTO refreshTokens VALUES (${tokenId}, ${token.refreshToken})`

	setCookie(event, 'token', token.refreshToken)

	return {
		user: {
			id: user.id,
			email: user.email,
			role: 'admin'
		},
		token: token.refreshToken,
	}
})