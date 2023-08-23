import React, { useEffect } from "react";
import LayoutPublic from "./LayoutPublic";
import { useRouter } from "next/router";

const test = () => {
  const router = useRouter();
  const { test } = router.query;

  useEffect(() => {
    console.log(test);
  }, [test]);

  return (
    <LayoutPublic>
      <div>
        <h1>Test: {test}</h1>
      </div>
    </LayoutPublic>
  );
};

export default test;
