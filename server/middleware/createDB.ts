export default defineEventHandler(async ()=> {
	const db = useDatabase();
	try {
		await db.sql`SELECT * FROM refreshTokens`
	} catch (err) {
		await db.sql`CREATE TABLE IF NOT EXISTS refreshTokens ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "token" TEXT)`;
	}

	try {
		await db.sql`SELECT * FROM applications`
	} catch (err) {
		await db.sql`CREATE TABLE applications ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "username" TEXT, "message" TEXT, "email" TEXT, "is_view" NUMERIC)`;
	}
})