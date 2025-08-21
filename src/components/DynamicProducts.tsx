import { useState, useMemo } from "react";
import ProductList from "~/components/_ProductList";

const DynamicProducts = ({ products }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceSortOrder, setPriceSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSuspension, setSelectedSuspension] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(10);

  const brands = useMemo(() => {
    return [...new Set(products.map((p) => p.frontmatter?.brand))].filter(
      Boolean
    );
  }, [products]);

  const suspensions = useMemo(() => {
    return [...new Set(products.map((p) => p.frontmatter?.suspension))].filter(
      Boolean
    );
  }, [products]);

  const filteredSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedBrand) {
      filtered = filtered.filter((p) => p.frontmatter?.brand === selectedBrand);
    }

    if (selectedSuspension) {
      filtered = filtered.filter(
        (p) => p.frontmatter?.suspension === selectedSuspension
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.frontmatter?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      const priceA = a.frontmatter?.price || 0;
      const priceB = b.frontmatter?.price || 0;
      return priceSortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });
  }, [
    products,
    selectedBrand,
    selectedSuspension,
    priceSortOrder,
    searchQuery,
  ]);

  const displayedProducts = filteredSortedProducts.slice(0, visibleProducts);

  return (
    <section className="bg-zinc-950 p-4 text-gray-200 sm:p-8">
      {/* ✅ Breadcrumb */}
      <div className="mx-auto mb-6 max-w-7xl text-gray-400 text-sm">
        <nav className="flex space-x-2" aria-label="Breadcrumb">
          <span className="text-gray-500">Products Collection</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-4">
        {/* ✅ Sidebar Filters */}
        <aside className="rounded-lg border border-gray-700 bg-zinc-900 p-4 lg:col-span-1">
          <h3 className="mb-2 font-semibold text-xl">Filters</h3>
          <p className="mb-4 text-gray-400 text-sm">Refine your search</p>

          {/* Brand Filter */}
          <div className="mb-4">
            <label
              htmlFor="brand"
              className="mb-1 block flex items-center gap-2 font-medium text-sm"
            >
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              Brand
            </label>
            <select
              id="brand"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-zinc-800 p-2"
            >
              <option value="">All Brands</option>
              {brands.map((brand, i) => (
                <option key={i} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Suspension Filter */}
          <div className="mb-4">
            <label
              htmlFor="suspension"
              className="mb-1 block flex items-center gap-2 font-medium text-sm"
            >
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 10h18M3 14h18" />
              </svg>
              Suspension
            </label>
            <select
              id="suspension"
              value={selectedSuspension}
              onChange={(e) => setSelectedSuspension(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-zinc-800 p-2"
            >
              <option value="">All Types</option>
              {suspensions.map((suspension, i) => (
                <option key={i} value={suspension}>
                  {suspension === "dual"
                    ? "Dual Suspension"
                    : suspension === "rigid"
                    ? "Rigid"
                    : "Front Suspension"}
                </option>
              ))}
            </select>
          </div>

          {/* Sort by Price */}
          <div className="mb-4">
            <label
              htmlFor="priceSort"
              className="mb-1 block flex items-center gap-2 font-medium text-sm"
            >
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
              Sort by Price
            </label>
            <select
              id="priceSort"
              value={priceSortOrder}
              onChange={(e) => setPriceSortOrder(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-zinc-800 p-2"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          {/* Search Field */}
          <div className="mb-4">
            <label
              htmlFor="search"
              className="mb-1 block flex items-center gap-2 font-medium text-sm"
            >
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-md border border-gray-600 bg-zinc-800 p-2"
            />
          </div>

          <p className="mt-2 text-gray-400 text-xs">
            <em>{filteredSortedProducts.length} products found</em>
          </p>
        </aside>

        {/* ✅ Product Grid */}
        <div className="lg:col-span-3">
          <ProductList products={displayedProducts} />

          {/* Load More / Less */}
          <div className="mt-6 flex justify-center gap-6">
            {displayedProducts.length < filteredSortedProducts.length && (
              <button
                onClick={() => setVisibleProducts((prev) => prev + 6)}
                className="font-semibold text-purple-500 hover:text-purple-700"
              >
                Load More
              </button>
            )}
            {visibleProducts > 10 && (
              <button
                onClick={() =>
                  setVisibleProducts((prev) => Math.max(prev - 6, 10))
                }
                className="font-semibold text-purple-500 hover:text-purple-700"
              >
                Load Less
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicProducts;
