import React from "react";
import ProductItems from "./ProductItems";

export default function Products() {
  // Dummy product data (replace later with API)
  const products = [
    {
      image:
        "https://www.ksgindia.com/images/blog/19%20JUNE%202023/17%20JULY%202023/SS13.png",
      title: "Ananya Pottery",
      price: "40",
      description:
        "Crafted from local clay, each piece is unique in design and finish.",
    },
    {
      image:
        "https://artycraftz.com/cdn/shop/files/Handmade_Blue_Painted_Floral_Design_Terracota_Flower_Vase_-_ArtyCraftz.com-1818610.jpg?v=1730911809",
      title: "Handmade Vase",
      price: "55",
      description:
        "Beautifully glazed handmade vase for home decor and gifting.",
    },
    {
      image:
        "https://www.aadivasi.org/storage/product/images/original/01J2S9TSM2PSE2C332SV29B3PG.jpg",
      title: "Clay Cup Set",
      price: "25",
      description: "Eco-friendly clay cup set for authentic tea experience.",
    },
    {
      image:
        "https://www.ksgindia.com/images/blog/19%20JUNE%202023/17%20JULY%202023/SS13.png",
      title: "Ananya Pottery",
      price: "40",
      description:
        "Crafted from local clay, each piece is unique in design and finish.",
    },
    {
      image:
        "https://artycraftz.com/cdn/shop/files/Handmade_Blue_Painted_Floral_Design_Terracota_Flower_Vase_-_ArtyCraftz.com-1818610.jpg?v=1730911809",
      title: "Handmade Vase",
      price: "55",
      description:
        "Beautifully glazed handmade vase for home decor and gifting.",
    },
    {
      image:
        "https://www.aadivasi.org/storage/product/images/original/01J2S9TSM2PSE2C332SV29B3PG.jpg",
      title: "Clay Cup Set",
      price: "25",
      description: "Eco-friendly clay cup set for authentic tea experience.",
    },
    {
      image:
        "https://www.ksgindia.com/images/blog/19%20JUNE%202023/17%20JULY%202023/SS13.png",
      title: "Ananya Pottery",
      price: "40",
      description:
        "Crafted from local clay, each piece is unique in design and finish.",
    },
    {
      image:
        "https://artycraftz.com/cdn/shop/files/Handmade_Blue_Painted_Floral_Design_Terracota_Flower_Vase_-_ArtyCraftz.com-1818610.jpg?v=1730911809",
      title: "Handmade Vase",
      price: "55",
      description:
        "Beautifully glazed handmade vase for home decor and gifting.",
    },
    {
      image:
        "https://www.aadivasi.org/storage/product/images/original/01J2S9TSM2PSE2C332SV29B3PG.jpg",
      title: "Clay Cup Set",
      price: "25",
      description: "Eco-friendly clay cup set for authentic tea experience.",
    },
    {
      image:
        "https://www.ksgindia.com/images/blog/19%20JUNE%202023/17%20JULY%202023/SS13.png",
      title: "Ananya Pottery",
      price: "40",
      description:
        "Crafted from local clay, each piece is unique in design and finish.",
    },
    {
      image:
        "https://artycraftz.com/cdn/shop/files/Handmade_Blue_Painted_Floral_Design_Terracota_Flower_Vase_-_ArtyCraftz.com-1818610.jpg?v=1730911809",
      title: "Handmade Vase",
      price: "55",
      description:
        "Beautifully glazed handmade vase for home decor and gifting.",
    },
    {
      image:
        "https://www.aadivasi.org/storage/product/images/original/01J2S9TSM2PSE2C332SV29B3PG.jpg",
      title: "Clay Cup Set",
      price: "25",
      description: "Eco-friendly clay cup set for authentic tea experience.",
    },
  ];

  return (
    <div className="container my-5">
      <h1 className="text-center m-5" style={{ color: "#1F2937" }}>
        Featured Products
      </h1>
      <div className="d-flex flex-wrap justify-content-evenly gap-4">
        {products.map((product, index) => (
          <div style={{ flex: "0 1 300px" }} key={index}>
            <ProductItems {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}
