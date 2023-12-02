import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Products from "@/components/Products";
import Checkout from "@/components/Checkout";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Products />
      <Checkout />
      <Footer />
    </div>
  );
}
