import { useRouter } from 'next/router';

export default function ArticleDetailPage() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-4">
      <main>
        <h1>{router.query['article-id']}</h1>
      </main>
      <aside>
        <h2>Related articles</h2>
      </aside>
      <section>
        <h2>Comments</h2>
      </section>
    </div>
  );
}
