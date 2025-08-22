import { useState, useMemo, useEffect } from "react"
import Container from "../../layouts/Container"
import PropertiesCard from "../../components/cards/PropertiesCard"
import PropertiesCardSkeleton from "../../components/cards/PropertiesCardSkeleton"

import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import Button from "../../components/sharedComponents/Button"

interface SearchResultsSectionProps {
    searchTerm: string
    selectValues: Record<string, string>
    hasSearched: boolean
    onClearFilters: () => void
}

function SearchResultsSection({ searchTerm, selectValues, hasSearched, onClearFilters }: SearchResultsSectionProps) {
    const { items, loading, error } = useSelector((state: RootState) => state.properties)
    const [currentPage, setCurrentPage] = useState(1)
    const [isSearching, setIsSearching] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const itemsPerPage = 6

    const filtered = useMemo(() => {
        const norm = (v: unknown) => (typeof v === "string" ? v.toLowerCase() : String(v ?? "").toLowerCase())

        const matchesSearch = (p: any) => {
            if (!searchTerm) return true
            const s = searchTerm.toLowerCase()
            return norm(p.name).includes(s) || norm(p.location).includes(s) || norm(p.description).includes(s)
        }

        const withinPrice = (price: number, label: string) => {
            const ranges: Record<string, [number, number | null]> = {
                "$100K - $300K": [100000, 300000],
                "$300K - $500K": [300000, 500000],
                "$500K - $1M": [500000, 1000000],
                "$1M+": [1000000, null],
            }
            const [min, max] = ranges[label] || [0, null]
            return max == null ? price >= min : price >= min && price <= max
        }

        const withinArea = (area: number, label: string) => {
            const ranges: Record<string, [number, number | null]> = {
                "500 - 1000 sqft": [500, 1000],
                "1000 - 2000 sqft": [1000, 2000],
                "2000 - 3000 sqft": [2000, 3000],
                "3000+ sqft": [3000, null],
            }
            const [min, max] = ranges[label] || [0, null]
            return max == null ? area >= min : area >= min && area <= max
        }

        const withinYear = (yearStr: string, label: string) => {
            const y = Number(String(yearStr || "").slice(0, 4))
            const ranges: Record<string, [number, number]> = {
                "2020 - Present": [2020, new Date().getFullYear()],
                "2010 - 2020": [2010, 2020],
                "2000 - 2010": [2000, 2010],
                "1990 - 2000": [1990, 2000],
            }
            const r = ranges[label]
            if (!r) return true
            const [min, max] = r
            return y >= min && y <= max
        }

        const matchesSelects = (p: any) => {
            if (selectValues.location && norm(p.location) !== norm(selectValues.location)) return false
            if (selectValues.propertyType && norm(p.type) !== norm(selectValues.propertyType)) return false
            if (selectValues.priceRange && !withinPrice(Number(p.price ?? 0), selectValues.priceRange)) return false
            if (selectValues.propertySize && !withinArea(Number(p.area ?? 0), selectValues.propertySize)) return false
            if (selectValues.buildYear && !withinYear(p.build_year, selectValues.buildYear)) return false
            return true
        }

        return items.filter((p) => matchesSearch(p) && matchesSelects(p))
    }, [items, searchTerm, selectValues])

    useEffect(() => {
        setCurrentPage(1)
        if (hasSearched) {
            setIsSearching(true)
            setShowResults(true)
            const timer = setTimeout(() => setIsSearching(false), 500)
            return () => clearTimeout(timer)
        }
    }, [searchTerm, selectValues, hasSearched])

    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentItems = filtered.slice(startIndex, endIndex)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleClearFiltersInternal = () => {
        onClearFilters()
        setCurrentPage(1)
        setShowResults(false)
        setIsSearching(false)

        const searchInput = document.querySelector<HTMLInputElement>('input[type="text"]')
        if (searchInput) searchInput.value = ""

        const selects = document.querySelectorAll<HTMLSelectElement>("select")
        selects.forEach((sel) => (sel.value = ""))
    }

    if (!hasSearched || !showResults) return null

    return (
        <Container>
            <div className="-mt-10 md:-mt-20 xl:-mt-35">
                {error && (
                    <div className="text-center mb-8">
                        <p className="text-Red-60 text-lg">Error: {error}</p>
                    </div>
                )}

                {(loading || isSearching) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <PropertiesCardSkeleton key={i} />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold mb-2">
                                    Search Results
                                </h2>

                            </div>
                            <Button content="Clear filters" onClick={handleClearFiltersInternal} withBorder />
                        </div>
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-semibold text-Grey-60 mb-4">No Properties Found</h3>
                            <p className="text-Grey-60">No properties match your search criteria.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mb-8 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold mb-2">
                                    Search Results
                                </h2>
                                <p className="text-Grey-60">
                                    Found {filtered.length} property{filtered.length !== 1 ? "ies" : "y"}
                                    {searchTerm && ` matching "${searchTerm}"`}
                                </p>
                            </div>
                            <Button content="Clear filters" onClick={handleClearFiltersInternal} withBorder />

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 -z-1">
                            {currentItems.map((property) => (
                                <PropertiesCard
                                    key={property.id}
                                    image={property.imageUrls?.[0]}
                                    title={property.name}
                                    fullDescription={property.feature_description}
                                    price={"$".concat(Number(property.price ?? 0).toLocaleString())}
                                    discoverDescription={property.tag_description}
                                    showInfo={false}
                                    btnLink={`/properties/${property.id}`}
                                    btnText={"View Property Details"}
                                />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg border border-Grey-15 text-Grey-60 hover:bg-Grey-10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-4 py-2 rounded-lg border transition-colors ${currentPage === page
                                            ? "bg-Purple-60 text-white border-Purple-60"
                                            : "border-Grey-15 text-Grey-60 hover:bg-Grey-10"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-lg border border-Grey-15 text-Grey-60 hover:bg-Grey-10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Container>
    )
}

export default SearchResultsSection
