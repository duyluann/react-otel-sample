import { Product as ProductType } from "../../../../Home";
import { FC } from "react";

import fakeProductPicture from "../../../../../../assets/fake-product-picture.png";

import styles from "./Product.module.css";
import { useNavigate } from "react-router-dom";
import useSpansContext from "../../../../../../components/SpansProvider/hooks/useSpansContext";

type ProductProps = {
  product: ProductType;
};

const Product: FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();
  const { getOrCreateSpan } = useSpansContext();

  const handleOnClick = () => {
    const [activeSpan] = getOrCreateSpan("Purchase Flow");

    activeSpan.addEvent("Product Clicked", {
      product_id: product.id,
    });

    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.product} onClick={handleOnClick}>
      <img
        src={fakeProductPicture}
        alt={product.name}
        className={styles.picture}
      />
      <h2 className={styles.title}>
        {product.name} <span>${product.price}</span>
      </h2>
      <h3 className={styles.shortDescription}>{product.short_description}</h3>
    </div>
  );
};

export default Product;
