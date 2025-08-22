// TestimonialsSection.tsx
import { useDispatch, useSelector } from "react-redux";
import Clients from "../../components/cards/ClientsCard";
import Header from "../../components/sharedComponents/Header";
import Slider from "../../components/sharedComponents/Slider";
import Container from "../../layouts/Container";
import type { TestimonialsSectionType } from "../../types/Home/HomeTypes";
import type { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { subscribeToReviews } from "../../redux/thunks/reviewsThunks";
import ClientsCardSkeleton from "../../components/cards/ClientsCardSkeleton";

const TestimonialsSection = ({ data }: { data: TestimonialsSectionType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToReviews());
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [dispatch]);

  if (error) return <p>error: {error}</p>;

  return (
    <Container>
      <Header
        hash="testimonials"
        title={data.headline}
        description={data.description}
        withBtn
        withIcon
        btnContent={data.button.text}
        link={data.button.link}
      />
      <Slider
        withBtn
        btnContent={data.button.text}
        link={data.button.link}
        cards={
          loading
            ? Array.from({ length: 3 }).map((_, i) => <ClientsCardSkeleton key={i} />)
            : items.length > 0
              ? items.map((review) => (
                <Clients
                  key={review.id}
                  testimonial={{
                    id: review.id,
                    name: review.name,
                    title: review.title,
                    text: review.description,
                    rating: review.rating,
                    avatar: review.profileimage,
                    location: `${review.city}, ${review.country}`,
                    icon: "/assets/icons/star.svg",
                  }}
                />
              ))
              : Array.from({ length: 3 }).map((_, i) => (
                <ClientsCardSkeleton key={i} />
              ))
        }
      />

    </Container>
  );
};

export default TestimonialsSection;
