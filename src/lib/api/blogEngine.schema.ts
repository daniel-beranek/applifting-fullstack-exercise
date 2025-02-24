import { z, ZodSchema } from 'zod'

const articleListItemSchema = z.object({
  articleId: z.string().uuid(),
  title: z.string(),
  perex: z.string(),
  imageId: z.string().uuid(),
  createdAt: z.string().datetime(),
  lastUpdatedAt: z.string().datetime(),
})

export const invalidResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
})
export type InvalidResponse = z.infer<typeof invalidResponseSchema>

export const commentDetailSchema = z.object({
  articleId: z.string().uuid(),
  author: z.string(),
  content: z.string(),
  commentId: z.string().uuid(),
  postedAt: z.string().datetime(),
  score: z.number(),
})
export type CommentDetail = z.infer<typeof commentDetailSchema>

export const accessTokenDetailSchema = z.object({
  access_token: z.string().uuid(),
  expires_in: z.number(),
  token_type: z.string(),
})
export type AccessTokenDetail = z.infer<typeof accessTokenDetailSchema>

export const articleDetailSchema = articleListItemSchema.and(
  z.object({
    content: z.string(),
    comments: z.array(commentDetailSchema),
  })
)
export type ArticleDetail = z.infer<typeof articleDetailSchema>

export const articleListSchema = z.object({
  pagination: z.object({
    offset: z.number(),
    limit: z.number(),
    total: z.number(),
  }),
  items: z.array(articleListItemSchema),
})
export type ArticleList = z.infer<typeof articleListSchema>

//TODO
// export const imageFileSchema =

export const imageInfoSchema = z.array(
  z.object({
    imageId: z.string().uuid(),
    name: z.string(),
  })
)
export type ImageInfo = z.infer<typeof imageInfoSchema>

export const validateZod = ({
  data,
  schema,
}: {
  data: unknown
  schema: ZodSchema | undefined
}) => {
  if (!schema) return
  return schema.safeParse(data)
}
