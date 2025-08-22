import { contactFormSection, contactFormSectionHeader, propertiesData } from "../data/Properties/PropertisData";
import ContactForm from "../sections/Contact/ContactForm";
import PropertiesSection from "../sections/PropertiesPageSections/PropertiesSection";
import SearchAndFiltersSection from "../sections/PropertiesPageSections/SearchandFiltersSection";
import SearchResultsSection from "../sections/PropertiesPageSections/SearchResultsSection";

import HeaderHero from "../sections/sharedSections/HeaderHero";
import { useState } from "react";

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectValues, setSelectValues] = useState<Record<string, string>>({})
  const [hasSearched, setHasSearched] = useState<boolean>(false)

  const handleSearchResults = (search: string, selects: Record<string, string>, searched: boolean) => {
    setSearchTerm(search)
    setSelectValues(selects)
    setHasSearched(searched)
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectValues({})
    setHasSearched(false)
    
    // Clear the search input
    const searchInput = document.getElementById("property-search") as HTMLInputElement | null
    if (searchInput) {
      searchInput.value = ""
    }
    
    // Clear all select inputs and reset their internal state
    const selectNames = ["location", "propertyType", "priceRange", "propertySize", "buildYear"]
    selectNames.forEach((name) => {
      const selectInput = document.querySelector(`input[name="${name}"]`) as HTMLInputElement | null
      if (selectInput) {
        selectInput.value = ""
        // Trigger clear event to update internal state
        selectInput.dispatchEvent(new Event('clear', { bubbles: true }))
      }
    })
    
    // Force re-render of SearchSelect components
    setTimeout(() => {
      const selectContainers = document.querySelectorAll('[data-select-container]')
      selectContainers.forEach(container => {
        const input = container.querySelector('input')
        if (input) {
          input.value = ""
          input.dispatchEvent(new Event('clear', { bubbles: true }))
        }
      })
    }, 50)
  }

  return (
    <div className="space-y-20 md:space-y-30 xl:space-y-37.5">
      
        <HeaderHero
          title="Find Your Dream Property"
          description="Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey"
        />
        <SearchAndFiltersSection onSearchResults={handleSearchResults}/>
        
        <SearchResultsSection 
          searchTerm={searchTerm}
          selectValues={selectValues}
          hasSearched={hasSearched}
          onClearFilters={handleClearFilters}
        />
        <PropertiesSection data={propertiesData.propertySliderSection}/>
        <ContactForm title={contactFormSectionHeader.title}
          description={contactFormSectionHeader.description} data={contactFormSection.conactForm} areaText={contactFormSection.areaText} properties />
      
    </div>
  );
};

export default Properties;
