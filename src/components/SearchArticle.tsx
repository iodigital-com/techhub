export const SearchArticle = ({ article }: Props) => (
  <a href={`/articles/${article.slug}`}>{article.data.title}</a>
);

interface Props {
  article: any;
  authors: any;
}
