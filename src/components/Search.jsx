import Fuse from 'fuse.js';
import { useState } from 'react';
import { Image } from "astro:assets";


// Configs fuse.js
// https://fusejs.io/api/options.html
const authorsSearchOptions = {
    keys: ['data.name'],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
};

const articlesSearchOptions = {
    keys: ['data.title', 'data.summary', 'data.authors'],
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

    console.log(foundAuthors);
    console.log(foundArticles);

    function handleOnSearch({ target = {} }) {
        const { value } = target;
        setQuery(value);
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
                            <div className="flex flex-grow flex-col justify-end">
                                <div className="mt-2 mb-3 flex items-center text-lg">
                                    <div className="flex-0 relative mr-3 inline-block h-10 w-10 overflow-hidden rounded-full">
                                        <img src={post.data.avatar.src} alt={"avatar " + post.data.name} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            <a
                                                className="text-lg text-blue-700 hover:text-blue-900 hover:underline underline-offset-2"
                                                href={`/${post.url}`}
                                            >
                                                {post.data.name}
                                            </a>
                                        </p>
                                        <p className="text-sm text-gray-800">{post.data.occupation}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}

                {foundArticles &&
                    foundArticles.map((post) => (
                        <li className="py-2">
                            <div className="flex flex-grow flex-col justify-end">
                                <div className="mt-2 mb-3 flex items-center text-lg">
                                    <div className="flex-0 flex-shrink-0 relative mr-3 inline-block h-10 w-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" alt="icon blog"><path fill="currentColor" d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32m0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32m-96 16c0-26.5-21.5-48-48-48S0 117.5 0 144v224c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144h-16v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48z"/></svg>                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            <a
                                                className="text-lg text-blue-700 hover:text-blue-900 hover:underline underline-offset-2"
                                                href={`/${post.url}`}
                                            >
                                                {post.data.title}
                                            </a>
                                        </p>
                                        <p className="text-sm text-gray-800">{post.data.summary}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
            </ul>
        </div >
    );
}

export default Search;