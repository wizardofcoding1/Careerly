import CareerlySocialHandle from "../FooterComponent/CareerlySocialHandle";
import CareerlyQuickLink from "../FooterComponent/CareerlyQuickLink";
import CareerlyServices from "../FooterComponent/CareerlyServices";
import CareerlyContactInfo from "../FooterComponent/CareerlyContactInfo";
import CareerlyUpdate from "../FooterComponent/CareerlyUpdate";
import CareerlyCopyRight from "../FooterComponent/CareerlyCopyRight";

export default function Footer() {
  return (
    <div className="bg-[#0c102e] text-white px-4 py-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 shadow-inner">
      
      {/* Footer Sections */}
      <CareerlySocialHandle className="order-1" />
      <CareerlyQuickLink className="order-2" />
      <CareerlyServices className="order-3" />
      <CareerlyContactInfo className="order-4" />

      {/* Update Section - full width on md and below */}
      <div className="order-5 md:col-span-4 md:col-start-1 md:col-end-3 lg:col-span-5 w-fit">
        <CareerlyUpdate />
      </div>

      {/* Copyright Section - full width always */}
      <div className="order-6 md:col-span-4 lg:col-span-4">
        <CareerlyCopyRight />
      </div>
    </div>
  );
}
