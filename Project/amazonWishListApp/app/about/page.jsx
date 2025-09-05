// "use client"; //transforms default server component into client component
// import { useState } from "react";
import Link from "next/link";

//NOTE: Only serve components can use metadata object
export const metadata = {
  title: "Amazon Wish List",
  description: "Keep track of your Amazon wish list",
  keyword:
    "wish list, my wish, amazon store, window shopping",
};

const AboutPage = () => {
  return <div>About Page</div>;
};

export default AboutPage;
