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

export default async function Page() {
  const posts: Post[] = await getPosts();
  return (
    <>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}
