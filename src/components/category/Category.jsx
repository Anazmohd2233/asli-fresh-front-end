
"use client";
import CategoryCard from "@components/category/CategoryCard";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { use, useEffect } from "react";

const Category = ({ categories, categoryError, onClose }) => {

  //  useEffect(() => {
  //   console.log("************categories from cat copmponent********", categories);
  //   }, []);
  return (
    <div className="flex flex-col w-full h-full bg-white cursor-pointer scrollbar-hide">
      <div className="w-full max-h-full">
        {categoryError ? (
          <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
            <span> {categoryError}</span>
          </p>
        ) : (
          <div className="relative grid gap-2 p-6">
            {categories?.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                icon={category.img}
                onClose={onClose}
                title={category.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
