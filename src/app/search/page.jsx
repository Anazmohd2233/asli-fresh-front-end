"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchScreen from "@components/search/SearchScreen";
import { useCategory } from "@hooks/azli_hooks/usecategory";
import { useProduct } from "@hooks/azli_hooks/useProduct";
import { getShowingAttributes } from "@services/AttributeServices";
import { getGlobalSetting } from "@services/SettingServices";

export default function Search() {
  const params = useSearchParams();
  const id = params.get("category") || "";
  const query = params.get("query") || "";

  // useEffect(() => {
  //   console.log("🔸 category category ID:", id);
  // }, [id]);

  // 🔹 States for attributes & settings fetched directly
  const [attributes, setAttributes] = useState([]);
  const [currency, setCurrency] = useState("₹");

  // 🔹 Hooks for category & product management
  const { categories, handleFetchCategories } = useCategory();
  const { productsList, loading, handleFetchProductsList } = useProduct();

  // ✅ Fetch attributes & global settings once on mount
  useEffect(() => {
    async function fetchStaticData() {
      try {
        const [{ attributes }, { globalSetting }] = await Promise.all([
          getShowingAttributes(),
          getGlobalSetting(),
        ]);

        setAttributes(attributes || []);
        setCurrency(globalSetting?.default_currency || "₹");
      } catch (err) {
        console.error("Error fetching attributes/settings:", err);
      }
    }

    fetchStaticData();
  }, []);

  // ✅ Fetch categories if not loaded
  useEffect(() => {
    if (!categories?.length) {
      handleFetchCategories(1);
    }
  }, [categories?.length]);

  // ✅ Fetch products when search params change
  useEffect(() => {
    if (id || query) {
      handleFetchProductsList({
        category: id,
      });
      console.log("🔹 Fetching products for:", { id, query });
    }
  }, [id, query]);

  return (
    <SearchScreen
      products={productsList}
      attributes={attributes}
      categories={categories}
      currency={currency}
      loading={loading}
    />
  );
}
