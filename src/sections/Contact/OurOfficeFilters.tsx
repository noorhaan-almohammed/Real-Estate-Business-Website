import { useState } from "react";
import LocationCard from "../../components/cards/LocationCard";
import Slider from "../../components/sharedComponents/Slider";
import {
  type CategoriesCardType,
  type ContactDiscoverLocationsFilterDataType,
} from "../../types/Contact/ContactType";

function OurOfficeFilters({
  data,
}: {
  data: ContactDiscoverLocationsFilterDataType;
}) {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredCards =
    activeTab === "All"
      ? data.categoriesCard
      : data.categoriesCard.filter(
          (item) => item.category?.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <div className="flex flex-col gap-7.5 md:gap-10 xl:gap-12.5">
      {/* Tabs */}
      <div className="tabs flex gap-2.5 bg-Grey-10 rounded-lg xl:rounded-xl p-2.5 w-fit">
        {data.FilterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setActiveTab(option)}
            className={`py-3.5 px-5 xl:py-4.5 xl:px-6 
              min-w-25 md:min-w-31 xl:min-w-39.5 
              rounded-lg xl:rounded-[10px] border border-Grey-15 
              transition-all duration-200 text-sm xl:text-lg font-medium
              ${
                activeTab === option
                  ? "bg-Grey-08 text-Purple-70"
                  : "bg-transparent hover:border-white text-White"
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Cards */}
      {filteredCards.length > 2 ? (
        <Slider
          cards={filteredCards.map((item: CategoriesCardType, index) => (
            <LocationCard
              key={index}
              title={item.title}
              address={item.address}
              description={item.description}
              contactDetails={item.contactDetailes}
              btnLink={item.button.link}
              btnText={item.button.text}
            />
          ))}
          num_Of_Cards_in_sm_screen={1}
          num_Of_Cards_in_md_screen={2}
          num_Of_Cards_in_xl_screen={3}
          gap_cards="md:gap-[1.56%] xl:gap-[1.88%] gap-7.5"
        />
      ) : (
        <div className="w-full flex flex-col lg:flex-row justify-between gap-5">
          {filteredCards.map((item: CategoriesCardType, index) => (
            <LocationCard
              key={index}
              title={item.title}
              address={item.address}
              description={item.description}
              contactDetails={item.contactDetailes}
              btnLink={item.button.link}
              btnText={item.button.text}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default OurOfficeFilters;
