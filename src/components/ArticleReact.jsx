import { Image } from "astro:assets";
import { getEntries} from "astro:content";
import { useEffect, useState } from "react";

function ArticleReact({ article, authors }) {

  const url = '/articles/' + article.slug + '/';

  return (
    <div className="grid grid-cols-12 my-10 bg-slate-200 p-5 rounded-lg">
      <header className="col-span-5">
        <ul className="flex gap-10 items-center">
          {
            authors.map(({ data }) => (
              <li className="flex gap-2 flex-col items-center">
                {data.avatar && (
                  <img
                    src={data.avatar.src}
                    alt={data.name}
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                )}
                <h2>{data.name}</h2>
              </li>
            ))
          }
        </ul>
      </header>
      <article className="col-start-7 col-span-full flex gap-5 flex-col">
        <h1 className="text-xl">
          <a href={url}>
            {article.data.title}
          </a>
          {article.data.serie && <span class="text-sm text-slate-500"> SERIES</span>}
        </h1>

        <p className="text-base">{article.data.summary}</p>
        
        <a href={url} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read more</a>

      </article>
    </div>);
}

export default ArticleReact;
