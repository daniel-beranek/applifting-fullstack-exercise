import { GetStaticPaths, GetStaticProps } from 'next'
import blogEngineInstance from '@components/lib/api/blogEngine.instance'
import { useRouter } from 'next/router'
import {
  ArticleList,
  articleListSchema,
} from '@components/lib/api/blogEngine.schema'
import { getServerEnvVar } from '@components/lib/utils/getServerEnvVar'

export const getStaticPaths: GetStaticPaths<{
  pageNumber: string
}> = async () => {
  const res = await blogEngineInstance.request<ArticleList>({
    url: 'articles',
    method: 'GET',
    zodSchema: articleListSchema,
  })
  const { total } = res.data.pagination
  const articlesPerPage = Number(getServerEnvVar('ARTICLES_PER_PAGE'))
  const numberOfPages = Math.ceil(total / articlesPerPage)

  const paths: { params: { pageNumber: string } }[] = []

  for (let i = 1; i <= numberOfPages; i++) {
    paths.push({ params: { pageNumber: `${i}` } })
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  ArticleList,
  { pageNumber: string }
> = async (context) => {
  const articlesPerPage = Number(getServerEnvVar('ARTICLES_PER_PAGE'))
  const pageNo = Number(context.params?.pageNumber)
  const res = await blogEngineInstance.request({
    url: 'articles',
    method: 'GET',
    params: {
      limit: articlesPerPage,
      offset: (pageNo - 1) * articlesPerPage,
    },
    zodSchema: articleListSchema,
  })
  return { props: res.data }
}

const ArticlesPage = ({ pagination, items }: ArticleList) => {
  const router = useRouter()

  if (router.isFallback) return <div>fallback...</div>
  return (
    <div>
      <h1>01-1 Article List</h1>
      <hr />
      <p>{JSON.stringify(pagination, null, 2)}</p>
      <hr />
      <p>{JSON.stringify(items, null, 2)}</p>
    </div>
  )
}
export default ArticlesPage
