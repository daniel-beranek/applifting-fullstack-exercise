import { useRouter } from 'next/router';

export default function EditEditorPage() {
  const router = useRouter();
  return (
    <main>
      <form className="flex flex-col">
        <h1>Edit article</h1>
        <input className="border" value={router.query['article-id']} />
        <textarea className="border" />
      </form>
    </main>
  );
}
