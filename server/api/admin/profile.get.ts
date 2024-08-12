import {checkAuth} from "~/server/utils/checkAuth";

export default defineEventHandler(async (event) => {
	const { admin } = await checkAuth(event)
	return { admin }
})