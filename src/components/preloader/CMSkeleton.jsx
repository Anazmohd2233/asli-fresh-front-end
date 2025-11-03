"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import parse from "html-react-parser";

const CMSkeleton = ({
  html,
  count,
  height,
  color,
  loading,
  data,
  highlightColor,
}) => {
  return (
    <>
      {loading ? (
        <Skeleton
          count={count || 6}
          height={height || 25}
          baseColor={color || "#f1f5f9"}
          highlightColor={highlightColor || "#cbd5e1"}
        />
      ) : data ? (
        html ? parse(data) : data
      ) : null}
    </>
  );
};

export default CMSkeleton;
