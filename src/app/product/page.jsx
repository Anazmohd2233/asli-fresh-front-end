"use client";

import { useEffect } from "react";
import ProductScreen from "@components/slug-card/ProductScreen";
import { useProduct } from "@hooks/azli_hooks/useProduct";
import { showingTranslateValue } from "@lib/translate";
import { getShowingAttributes, getShowingStoreProducts } from "@services/ProductServices";
import { useSearchParams } from "next/navigation";

const ProductSlug = () => {




    const param = useSearchParams();
    const productId = param.get("productId") || "";

     useEffect(() => {
    if (param) {
console.log('**********product id *****',productId)    }
  }, [param]);

  const {
    productView,
    handleFetchProductById,
  
  } = useProduct();




  useEffect(() => {
  if (productId) {
    handleFetchProductById({
      productId: productId,
      normal_visible: true,
      whole_fish_visible: '',
    });
  }
}, [productId]);


  useEffect(() => {
    if (productView) {
      console.log("🔹 productView", productView);
    }
  }, [productView]);

  // Render loading or empty state
  if (!productView) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  return (
    <ProductScreen
      product={productView}

    />
  );
};

export default ProductSlug;
