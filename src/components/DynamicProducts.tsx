import { useState, useMemo } from "react";
import ProductList from "~/components/_ProductList"; // Assuming you have ProductList component

const DynamicProducts = ({ products }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceSortOrder, setPriceSortOrder] = useState("asc"); // Sort by price state
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [visibleProducts, setVisibleProducts] = useState(6); // Set initial number of products to 6

  // Get unique brands for filtering
  const brands = useMemo(() => {
    return [
      ...new Set(products.map((product) => product.frontmatter?.brand)),
    ].filter((brand) => brand);
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
  }, [products, selectedBrand, priceSortOrder, searchQuery]);

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
    <section className="m-5 text-gray-400 sm:py-5">
      <div className="filters blog bg-zinc-950 border border-gray-700 shadow-lg rounded-lg p-6 my-6">
        <div className="filter-header mb-4">
          <h3 className="text-xl font-semibold text-gray-400">The Electric Vault</h3>
          <p className="text-sm text-gray-400">Refine your search with these options</p>
        </div>

        {/* Filters Container: Left-Aligned */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-5">
          {/* Brand Filter */}
          <div className="filter-item w-full sm:w-auto flex flex-col">
            <label htmlFor="brandFilter" className="text-sm font-medium text-gray-400 mb-2">Brand</label>
            <select
              id="brandFilter"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="rounded-md border border-gray-600 p-2 text-gray-400 bg-zinc-950 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Brands</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

     

          {/* Sort by Price Filter */}
          <div className="filter-item w-full sm:w-auto flex flex-col">
            <label htmlFor="priceSortOrder" className="text-sm font-medium text-gray-400 mb-2">Sort by Price</label>
            <select
              id="priceSortOrder"
              value={priceSortOrder}
              onChange={(e) => setPriceSortOrder(e.target.value)}
              className="rounded-md border border-gray-600 p-2 text-gray-400 bg-zinc-950 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          {/* Search Filter */}
          <div className="filter-item w-full sm:w-auto flex flex-col">
            <label htmlFor="searchQuery" className="text-sm font-medium text-gray-400 mb-2">Search</label>
            <input
              type="text"
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-md border border-gray-600 p-2 text-gray-400 bg-zinc-950 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search products..."
            />
          </div>
        </div>

        <p className="text-left text-sm text-gray-400 mt-4">
          <em>{filteredSortedProducts.length} products found</em>
        </p>

        <div className="mt-6">
          {/* Pass filtered and sorted products to ProductList */}
          <ProductList products={displayedProducts} />
        </div>

        {/* Centered "Load More" and "Load Less" Links */}
        <div className="mt-4 flex justify-center space-x-4">
          {displayedProducts.length < filteredSortedProducts.length && (
            <span
              onClick={handleLoadMore}
              className="cursor-pointer text-purple-500 text-lg hover:text-purple-700 transition-all"
            >
              Load More
            </span>
          )}

          {displayedProducts.length > 6 && (
            <span
              onClick={handleLoadLess}
              className="cursor-pointer text-purple-500 text-lg hover:text-purple-700 transition-all"
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
