import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/sharedComponents/Header";
import Container from "../../layouts/Container";
import Slider from "../../components/sharedComponents/Slider";
import FAQCard from "../../components/cards/FAQCard";
import type { FaqSectionType } from "../../types/Home/HomeTypes";
import type { AppDispatch, RootState } from "../../redux/store";
import { subscribeToFaqs } from "../../redux/thunks/faqsActions";
import FAQCardSkeleton from "../../components/cards/FAQCardSkeleton";

const FAQSection = ({ data }: { data: FaqSectionType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.faqs
  );

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToFaqs());
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Header
        hash="faqs"
        title={data.headline}
        description={data.description}
        withIcon
        withBtn={true}
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
              <FAQCardSkeleton key={i} />
            )) :
            items.length > 0
              ? items.map((faq,index) => (
                <FAQCard
                  key={faq.id}
                  faq={faq}
                  showButton={true}
                  withShadow={false}
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                />
              ))
              : Array.from({ length: 3 }).map((_, i) => (
                <FAQCardSkeleton key={i} />
              ))
        }
      />
    </Container>
  );
};

export default FAQSection;
