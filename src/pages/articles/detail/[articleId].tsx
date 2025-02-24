import { GetStaticPaths, GetStaticProps } from 'next'
import blogEngineInstance from '@components/lib/api/blogEngine.instance'
import {
  ArticleDetail,
  articleDetailSchema,
  ArticleList,
  articleListSchema,
} from '@components/lib/api/blogEngine.schema'

export const getStaticPaths: GetStaticPaths<{
  articleId: string
}> = async () => {
  const res = await blogEngineInstance.request<ArticleList>({
    url: 'articles',
    method: 'GET',
    zodSchema: articleListSchema,
  })
  const { items } = res.data

  const paths = items.map<{ params: { articleId: string } }>((item) => ({
    params: {
      articleId: item.articleId,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  ArticleDetail,
  { articleId: string }
> = async (context) => {
  const res = await blogEngineInstance.request<ArticleDetail>({
    url: `articles/${context.params?.articleId}`,
    method: 'GET',
    zodSchema: articleDetailSchema,
  })
  return { props: res.data }
}

const ArticleDetailPage = (props: ArticleDetail) => {
  return (
    <div>
      <h1>01-2 Article Detail</h1>
      <hr />
      <p>{JSON.stringify(props, null, 2)}</p>
    </div>
  )
}
export default ArticleDetailPage
