import react, { useState } from "react";
import { useParams } from "react-router-dom";
const ProductDescription = () => {
      const { category, productSlug } = useParams();
    const [productDescriptionData, setProductDescriptionData] = useState({
    "categorization": {
        "category_id": 1,
        "category_name": "Roses",
        "subcategory_id": 101,
        "subcategory_name": "Red Roses",
        "festival_tags": [
            "Valentine's Day",
            "Anniversary",
            "Romantic"
        ],
        "occasion_tags": [
            "Birthday",
            "Get Well",
            "Just Because"
        ],
        "type": "Arrangement"
    },
    "product_attributes": {
        "color": "Deep Red / Velvety",
        "stem_length_cm": 60,
        "fragrance_level": "Low to None",
        "vase_life_days_min": 10,
        "origin": "Netherlands"
    },
    "media": {
        "primary_image_url": "https://example.com/images/redrose_primary.jpg",
        "gallery_images": [
            "https://example.com/images/redrose_full_view.jpg",
            "https://example.com/images/redrose_close_up.jpg",
            "https://example.com/images/redrose_packaging.jpg"
        ]
    },
    "metrics": {
        "average_rating": 4.8,
        "review_count": 145,
        "times_ordered": 870
    },
    "care_and_logistics": {
        "shipping_constraints": {
            "requires_cold_chain": true,
            "max_delivery_days": 3,
            "regional_availability": [
                "India"
            ]
        },
        "care_instructions": [
            "Cut stems at a 45-degree angle upon arrival.",
            "Use the included flower food packet.",
            "Change water every two days.",
            "Keep away from direct sunlight and heat sources."
        ],
        "add_ons": [
            {
                "name": "Clear Glass Vase",
                "product_id": "VASE-001",
                "quantity": 1,
                "original_price": 20,
                "selling_price": 20,
                "image_url": "https://example.com/images/addon_vase.jpg",
                "_id": "692ca762d374d60a8c63cd4a"
            },
            {
                "name": "Luxury Chocolates",
                "product_id": "CHOCO-005",
                "quantity": 1,
                "original_price": 25,
                "selling_price": 22.5,
                "image_url": "https://example.com/images/addon_chocolates.jpg",
                "_id": "692ca762d374d60a8c63cd4b"
            }
        ]
    },
    "availability": {
        "is_active": true,
        "is_featured": true,
        "last_restock_date": "2025-11-15T10:30:00.000Z"
    },
    "_id": "692ca762d374d60a8c63cd47",
    "product_id": "FL-RNR-001",
    "name": "Luxury Red Naomi Rose Bouquet",
    "slug": "luxury-red-naomi-roses",
    "sku": "RNROSE-BASE",
    "quantity": 1,
    "original_price": 145,
    "selling_price": 120,
    "description": "The Red Naomi is the quintessential luxury red rose, known for its large head, deep velvety color, and long vase life. Sourced directly from premier Dutch growers.",
    "short_summary": "The classic choice for eternal love, featuring large heads and an incredible 10+ day vase life.",
    "customer_reviews": [
        {
            "rating": 5,
            "review_date": "2025-11-01T15:00:00.000Z",
            "comment": "The Naomi roses were even more beautiful in person. Deep color and they lasted for two weeks! Worth every penny.",
            "_id": "692ca762d374d60a8c63cd48"
        },
        {
            "rating": 4.5,
            "review_date": "2025-10-25T09:15:00.000Z",
            "comment": "Delivered on time and the flowers were fresh. One stem had a slightly small head, but overall excellent.",
            "_id": "692ca762d374d60a8c63cd49"
        }
    ],
    "variations": [
        {
            "inventory": {
                "quantity_available": 120,
                "reorder_point": 20
            },
            "variant_id": "VAR-001-S",
            "variant_sku": "RNROSE-S05",
            "variant_name": "Bunch of 5 Stems (Standard)",
            "quantity_in_bunch": 5,
            "currency": "USD",
            "original_price": 35,
            "selling_price": 31.5,
            "discount_percentage": 10,
            "image_url": "https://example.com/images/redrose_5.jpg",
            "_id": "692ca762d374d60a8c63cd4c"
        },
        {
            "inventory": {
                "quantity_available": 75,
                "reorder_point": 15
            },
            "variant_id": "VAR-001-M",
            "variant_sku": "RNROSE-M12",
            "variant_name": "Bunch of 12 Stems (Dozen)",
            "quantity_in_bunch": 12,
            "currency": "USD",
            "original_price": 75,
            "selling_price": 67.5,
            "discount_percentage": 10,
            "image_url": "https://example.com/images/redrose_12.jpg",
            "_id": "692ca762d374d60a8c63cd4d"
        },
        {
            "inventory": {
                "quantity_available": 30,
                "reorder_point": 5
            },
            "variant_id": "VAR-001-L",
            "variant_sku": "RNROSE-L24",
            "variant_name": "Two Dozen Stems (Grand)",
            "quantity_in_bunch": 24,
            "currency": "USD",
            "original_price": 145,
            "selling_price": 123.25,
            "discount_percentage": 15,
            "image_url": "https://example.com/images/redrose_24.jpg",
            "_id": "692ca762d374d60a8c63cd4e"
        }
    ],
    "createdAt": "2025-11-30T20:21:54.945Z",
    "updatedAt": "2025-11-30T20:34:37.866Z",
    "__v": 0
}
);
    const [selectedVariant, setSelectedVariant] = useState(
    productDescriptionData.variations[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // Variant selection
  const handleVariantChange = (variantId) => {
    const variant = productDescriptionData.variations.find(
      (v) => v.variant_id === variantId
    );
    setSelectedVariant(variant);
  };

  // Add-ons toggle
  const handleAddOnToggle = (addOn) => {
    if (selectedAddOns.some((a) => a.product_id === addOn.product_id)) {
      setSelectedAddOns(
        selectedAddOns.filter((a) => a.product_id !== addOn.product_id)
      );
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  // Add selected variant to cart
  const addVariantToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      product_id: productDescriptionData.product_id,
      name: productDescriptionData.name,
      variant_id: selectedVariant.variant_id,
      variant_name: selectedVariant.variant_name,
      quantity,
      selling_price: selectedVariant.selling_price,
      currency: selectedVariant.currency,
      image_url: selectedVariant.image_url,
      original_price: selectedVariant.original_price,
      discount_percentage: selectedVariant.discount_percentage || 0,
      add_ons: selectedAddOns
    };

    const index = existingCart.findIndex(
      (item) =>
        item.product_id === cartItem.product_id &&
        item.variant_id === cartItem.variant_id
    );

    if (index !== -1) {
      existingCart[index].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Variant added to cart!");
  };

  // Add 1 quantity of base product (no variant)
  const addBaseProductToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      _id: productDescriptionData._id,
      product_id: productDescriptionData.product_id,
      name: productDescriptionData.name,
      variant_id: null, // no variant
      variant_name: null,
      quantity: 1,
      selling_price: productDescriptionData.selling_price,
      currency: "USD",
      image_url: productDescriptionData.media.primary_image_url,
      original_price: productDescriptionData.original_price,
      discount_percentage: 0,
      add_ons: []
    };

    const index = existingCart.findIndex(
      (item) =>
        item.product_id === cartItem.product_id && item.variant_id === null
    );

    if (index !== -1) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Base product added to cart!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{productDescriptionData.name}</h1>
      <img
        src={productDescriptionData.media.primary_image_url}
        alt={productDescriptionData.name}
        style={{ width: "300px", marginBottom: "10px" }}
      />
      <p>{productDescriptionData.short_summary}</p>
      <p>Base Price: ${productDescriptionData.selling_price}</p>

      <button
        onClick={addBaseProductToCart}
        style={{
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "orange",
          color: "white",
          cursor: "pointer"
        }}
      >
        Add 1 Base Product
      </button>

      <div>
        <h3>Select Variant:</h3>
        {productDescriptionData.variations.map((variant) => (
          <button
            key={variant.variant_id}
            onClick={() => handleVariantChange(variant.variant_id)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor:
                selectedVariant.variant_id === variant.variant_id
                  ? "lightgreen"
                  : "white"
            }}
          >
            {variant.variant_name} - ${variant.selling_price}
          </button>
        ))}
      </div>

      <div>
        <h3>Quantity:</h3>
        <input
          type="number"
          min={1}
          max={selectedVariant.inventory.quantity_available}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <span> (Available: {selectedVariant.inventory.quantity_available})</span>
      </div>

      {productDescriptionData.care_and_logistics.add_ons.length > 0 && (
        <div>
          <h3>Add-ons:</h3>
          {productDescriptionData.care_and_logistics.add_ons.map((addOn) => (
            <div key={addOn.product_id}>
              <input
                type="checkbox"
                checked={selectedAddOns.some(
                  (a) => a.product_id === addOn.product_id
                )}
                onChange={() => handleAddOnToggle(addOn)}
              />
              {addOn.name} - ${addOn.selling_price}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={addVariantToCart}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Add Selected Variant to Cart
      </button>
    </div>
  );
};

export default ProductDescription;