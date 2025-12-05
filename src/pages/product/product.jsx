import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {
    const {category}=useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState([
    {
      media: {
        primary_image_url: "https://example.com/images/redrose_primary.jpg",
        gallery_images: [
          "https://example.com/images/redrose_full_view.jpg",
          "https://example.com/images/redrose_close_up.jpg",
          "https://example.com/images/redrose_packaging.jpg",
        ],
      },
      _id: "692ca762d374d60a8c63cd47",
      product_id: "FL-RNR-001",
      name: "Luxury Red Naomi Rose Bouquet",
      slug: "luxury-red-naomi-roses",
      sku: "RNROSE-BASE",
      quantity: 10,
      original_price: 145,
      selling_price: 120,
      description:
        "The Red Naomi is the quintessential luxury red rose, known for its large head, deep velvety color, and long vase life. Sourced directly from premier Dutch growers.",
      short_summary:
        "The classic choice for eternal love, featuring large heads and an incredible 10+ day vase life.",
    },
     {
      media: {
        primary_image_url: "https://example.com/images/redrose_primary.jpg",
        gallery_images: [
          "https://example.com/images/redrose_full_view.jpg",
          "https://example.com/images/redrose_close_up.jpg",
          "https://example.com/images/redrose_packaging.jpg",
        ],
      },
      _id: "692ca762d374d60a8c63cssd47",
      product_id: "FL-RNR-002",
      name: "Luxury Green Naomi Rose Bouquet",
      slug: "luxury-green-naomi-roses",
      sku: "RNROSE-BASE",
      quantity: 10,
      original_price: 145,
      selling_price: 120,
      description:
        "The Red Naomi is the quintessential luxury red rose, known for its large head, deep velvety color, and long vase life. Sourced directly from premier Dutch growers.",
      short_summary:
        "The classic choice for eternal love, featuring large heads and an incredible 10+ day vase life.",
    },
  ]);

  const handleProductClick = (slug) => {
    navigate(`/product/${category}/${slug}`);
  };

  return (
    <div>
      <h1>Category: {category}</h1>
      {productData.map((product) => (
        <div
          key={product._id}
          onClick={() => handleProductClick(product.slug)}
          style={{
            cursor: "pointer",
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h2>{product.name}</h2>
          <img
            src={product.media.primary_image_url}
            alt={product.name}
            style={{ width: "200px", height: "auto" }}
          />
          <p>{product.description}</p>
          <p>Price: ${product.selling_price}</p>
        </div>
      ))}
    </div>
  );
};

export default Product;