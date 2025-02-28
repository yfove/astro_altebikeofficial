import React from "react";

interface Product {
  frontmatter: {
    slug: string;
    title: string;
    image: string;
    excerpt: string;
    pubDate: string;
    pubTime: string;
    minutesRead: string;
    tags: string[];
    brand: string;
    buyLink: string;
  };
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ul className="grid gap-5 sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
      {products.length > 0 ? (
        products.map((product) => {
          const { frontmatter } = product;
          if (!frontmatter || !frontmatter.slug || !frontmatter.title) {
            return null;
          }

          return (
            <li
              className="flex flex-col rounded-lg border-2 border-stone-800 text-center shadow-2xl"
              key={frontmatter.slug}
            >
              <a href={`/products/${frontmatter.slug}`}>
                <img
                  className="h-56 w-full rounded-lg object-cover"
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  loading="lazy"
                />
                <div className="mt-2 hidden space-x-2">
                  {frontmatter.tags?.map((tag, index) => (
                    <span key={index} className="text-sm">
                      <a href={`/tags/${tag}`} className="hover:underline">
                        {tag}
                      </a>
                      {index < frontmatter.tags.length - 1 && (
                        <span className="mx-1">|</span>
                      )}
                    </span>
                  ))}
                </div>
              </a>
              <a href={`/products/${frontmatter.slug}`} className="flex flex-col">
                <p className="gradient-text my-2 px-3 font-bold text-lg">
                  {frontmatter.title}
                </p>
                <p className="px-3 font-normal" style={{ fontSize: ".8rem" }}>
                  {frontmatter.excerpt}
                </p>
                <p className="my-2 font-light" style={{ fontSize: ".8rem" }}>
                  {frontmatter.pubDate} | Posted {frontmatter.pubTime}
                </p>
                <p className="guide-description my-2" style={{ fontSize: ".7rem" }}>
                  &#10711; {frontmatter.minutesRead}
                </p>
              </a>
              <div className="my-3">
                <a
                  href={`/products/${frontmatter.slug}`}
                  className="text-md gradient-text mx-2 uppercase hover:text-gray-700 hover:underline"
                >
                  View
                </a>
                <span className="text-md mx-2 uppercase">|</span>
                <a
                  href={frontmatter.buyLink}
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
  );
};

export default ProductList;
