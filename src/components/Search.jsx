import Fuse from 'fuse.js'
import { useState } from 'react'
import ArticleReact from './ArticleReact'
import AuthorReact from './AuthorReact'
import ContributorsGrid from './ContributorsGrid'

// Configs fuse.js
// https://fusejs.io/api/options.html
const authorsSearchOptions = {
  keys: ['data.name'],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.4,
}

const articlesSearchOptions = {
  keys: ['data.authors.slug', 'data.title', 'data.summary'],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.4,
}

function Search({ articles, authors }) {
  // User's input
  const [query, setQuery] = useState('')

  const fuseAuthors = new Fuse(authors, authorsSearchOptions)
  const fuseArticles = new Fuse(articles, articlesSearchOptions)

  // Set a limit to the posts: 5
  const foundAuthors = fuseAuthors
    .search(query)
    .map((result) => result.item)
    .slice(0, 5)

  const foundArticles = fuseArticles
    .search(query)
    .map((result) => result.item)
    .slice(0, 5)

  function handleOnSearch({ target = {} }) {
    const { value } = target
    setQuery(value)
  }

  function findArticleAuthors(article) {
    return article.data.authors.map((authorRef) => {
      return authors.find((author) => authorRef.slug === author.slug)
    })
  }

  return (
    <div>
      <label htmlFor="search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
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
          className="block w-full p-4 pl-10 text-sm 
                                    text-gray-900 
                                   border border-gray-300
                                   rounded-lg bg-gray-50
    
                                   focus:outline-none
                                   focus:ring-blue-500
                                   focus:border-blue-500"
          placeholder="Search for anything..."
        />
      </div>

      <ul className="list-none">
        <ContributorsGrid contributors={foundAuthors} />
        {/* {foundAuthors &&
          foundAuthors.map((author) => (
            <li className="py-2" key={author.slug}>
              <AuthorReact author={author} />
            </li>
          ))} */}

        {foundArticles &&
          foundArticles.map((article) => (
            <li className="py-2">
              <ArticleReact article={article} authors={findArticleAuthors(article)} />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Search
