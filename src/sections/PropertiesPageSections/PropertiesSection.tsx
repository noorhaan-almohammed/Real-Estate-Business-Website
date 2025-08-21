import { useDispatch, useSelector } from "react-redux";
import PropertiesCard from "../../components/cards/PropertiesCard";
import Header from "../../components/sharedComponents/Header";
import Slider from "../../components/sharedComponents/Slider";
import Container from "../../layouts/Container";
import type { PropertySliderSection } from "../../types/Properties/PropertiesTypes";
import { useEffect } from "react";
import { subscribeToProperties } from "../../redux/thunks/propertiesActions";
import type { AppDispatch, RootState } from "../../redux/store";
import PropertiesCardSkeleton from "../../components/cards/PropertiesCardSkeleton";

function PropertiesSection({ data }: { data: PropertySliderSection }) {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.properties
  );

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToProperties());
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [dispatch]);

  if (error) return <p>error: {error}</p>;
  return (
    <Container>
      <Header
        hash="properties-portfolio"
        title={data.sectionTitle}
        description={data.sectionDescription}
        withIcon
      />
      <Slider
        cards={
          loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <PropertiesCardSkeleton key={i} />
              ))
            : items.map((property) => (
                <PropertiesCard
                  image={property.imageUrls[0]}
                  title={property.name}
                  fullDescription={property.feature_description}
                  price={"$".concat(property.price.toLocaleString())}
                  discoverDescription={property.tag_description}
                  showInfo={false}
                  btnLink={`/properties/${property.id}`}
                  btnText={`View Property Details`}
                />
              ))
        }
      />
    </Container>
  );
}

export default PropertiesSection;
