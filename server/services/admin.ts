import {admin} from "~/server/models/admin";
import {verifyPassword} from "~/server/utils/password";

interface Admin {
	email: string;
	password: string;
}

export const loginAdmin = async (data: Admin) => {
	if (data.email !== admin.email) {
		throw createError({ status: 400, message: 'Пользователь не найден' })
	}
	const checkPassword = await verifyPassword(data.password, admin.password)
	if (!checkPassword) {
		throw createError({ status: 400, message: 'Пароль неверный' })
	}
	return admin
}