interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error(`Fail to fetch data: Status code ${res.status}`);
  return res.json();
}

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error(`Fail to fetch data: Status code ${res.status}`);
  return res.json();
}

export default async function Page() {
  const postsProm = getPosts();
  const usersProm = getUsers();

  // await for all promises

  const [posts, users]: [Post[], User[]] = await Promise.all([
    postsProm,
    usersProm,
  ]);

  return (
    <>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}
