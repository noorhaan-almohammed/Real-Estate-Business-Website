import { detailsFormData, detailsFormHeaderData } from "../data/PropertyDetails/PropertyDetailsData";
import ContactForm from "../sections/Contact/ContactForm";
import PricingDetailsSection from "../sections/propertiesDetails/PricingDetailsSection";
import FAQSection from "../sections/HomePageSections/FAQSection";
import { faqSectionData } from "../data/Home/HomeData";
import Images from "../sections/Images";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getPropertyById } from "../redux/thunks/propertiesActions";
import Loader from "../components/kit/Loader";
import Bed from "../svg/Bedroom";
import Bathroom from "../svg/Bathroom";
import Area from "../svg/Area";
import Lightning from "../svg/Lightning";
import type { PropertyDetailsType } from "../types/PropertyDetails/PropertyDetailsTypes";
import type { PricingDetailsDataType } from "../types/PropertyDetails/ComprehensivePricingDetailsTypes";
const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
   const dispatch = useDispatch<AppDispatch>();

  const property = useSelector((state: RootState) => state.properties.items[0]);
  const loading = useSelector((state: RootState) => state.properties.loading);

  useEffect(() => {
    if (id) {
      dispatch(getPropertyById(id));
    }
  }, [id, dispatch]);

  if (loading || !property) {
    return <Loader/>;
  }

  const propertyDetailsData: PropertyDetailsType = {
    title: property.name,
    location: property.location,
    price: "$".concat(property.price.toLocaleString()),
    PropertyImages: (property.imageUrls || []).map((url) => ({ image: url })),
    description: {
      description: property.description || "",
      details: [
        { icon: <Bed/>, label: "Bedrooms", value: property.bedrooms?.toString?.() || "" },
        { icon: <Bathroom/>, label: "Bathrooms", value: property.bathrooms?.toString?.() || "" },
        { icon: <Area/>, label: "Area", value: property.area ? `${property.area.toLocaleString()} Square Feet` : "" },
      ],
      features: (property.features || []).map((label) => ({ icon: <Lightning/>, label })),
    },
  };

  const pricingDetailsData: PricingDetailsDataType = {
    headline: "Comprehensive Pricing Details",
    description:
      "At Estatein, transparency is key. We want you to have a clear understanding of all costs associated with your property investment.",
    note:
      "The figures provided above are estimates and may vary depending on the property, location, and individual circumstances.",
    listingPrice: "$".concat((property.listing_price ?? property.price).toLocaleString()),
    pricingDetailsCards: [
      {
        title: "Additional Fees",
        pricingCard: [
          { label: "Property Transfer Tax", value: property.transfer_tax != null ? "$".concat(property.transfer_tax.toLocaleString()) : "-", description: "Based on sale price and local regulations" },
          { label: "Legal Fees", value: property.legal_fees != null ? "$".concat(property.legal_fees.toLocaleString()) : "-", description: "Approximate legal services" },
          { label: "Home Inspection", value: property.inspection != null ? "$".concat(property.inspection.toLocaleString()) : "-", description: "Recommended for due diligence" },
          { label: "Property Insurance", value: property.insurance != null ? "$".concat(property.insurance.toLocaleString()) : "-", description: "Annual insurance cost" },
          { label: "Mortgage Fees", value: property.mortgage_fees != null ? property.mortgage_fees : (property.expense_mortgage || "-"), description: "If applicable, consult with your lender for specific details" },
        ],
      },
      {
        title: "Monthly Costs",
        pricingCard: [
          { label: "Property Taxes", value: property.monthly_taxes != null ? "$".concat(property.monthly_taxes.toLocaleString()) : "-", description: "Approximate monthly property tax based on the sale price and local rates" },
          { label: "Homeowners' Association Fee", value: property.hoa_fee != null ? "$".concat(property.hoa_fee.toLocaleString()) : "-", description: "Approximate cost for legal services, including title transfer" },
        ],
      },
      {
        title: "Total Initial Costs",
        pricingCard: [
          { label: "Listing Price", value: "$".concat((property.listing_price ?? property.price).toLocaleString()) },
          { label: "Additional Fees", value: property.total_additional_fees != null ? "$".concat(property.total_additional_fees.toLocaleString()) : "-", description: "Property transfer tax, legal fees, inspection, insurance" },
          { label: "Down Payment", value: property.down_payment != null ? "$".concat(property.down_payment.toLocaleString()) : "-",description: "20%" },
          { label: "Mortgage Amount", value: property.mortgage_amount != null ? "$".concat(property.mortgage_amount.toLocaleString()) : "-" ,description :"If applicable"},
        ],
      },
      {
        title: "Monthly Expenses",
        pricingCard: [
          { label: "Property Taxes", value: property.monthly_taxes != null ? "$".concat(property.monthly_taxes.toLocaleString()) : "-" },
          { label: "Homeowners' Association Fee", value: property.hoa_fee != null ? "$".concat(property.hoa_fee.toLocaleString()) : "-" ,description :"Property transfer tax, legal fees, inspection, insurance"},
          { label: "Mortgage Payment", value: property.expense_mortgage || "Varies based on terms and interest rate", description: "If applicable" },
          { label: "Property Insurance", value: property.expense_insurance != null ? "$".concat(property.expense_insurance.toLocaleString()) : "-", description: "Approximate monthly cost" },
        ],
      },
    ],
  };
  return (
    <div className="space-y-20 md:space-y-30 xl:space-y-37.5">
      <Images data={propertyDetailsData}/>
      <ContactForm title={detailsFormHeaderData.title} description={detailsFormHeaderData.description} data={detailsFormData.conactForm} areaText={detailsFormData.areaText} detailsPage />
      <PricingDetailsSection data={pricingDetailsData}/>
      <FAQSection data={faqSectionData}/>
    </div>
  );
};

export default PropertyDetails;