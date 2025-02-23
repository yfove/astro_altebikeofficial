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
        className="sr-only mb-2 font-medium text-gray-900 text-sm dark:text-white"
      >
        Search
      </label>
      <div className="relative ">
        <div class="max-md:flex max-md:justify-center">
          <input
            type="text"
            id="search"
            value={query}
            onChange={handleOnSearch}
            class="m-4 mx-auto block rounded-lg border border-gray-800 
                bg-black 
                p-2 pl-4
                text-gray-400 text-sm
                focus:border-gray-700
                focus:outline-none
                focus:ring-gray-700
                max-sm:w-full
                lg:w-1/2"
            placeholder="&#x1F50E;&#xFE0E; Search for anything..."
          />
        </div>
      </div>

      {query.length > 1 && (
        <div className="m-4 text-gray-400">
          Found {posts.length} {posts.length === 1 ? "result" : "results"} for '
          {query}'
        </div>
      )}

      <ul className="m-4 list-none">
        {posts &&
          posts.map((post) => (
            <li className="py-2">
              <a
                className="text-indigo-400 underline-offset-2 text-lg hover:text-indigo-500 hover:underline"
                href={`/post/${post.frontmatter.slug}`}
              >
                {post.frontmatter.title}
              </a>
              <p className="text-gray-400 text-sm">
                {post.frontmatter.description}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Search;
