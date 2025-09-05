// "use client"; //transforms default server component into client component
// import { useState } from "react";
import Link from "next/link";

//NOTE: Only server components can use metadata object
export const metadata = {
  title: "Amazon Store - Browse & Add to Wishlist",
  description: "Browse Amazon South Africa deals and find items for your wishlist",
  keywords: "amazon store, deals, wishlist, shopping, south africa",
};

const AmazonStorePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Browse Amazon Store
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Click the link below to explore Amazon South Africa's latest deals and discover 
            amazing products. Find what you love and come back to add them to your personal wishlist!
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.58L19 8l-9 9z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Ready to Start Shopping?
              </h2>
              <p className="text-gray-600 mb-6">
                Browse through Electronics deals on Amazon South Africa
              </p>
            </div>

            {/* Amazon Link Button */}
            
            <Link 
              href="https://www.amazon.co.za/deals/?_encoding=UTF8&ref_=nav_cs_gb&pd_rd_w=ZH4Vj&content-id=amzn1.sym.a0c08fb7-0ed2-4164-b70b-3a9c42ce0e4a&pf_rd_p=a0c08fb7-0ed2-4164-b70b-3a9c42ce0e4a&pf_rd_r=N0H22MW5BQ19MWS35ZWG&pd_rd_wg=wTIdv&pd_rd_r=1f7ae9cf-43cb-4aad-8152-39219fe91b49&bubble-id=deals-collection-electronics-and-accessories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:from-orange-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-200 text-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Electronics
            </Link>

            <p className="text-sm text-gray-500 mt-4">
              Opens in a new tab • Find items and return to add them to your wishlist
            </p>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            💡 How it works:
          </h3>
          <div className="space-y-2 text-blue-700">
            <p>1. Click the button above to browse Amazon deals</p>
            <p>2. Find products you like on Amazon</p>
            <p>3. Return to your wishlist page to add them manually</p>
            <p>4. Keep track of all your desired items in one place!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmazonStorePage;