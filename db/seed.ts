import { getCollection } from 'astro:content';
import { Clients, db, Posts } from 'astro:db';

export default async function () {
  await db.insert(Clients).values([
    { id: 1, name: 'Diana', age: 36, isActive: true },
    { id: 2, name: 'Julián', age: 35, isActive: true },
    { id: 3, name: 'Tibo', age: 11, isActive: true },
    { id: 4, name: 'Mila', age: 8, isActive: true },
    { id: 5, name: 'Rain', age: 2, isActive: true },
    { id: 6, name: 'Test', age: 99, isActive: false },
  ]);

  const posts = await getCollection('blog');

  await db.insert(Posts).values(
    posts.map((p) => ({
      id: p.id,
      title: p.data.title,
      likes: Math.round(Math.random() * 100),
    }))
  );

  console.log('executed');
}
