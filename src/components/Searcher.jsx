import Fuse from "fuse.js";
import { useState } from "react";

// Configs fuse.js
// https://fusejs.io/api/options.html
const options = {
  keys: ["frontmatter.title", "frontmatter.description", "frontmatter.slug"],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.5,
};

function Search({ searchList }) {
  // User's input
  const [query, setQuery] = useState("");

  const fuse = new Fuse(searchList, options);

  // Set a limit to the posts: 5
  const posts = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 5);

  function handleOnSearch({ target = {} }) {
    const { value } = target;
    setQuery(value);
  }

  return (
    <div class="">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative ">
        <div className="absolute m-3 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="darkgray"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx={10} cy={10} r={7}></circle>
            <line x1={21} y1={21} x2={15} y2={15}></line>
          </svg>
        </div>
        <div class="max-md:flex max-md:justify-center">
        <input
          type="text"
          id="search"
          value={query}
          onChange={handleOnSearch}
          class="block lg:w-3/4 p-2 m-4 pl-10 text-sm 
                text-gray-400 
                border border-gray-800
                rounded-lg bg-black
                focus:outline-none
                focus:ring-gray-700
                focus:border-gray-700
                max-sm:w-full"
          placeholder="Search for anything..."
        />
</div>
      </div>

      {query.length > 1 && (
        <div className="m-4 text-gray-400">
          Found {posts.length} {posts.length === 1 ? "result" : "results"} for '
          {query}'
        </div>
      )}

      <ul className="list-none m-4">
        {posts &&
          posts.map((post) => (
            <li className="py-2">
              <a className="text-lg text-indigo-400 hover:text-indigo-500 hover:underline underline-offset-2" href={`/post/${post.frontmatter.slug}`}>{post.frontmatter.title}</a>
              <p className="text-sm text-gray-400">{post.frontmatter.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Search;

