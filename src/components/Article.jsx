import ContributorsGrid from './ContributorsGrid';

function Article({ article, authors }) {
  const url = '/articles/' + article.slug + '/';

  return (
    <div className="grid grid-cols-12 my-10 bg-slate-200 p-5 rounded-lg">
      <header className="col-span-5 col-start-2 content-start">
        <ContributorsGrid contributors={authors} />
      </header>
      <article className="col-start-7 col-span-full flex gap-5 flex-col">
        <h1 className="text-xl">
          <a href={url}>{article.data.title}</a>
          {article.data.serie && <span className="text-sm text-slate-500"> SERIES</span>}
        </h1>

        <p className="text-base">{article.data.summary}</p>

        <a href={url} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          Read more
        </a>
      </article>
    </div>
  );
}

export default Article;
