import Markdown from 'react-markdown';

export const SearchArticle = ({ article }: Props) => (
  <a href={article.slug}>
    <Markdown>{article.data.title}</Markdown>
  </a>
);

interface Props {
  article: any;
  authors: any;
}
