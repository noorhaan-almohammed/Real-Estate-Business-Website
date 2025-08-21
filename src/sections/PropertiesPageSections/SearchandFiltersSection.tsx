import SearchAndFilters from "../../components/form/FormFieldsComponents/SearchAndFilters"
import { propertiesData } from "../../data/Properties/PropertisData"
import Container from "../../layouts/Container"


function SearchAndFiltersSection() {
    return (
        <Container className="mt-[-40px] lg:mt-[-120px] xl:mt-[-150px] lg:translate-y-[-26.1538%]">
            <SearchAndFilters searchData={propertiesData.searchSection} filterData={propertiesData.searchFilterSection}/>
        </Container>
    )
}

export default SearchAndFiltersSection
