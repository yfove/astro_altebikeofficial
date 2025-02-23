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
                bg-zinc-950
                p-2 pl-4
                text-gray-400 text-sm
                focus:border-gray-700
                focus:outline-none
                focus:ring-gray-700
                max-sm:w-full
                lg:w-1/2"
            placeholder=" &#x1F50E;&#xFE0E; Search for anything..."
          />
        </div>
      </div>

      {query.length > 1 && (
        <div className="m-4 text-center text-gray-400">
          Found {posts.length} {posts.length === 1 ? "result" : "results"} for '
          {query}'
        </div>
      )}

      <ul className="m-4 list-none">
        {posts &&
          posts.map((post) => (
            <li className="py-2" key={post.frontmatter.slug}>
              <a
                className="text-gray-200 underline-offset-2 text-lg hover:text-gray-500 hover:underline"
                href={`/${
                  post.frontmatter.type && post.frontmatter.slug
                    ? `${post.frontmatter.type}/${post.frontmatter.slug}`
                    : `post/${post.frontmatter.slug}`
                }`}
              >
                <div className="mx-auto max-w-[50%] text-left">
                  {" "}
                  {/* 50% width, center, text left aligned */}
                  <div className="flex items-center">
                    {/* Add image */}
                    {post.frontmatter.image && (
                      <img
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        className="mr-4 h-16 w-16 object-cover"
                      />
                    )}
                    <div>
                      <h2 className="font-semibold">
                        {post.frontmatter.title}
                      </h2>{" "}
                      {/* Title aligned to left */}
                      <p className="text-gray-400 text-sm">
                        {post.frontmatter.description}
                      </p>{" "}
                      {/* Description aligned to left */}
                      <p className="text-gray-400 text-sm">
                        Published {post.frontmatter.pubDate}
                      </p>{" "}
                      {/* Published date aligned to left */}
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Search;
