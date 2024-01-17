import Fuse from 'fuse.js';
import { useCallback, useMemo, useState } from 'react';
import styles from './Search.module.scss';
import { clsx } from 'clsx';
import { type CollectionEntry } from 'astro:content';
import { SearchAuthor } from '@components/SearchAuthor.tsx';
import { SearchArticle } from '@components/SearchArticle.tsx';

const Search = ({ articles, authors }: SearchProps) => {
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState(false);

  const fuseAuthors = useMemo(
    () =>
      new Fuse(authors, {
        keys: ['data.name'],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.2,
      }),
    [authors]
  );

  const fuseArticles = useMemo(
    () =>
      new Fuse(articles, {
        keys: ['data.authors.slug', 'data.title', 'data.summary'],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.4,
      }),
    [articles]
  );

  const foundAuthors = useMemo(
    () =>
      fuseAuthors
        .search(query)
        .map((result) => result.item)
        .slice(0, 5),
    [query, fuseAuthors]
  );

  const foundArticles = useMemo(
    () =>
      fuseArticles
        .search(query)
        .map((result) => result.item)
        .slice(0, 5),
    [query, fuseArticles]
  );

  const handleOnSearch = useCallback((event: { target: { value: string } }) => {
    setQuery(event.target.value);
  }, []);

  const findArticleAuthors = useCallback(
    (article: CollectionEntry<'articles'>) =>
      article.data.authors.map((authorRef) =>
        authors.find((author) => authorRef.slug === author.slug)
      ),
    [authors]
  );

  const handleSearchFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setFocus(false);
  }, []);

  return (
    <>
      {focus && <div className={styles.searchOverlay} onClick={handleSearchBlur} />}
      <div
        className={clsx({
          [styles.searchInputFocus]: focus,
        })}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <circle cx={10} cy={10} r={7}></circle>
              <line x1={21} y1={21} x2={15} y2={15}></line>
            </svg>
          </div>
          <input
            type="text"
            id="search"
            value={query}
            onChange={handleOnSearch}
            onFocus={handleSearchFocus}
            className={styles.searchInput}
            placeholder="Search for anything..."
          />

          {focus && !!(foundAuthors?.length || foundArticles?.length) && (
            <ul className={styles.searchResults}>
              {foundAuthors?.map((author) => (
                <li key={author.slug}>
                  <SearchAuthor author={author} />
                </li>
              ))}
              {foundArticles?.map((article) => (
                <li key={article.slug}>
                  <SearchArticle article={article} authors={findArticleAuthors(article)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

interface SearchProps {
  articles: CollectionEntry<'articles'>[];
  authors: CollectionEntry<'authors'>[];
}

export default Search;
