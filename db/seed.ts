import { Clients, db } from 'astro:db';

export default async function () {
	await db.insert(Clients).values([
		{ id: 1, name: "Diana", age: 36, isActive: true },
		{ id: 2, name: "Julián", age: 35, isActive: true },
		{ id: 3, name: "Tibo", age: 11, isActive: true },
		{ id: 4, name: "Mila", age: 8, isActive: true },
		{ id: 5, name: "Rain", age: 2, isActive: true },
		{ id: 5, name: "Test", age: 99, isActive: false },
	]);

	console.log('executed')
}
