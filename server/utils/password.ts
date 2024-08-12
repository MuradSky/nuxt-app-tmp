import bcrypt from 'bcryptjs'

export const verifyPassword = async (password: string, hash: string) => {
	const compare = await bcrypt.compare(password, hash)
	if (!compare) {
		throw createError({ status: 400, message: 'Пароль не совпадает' })
	}
	return compare
}