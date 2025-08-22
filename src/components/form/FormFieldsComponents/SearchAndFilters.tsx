import React from "react";
import type {
  CTAButton,
  SearchFilterSection,
  SearchSection,
} from "../../../types/Properties/PropertiesTypes";
import SearchSelect from "./SearchSelect";

interface Props {
  searchData: SearchSection;
  filterData: SearchFilterSection;
  onSearch?: (searchTerm: string, selectValues: Record<string, string>) => void;
  onSelectChange?: (name: string, value: string) => void;
}

const SearchAndFilters: React.FC<Props> = ({
  searchData,
  filterData,
  onSearch,
  onSelectChange,
}) => {
  if (!searchData || !filterData) return null;

  const { searchField, searchButton } = searchData;
  const { formFields } = filterData;

  const renderButton = (btn: CTAButton) => (
    <button
      className="flex items-center text-sm lg:text-lg font-medium justify-center gap-2 w-fit lg:w-46 h-[63px] px-5 py-3.5 xl:px-6 xl:py-4.5 rounded-[10px] bg-Purple-60 text-white hover:bg-gradient-to-br 
      hover:from-40% hover:from-Purple-65/65
      hover:via-50% hover:via-Purple-75 
      hover:to-70% hover:to-Purple-65/65
      bg-[length:200%_200%] bg-[position:0%_0%]
      transition-[background-position] duration-500 ease-in-out
      hover:bg-[position:100%_100%]"
      onClick={() => {
        const searchInput = document.getElementById(
          searchField.id
        ) as HTMLInputElement | null;
        const searchTerm = searchInput?.value.trim() || "";
        const selectValues = formFields.reduce((acc, field) => {
          if (field.type === "select") {
            const el = document.querySelector(
              `select[name="${field.id}"]`
            ) as HTMLSelectElement | null;
            acc[field.id] = el?.value || "";
          }
          return acc;
        }, {} as Record<string, string>);
        onSearch?.(searchTerm, selectValues);
      }}
    >
      {btn.icon && (
        <img
          src={btn.icon.toString()}
          alt="search icon"
          className="w-5 h-5 lg:w-6 lg:h-6"
        />
      )}
      <span className="min-w-max hidden lg:flex text-sm xl:text-lg font-medium ">
        {btn.text}
      </span>
    </button>
  );

  return (
    <div className="flex flex-col gap-y-5 lg:gap-y-0">
      <div className="mx-auto w-full lg:max-w-[81.45363%]">
        <div className="relative w-full h-[80px] xl:h-[103px]">
          <input
            type={searchField.type}
            id={searchField.id}
            placeholder={searchField.placeholder}
            className="pl-3.5 md:pl-5 xl:pl-6 w-full h-full text-base md:text-xl rounded-xl lg:rounded-b-none border border-Grey-15 
            shadow-[0px_0px_0px_4px_var(--color-Grey-10)] lg:shadow-[0px_0px_0px_10px_var(--color-Grey-10)] bg-Grey-08 placeholder:text-Grey-60 focus:outline-none"
          />
          <div className="absolute top-1/2 right-[20px] transform -translate-y-1/2 ">
            {renderButton(searchButton)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-[10px] p-3.5 rounded-xl bg-Grey-10">
        {formFields.map(
          (field) =>
            field.type === "select" && (
              <SearchSelect
                key={field.id}
                field={{
                  ...field,
                  onChange: onSelectChange,
                }}
              />
            )
        )}
      </div>
    </div>
  );
};

export default SearchAndFilters;
