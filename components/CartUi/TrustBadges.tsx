import { CreditCard, ShieldCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

function TrustBadges() {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
        <ShieldCheck className="h-4 w-4 text-gray-400" />
        <span>Secure Checkout</span>
        <CreditCard className="h-4 w-4 text-gray-400 ml-2" />
        <span>Multiple Payment Options</span>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        {[
          { name: "visa", image: "/visa.svg" },
          { name: "mastercard", image: "/mastercard.svg" },
          { name: "verve", image: "/verve.svg" },
        ].map((method) => (
          <div
            key={method.name}
            className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center"
          >
            <Image
              src={method.image}
              alt={method.name}
              width={30}
              height={20}
              className="w-auto h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustBadges;
