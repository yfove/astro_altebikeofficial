import { useState, useMemo } from "react";
import ProductList from "~/components/_ProductList"; // Assuming you have ProductList component

const DynamicProducts = ({ products }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceSortOrder, setPriceSortOrder] = useState("asc"); // Sort by price state
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedSuspension, setSelectedSuspension] = useState(""); // state for suspension filter
  const [visibleProducts, setVisibleProducts] = useState(9); // Set initial number of products to 6

  // Get unique brands for filtering
  const brands = useMemo(() => {
    return [
      ...new Set(products.map((product) => product.frontmatter?.brand)),
    ].filter((brand) => brand);
  }, [products]);

  // Memorize the suspension types
  const suspensions = useMemo(() => {
    return [
      ...new Set(products.map((product) => product.frontmatter?.suspension)),
    ].filter((suspension) => suspension);
  }, [products]);

  // Memoize the filtered and sorted products
  const filteredSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter(
        (product) => product.frontmatter?.brand === selectedBrand
      );
    }

    // Filter by suspension type
    if (selectedSuspension) {
      filtered = filtered.filter(
        (product) => product.frontmatter?.suspension === selectedSuspension
      );
    }

    // Filter by search query (e.g., product title or description)
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.frontmatter?.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    // Now, sort by price (if no need for alphabetical sorting)
    const sortedByPrice = [...filtered].sort((a, b) => {
      const priceA = a.frontmatter?.price || 0;
      const priceB = b.frontmatter?.price || 0;

      if (priceSortOrder === "asc") {
        return priceA - priceB; // ascending order (low to high)
      } else {
        return priceB - priceA; // descending order (high to low)
      }
    });

    return sortedByPrice;
  }, [
    products,
    selectedBrand,
    selectedSuspension,
    priceSortOrder,
    searchQuery,
  ]);

  // Function to handle clicking the "Load More" link
  const handleLoadMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 6); // Increase visible products by 6
  };

  // Function to handle clicking the "Load Less" link
  const handleLoadLess = () => {
    setVisibleProducts((prevVisible) => Math.max(prevVisible - 6, 6)); // Decrease visible products by 6 (but keep at least 6)
  };

  const displayedProducts = filteredSortedProducts.slice(0, visibleProducts);

  return (
    <section className="text-gray-400 sm:m-5">
      <div className="filters blog rounded-lg border  border-gray-700 bg-zinc-950 p-5 shadow-lg ">
        <div className="filter-header mb-4">
          <h3 className="font-semibold text-gray-400 text-xl">
            The Electric Vault
          </h3>
          <p className="text-gray-400 text-sm">
            Refine your search with these options
          </p>
        </div>

        {/* Filters Container: Left-Aligned */}
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-5">
          {/* Brand Filter */}
          <div className="filter-item flex w-full flex-col sm:w-auto">
            <label
              htmlFor="brandFilter"
              className="mb-2 font-medium text-gray-400 text-sm"
            >
              Brand
            </label>
            <select
              id="brandFilter"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="rounded-md border border-gray-600 bg-zinc-950 p-2 text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Brands</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Suspension Filter */}
          <div className="filter-item flex w-full flex-col sm:w-auto">
            <label
              htmlFor="suspensionFilter"
              className="mb-2 font-medium text-gray-400 text-sm"
            >
              Suspension Type
            </label>
            <select
              id="suspensionFilter"
              value={selectedSuspension}
              onChange={(e) => setSelectedSuspension(e.target.value)}
              className="rounded-md border border-gray-600 bg-zinc-950 p-2 text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Suspensions</option>
              {suspensions.map((suspension, index) => (
                <option key={index} value={suspension}>
                  {suspension === "dual"
                    ? "Dual Suspension"
                    : suspension === "rigid"
                    ? "Rigid Suspension"
                    : "Front Suspension"}
                </option>
              ))}
            </select>
          </div>

          {/* Sort by Price Filter */}
          <div className="filter-item flex w-full flex-col sm:w-auto">
            <label
              htmlFor="priceSortOrder"
              className="mb-2 font-medium text-gray-400 text-sm"
            >
              Sort by Price
            </label>
            <select
              id="priceSortOrder"
              value={priceSortOrder}
              onChange={(e) => setPriceSortOrder(e.target.value)}
              className="rounded-md border border-gray-600 bg-zinc-950 p-2 text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          {/* Search Filter */}
          <div className="filter-item flex w-full flex-col sm:w-auto">
            <label
              htmlFor="searchQuery"
              className="mb-2 font-medium text-gray-400 text-sm"
            >
              Search
            </label>
            <input
              type="text"
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-md border border-gray-600 bg-zinc-950 p-2 text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Search products..."
            />
          </div>
        </div>

        <p className="mt-4 text-left text-gray-400 text-sm">
          <em>{filteredSortedProducts.length} products found</em>
        </p>

        <div className="mt-6">
          {/* Pass filtered and sorted products to ProductList */}
          <ProductList products={displayedProducts} />
        </div>

        {/* Centered "Load More" and "Load Less" Links */}
        <div className="mt-4 flex justify-center space-x-4 ">
          {displayedProducts.length < filteredSortedProducts.length && (
            <span
              onClick={handleLoadMore}
              className="cursor-pointer font-bold text-purple-500 transition-all text-xl hover:text-purple-700"
            >
              Load More
            </span>
          )}

          {displayedProducts.length > 9 && (
            <span
              onClick={handleLoadLess}
              className="cursor-pointer font-bold text-purple-500 transition-all text-xl hover:text-purple-700"
            >
              Load Less
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default DynamicProducts;
