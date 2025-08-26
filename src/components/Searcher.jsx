import Fuse from "fuse.js";
import { useState } from "react";

const options = {
  keys: ["frontmatter.title", "frontmatter.description", "frontmatter.slug"],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.5,
};

function Search({ searchList }) {
  const [query, setQuery] = useState("");

  const fuse = new Fuse(searchList, options);

  const posts = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 5);

  function handleOnSearch(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="search"
        value={query}
        onChange={handleOnSearch}
        placeholder="Search for anything..."
        className="w-full rounded-md border border-gray-800 bg-zinc-950 px-4 py-2 text-gray-400 text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700"
      />

      {query.length > 1 && (
        <div className="mt-3 mb-2 text-center text-gray-400 text-xs">
          Found {posts.length} {posts.length === 1 ? "result" : "results"} for '{query}'
        </div>
      )}

      <ul className="list-none space-y-3">
        {posts.map((post) => (
          <li key={post.frontmatter.slug}>
            <a
              href={`/${
                post.frontmatter.type && post.frontmatter.slug
                  ? `${post.frontmatter.type}/${post.frontmatter.slug}`
                  : `post/${post.frontmatter.slug}`
              }`}
              className="flex items-center gap-3 text-gray-200 hover:text-gray-400"
            >
              {post.frontmatter.image && (
                <img
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  className="h-12 w-12 flex-shrink-0 rounded-md object-cover"
                />
              )}
              <div>
                <h2 className="text-sm font-semibold">{post.frontmatter.title}</h2>
                <p className="text-xs text-gray-500 line-clamp-2">{post.frontmatter.description}</p>
                <p className="text-xs text-gray-600 mt-0.5">Published {post.frontmatter.pubDate}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
