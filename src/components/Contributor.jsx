// todo: use proper type of the contributor
const Contributor = ({ contributor }) => {
  return (
    <a
      href={`/authors/${contributor.slug}`}
      className={`flex flex-col items-center text-center hover:text-io_blue-700`}
    >
      <div className="flex-0 md:h-34 md:w-34 relative h-28 w-28 overflow-hidden rounded-full border-4 border-white md:mb-2 lg:h-40 lg:w-40 xl:h-44 xl:w-44">
        <img
          src={contributor.data.avatar.src}
          width={200}
          height={200}
          alt={`Avatar of ${contributor.name}`}
          object-fit="cover"
          className="rounded-full"
        />
      </div>
      <p>{contributor.data.name}</p>
    </a>
  )
}

export default Contributor
