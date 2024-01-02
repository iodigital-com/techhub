import Fuse from 'fuse.js';
import { useState } from 'react';
import { Image } from "astro:assets";
import testAvatar from '../content/authors/avatars/dmitri-sirobokov.jpg';


// Configs fuse.js
// https://fusejs.io/api/options.html
const authorsSearchOptions = {
	keys: ['frontmatter.name'],
	includeMatches: true,
	minMatchCharLength: 2,
	threshold: 0.5,
};

const articlesSearchOptions = {
	keys: ['frontmatter.title', 'frontmatter.summary', 'frontmatter.authors'],
	includeMatches: true,
	minMatchCharLength: 2,
	threshold: 0.5,
};

function Search({ articles, authors }) {
	// User's input
	const [query, setQuery] = useState('');

	const fuseAuthors = new Fuse(authors, authorsSearchOptions);
	const fuseArticles = new Fuse(articles, articlesSearchOptions);

	// Set a limit to the posts: 5
    const foundAuthors = fuseAuthors
		.search(query)
		.map((result) => result.item)
		.slice(0, 5);

	const foundArticles = fuseArticles
		.search(query)
		.map((result) => result.item)
		.slice(0, 5);

	function handleOnSearch({ target = {} }) {
		const { value } = target;
		setQuery(value);
	}

    function getAvatarUrl(avatar) {
        const a = document.createElement('a');
        a.href = '../content/authors/';
        
        const resolveUrl = new URL(avatar, a.href);
        return resolveUrl.pathname;
    }

    return (
        <div>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
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
            {foundAuthors &&
                    foundAuthors.map((post) => (
                        <li className="py-2">
                            <a
                                className="text-lg text-blue-700 hover:text-blue-900 hover:underline underline-offset-2"
                                href={`/${post.url}`}
                            >
                                {post.frontmatter.name}
                                {/* <p>{getAvatarUrl(post.frontmatter.avatar)}</p> */}
                                {/* <Image src={testAvatar.src} alt='' width="50" height="50" /> */}
                                {/* <Image src={testAvatar} alt='akfjal' /> */}
                                {/* <Image src={getAvatarUrl(post.frontmatter.avatar)} /> */}
                            </a>
                            <p className="text-sm text-gray-800">{post.frontmatter.occupation}</p>
                        </li>
                    ))}

                {foundArticles &&
                    foundArticles.map((post) => (
                        <li className="py-2">
                            <a
                                className="text-lg text-blue-700 hover:text-blue-900 hover:underline underline-offset-2"
                                href={`/${post.url}`}
                            >
                                {post.frontmatter.title}
                            </a>
                            <p className="text-sm text-gray-800">{post.frontmatter.summary}</p>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Search;