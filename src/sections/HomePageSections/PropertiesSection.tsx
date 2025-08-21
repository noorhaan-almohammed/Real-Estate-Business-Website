import { useDispatch, useSelector } from "react-redux";
import PropertiesCard from "../../components/cards/PropertiesCard";
import Header from "../../components/sharedComponents/Header";
import Slider from "../../components/sharedComponents/Slider";
import Container from "../../layouts/Container";
import type { FeaturedPropertiesSectionType } from "../../types/Home/HomeTypes";
import type { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import Bedroom from "../../svg/Bedroom";
import Bathroom from "../../svg/Bathroom";
import Villa from "../../svg/Villa";
import { subscribeToProperties } from "../../redux/thunks/propertiesActions";
import PropertiesCardSkeleton from "../../components/cards/PropertiesCardSkeleton";

function PropertiesSection({ data }: { data: FeaturedPropertiesSectionType }) {
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
        hash="properties"
        title={data.headline}
        description={data.description}
        withIcon
        withBtn
        btnContent={data.button.text}
        link={data.button.link}
      />
      <Slider
        withBtn
        btnContent={data.button.text}
        link={data.button.link}
        cards={
          loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <PropertiesCardSkeleton key={i} />
              ))
            : items.map((property) => (
                <PropertiesCard
                  key={property.id}
                  image={property.imageUrls[0]}
                  title={property.name}
                  fullDescription={property.description}
                  price={"$".concat(property.price.toLocaleString())}
                  details={[
                    {
                      icon: <Bedroom />,
                      label: property.bedrooms.toString().concat("-BedRoom"),
                    },
                    {
                      icon: <Bathroom />,
                      label: property.bathrooms.toString().concat("-BathRoom"),
                    },
                    { icon: <Villa />, label: property.type },
                  ]}
                  showInfo={true}
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
