import React, { useEffect, useRef } from "react";

interface ProductCardProps {
  image?: string;
}

export default function ProductCard(props: ProductCardProps) {

  const proRef = useRef(null)
  useEffect(() => {
    console.log(proRef.current)
  })
  return (
    <div className="product-card">
      <div className="product-card__name">Name 1</div>
      <div className="product-card__image">
        <div className="images-discount">
          <div className="discount">25%</div>
          <img
            src="http://chupanhnoithat.vn/upload/images/adfafaf.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="cart-middle">
        <div className="price">$99.99</div>
      </div>
      <div className="card-footer">
        <button ref={proRef} >ADD TO CART</button>
      </div>
    </div>
  );
}
