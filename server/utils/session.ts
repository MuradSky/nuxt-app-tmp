import jwt from 'jsonwebtoken'
interface Admin {
	id: string;
	email: string;
	password: string;
}

export const createToken = async (admin: Admin) => {
	const config = useRuntimeConfig()
	// const accessToken = jwt.sign({
	// 	id: admin.id,
	// 	email: admin.email,
	// }, config.tokenSecret, {
	// 	expiresIn: config.tokenExpiration
	// })

	const refreshToken = jwt.sign({
		id: admin.id,
		email: admin.email
	}, config.tokenRefresh)

	return { refreshToken }
}

export const verifyToken = async (token: string) => {
	try {
		const config = useRuntimeConfig()
		return await jwt.verify(token, config.tokenRefresh)
	} catch (err) {
		throw createError({ status: 401, message: 'Token expired' })
	}
}