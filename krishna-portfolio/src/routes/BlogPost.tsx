import { useParams } from 'react-router-dom'
import { posts } from '../data/blog'
import ArticleView from '../features/blog/ArticleView'
import { usePageTitle } from '../hooks/usePageTitle'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  usePageTitle(post ? post.title : 'Article not found')
  if (!post) return <NotFound />
  return <ArticleView post={post} />
}
