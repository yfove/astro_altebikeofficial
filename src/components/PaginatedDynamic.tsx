import { useState, useEffect, useMemo } from "react";

const PaginatedDynamic = ({ page, products }) => {
  // Total pages calculation
  const totalPages = Math.ceil(page.total / page.size);

  // Pagination links
  const firstPage = page.url.prev ? "/products" : null;
  const previousPage = page.url.prev || null;
  const nextPage = page.url.next || null;
  const lastPage = page.url.next ? `/products/${totalPages}` : null;

  // State hooks
  const [currentPage, setCurrentPage] = useState(page.currentPage);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Get unique brands for filtering
  const brands = useMemo(() => {
    return [...new Set(products.map((product) => product.frontmatter?.brand))].filter(brand => brand);
  }, [products]);

  // Memoize the filtered and sorted products
  const filteredSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter((product) => product.frontmatter?.brand === selectedBrand);
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.frontmatter?.title?.localeCompare(b.frontmatter?.title);
      } else {
        return b.frontmatter?.title?.localeCompare(a.frontmatter?.title);
      }
    });

    return sorted;
  }, [products, selectedBrand, sortOrder]);

  return (
    <section className="m-5 text-gray-400 sm:py-12">
      <div className="blog">
        <p className="my-3 text-sm">
          <em>
            Product {page.start + 1} through {page.end + 1} of {page.total} total products
          </em>
        </p>

        {/* Filter Bar */}
        <div className="mb-4">
          <label htmlFor="sortOrder" className="text-sm">Sort Alphabetically:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="ml-2 p-2 border border-gray-400 rounded-md"
          >
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
        </div>

        {/* Brand Filter Dropdown */}
        <div className="mb-4">
          <label htmlFor="brandFilter" className="text-sm">Filter by Brand:</label>
          <select
            id="brandFilter"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="ml-2 p-2 border border-gray-400 rounded-md"
          >
            <option value="">All Brands</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <ul className="grid gap-5 sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
          {filteredSortedProducts && filteredSortedProducts.length > 0 ? (
            filteredSortedProducts.map((product) => {
              if (!product.frontmatter || !product.frontmatter.slug || !product.frontmatter.title) {
                return null; 
              }

              return (
                <li
                  className="flex flex-col rounded-lg border-2 border-stone-800 text-center shadow-2xl"
                  key={product.frontmatter.slug}
                >
                  <a href={`/products/${product.frontmatter.slug}`}>
                    <img
                      className="h-56 w-full rounded-lg object-cover"
                      src={product.frontmatter.image}
                      alt={product.frontmatter.title}
                      loading="lazy"
                    />
                    <div className="mt-2 hidden space-x-2">
                      {product.frontmatter.tags?.map((tag, index) => (
                        <span key={index} className="text-sm">
                          <a href={`/tags/${tag}`} className="hover:underline">
                            {tag}
                          </a>
                          {index < product.frontmatter.tags.length - 1 && (
                            <span className="mx-1">|</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </a>
                  <a href={`/products/${product.frontmatter.slug}`} className="flex flex-col">
                    <p className="gradient-text my-2 px-3 font-bold text-lg">
                      {product.frontmatter.title}
                    </p>
                    <p className="px-3 font-normal" style={{ fontSize: ".8rem" }}>
                      {product.frontmatter.excerpt}
                    </p>
                    <p className="my-2 font-light" style={{ fontSize: ".8rem" }}>
                      {product.frontmatter.pubDate} | Posted {product.frontmatter.pubTime}
                    </p>
                    <p className="guide-description my-2" style={{ fontSize: ".7rem" }}>
                      &#10711; {product.frontmatter.minutesRead}
                    </p>
                  </a>
                  <div className="my-3">
                    <a
                      href={`/products/${product.frontmatter.slug}`}
                      className="text-md gradient-text mx-2 uppercase hover:text-gray-700 hover:underline"
                    >
                      View
                    </a>
                    <span className="text-md mx-2 uppercase">|</span>
                    <a
                      href={product.frontmatter.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md gradient-text mx-2 uppercase hover:text-gray-700 hover:underline"
                    >
                      Order
                    </a>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="text-center text-white">No products available</li>
          )}
        </ul>

        <div className="mt-12 grid place-content-center">
          {/* Pagination */}
          <div className="flex space-x-4 items-center">
            {/* First Page Button */}
            {firstPage && (
              <a
                href={firstPage}
                className="rounded bg-zinc-950 border border-gray-400 px-4 py-2 text-gray-400 hover:border-gray-900"
                aria-label="Go to first page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path fill="none" stroke="currentColor" strokeWidth="2" d="M14 6l-6 6 6 6" />
                  <path fill="none" stroke="currentColor" strokeWidth="2" d="M8 6l-6 6 6 6" />
                </svg>
              </a>
            )}

            {/* Previous Page Button */}
            {previousPage && (
              <a
                href={previousPage}
                className="rounded bg-zinc-950 border border-gray-400 px-4 py-2 text-gray-400 hover:border-gray-900"
                aria-label="Go to previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path fill="none" stroke="currentColor" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </a>
            )}

            {/* Current Page Display */}
            <span className="text-gray-400">
              Page {currentPage} of {totalPages}
            </span>

            {/* Next Page Button */}
            {nextPage && (
              <a
                href={nextPage}
                className="rounded bg-zinc-950 border border-gray-400 px-4 py-2 text-gray-400 hover:border-gray-900"
                aria-label="Go to next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path fill="none" stroke="currentColor" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}

            {/* Last Page Button */}
            {lastPage && (
              <a
                href={lastPage}
                className="rounded bg-zinc-950 border border-gray-400 px-4 py-2 text-gray-400 hover:border-gray-900"
                aria-label="Go to last page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path fill="none" stroke="currentColor" strokeWidth="2" d="M10 6l6 6-6 6" />
                  <path fill="none" stroke="currentColor" strokeWidth="2" d="M16 6l6 6-6 6" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaginatedDynamic;
