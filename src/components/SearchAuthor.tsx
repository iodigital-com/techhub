export const SearchAuthor = ({ author }: Props) => (
  <a href={`/authors/${author.slug}`}>{author.data.name}</a>
);

interface Props {
  author: any;
}
