import React from "react";
import { Link } from "react-router-dom";

const StickyQuoteCTA = ({ selectedServices = [] }) => {
  return (
    <div className="sticky bottom-4 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 py-4 flex items-center justify-between">
          <p className="text-white/90 text-sm">
            {selectedServices.length > 0
              ? `Listo para cotizar ${selectedServices.length} servicio(s)?`
              : "¿Listo para cotizar tu proyecto?"}
          </p>
          <Link
            to="/contact-quote-request"
            className="rounded-xl border border-white/20 bg-white text-[#1D2946] px-4 py-2 font-medium hover:bg-white/90 transition"
          >
            Solicitar Cotización
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StickyQuoteCTA;
