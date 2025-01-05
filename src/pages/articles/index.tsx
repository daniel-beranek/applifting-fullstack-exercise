import { GetStaticProps } from 'next';
import axiosInstance from '@/lib/features/api/axiosInstance';

type Props = {
  articles: string;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await axiosInstance.get('/articles');
  return { props: { articles: JSON.stringify(res, null, 2) } };
};

export default function ArticlesPage({ articles }: Props) {
  return (
    <main>
      <h1>Recent articles</h1>
      <ul>
        <li>article 1</li>
        <li>article 2</li>
        <li>article 3</li>
        <li className="mx-auto w-1/2">{articles}</li>
      </ul>
    </main>
  );
}
