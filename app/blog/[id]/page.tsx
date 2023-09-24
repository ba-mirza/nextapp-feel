import { Metadata } from "next";

async function getDataById(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  return await response.json();
}

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const postById = await getDataById(id);
  return {
    title: postById.title,
  };
}

export default async function Post({ params: { id } }: Props) {
  const postById = await getDataById(id);

  return (
    <>
      <h2>{postById.title}</h2>
      <p>{postById.body}</p>
    </>
  );
}
