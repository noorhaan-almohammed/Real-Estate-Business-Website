import { useEffect, useState } from "react";
import SearchAndFilters from "../../components/form/FormFieldsComponents/SearchAndFilters";
import { propertiesData } from "../../data/Properties/PropertisData";
import Container from "../../layouts/Container";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { subscribeToProperties } from "../../redux/thunks/propertiesActions";

interface SearchAndFiltersSectionProps {
  onSearchResults: (
    searchTerm: string,
    selectValues: Record<string, string>,
    hasSearched: boolean
  ) => void;
}

function SearchAndFiltersSection({ onSearchResults }: SearchAndFiltersSectionProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectValues, setSelectValues] = useState<Record<string, string>>({});
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToProperties());
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [dispatch]);

  const handleSearch = (term: string, values: Record<string, string>) => {
    setSearchTerm(term);
    setSelectValues(values);
    setHasSearched(true);
    onSearchResults(term, values, true);
  };

  const handleSelectChange = (name: string, value: string) => {
    const updated = { ...selectValues, [name]: value };
    setSelectValues(updated);
    setHasSearched(true);
    onSearchResults(searchTerm, updated, true);
  };

  return (
    <Container className="z-20 mt-[-40px] lg:mt-[-120px] xl:mt-[-150px] lg:translate-y-[-26.1538%]">
      <SearchAndFilters
        searchData={propertiesData.searchSection}
        filterData={propertiesData.searchFilterSection}
        onSearch={handleSearch}
        onSelectChange={handleSelectChange} 
      />
    </Container>
  );
}

export default SearchAndFiltersSection;
