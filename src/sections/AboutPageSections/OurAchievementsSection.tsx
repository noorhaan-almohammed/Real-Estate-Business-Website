import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../layouts/Container";
import FAQCard from "../../components/cards/FAQCard";
import Header from "../../components/sharedComponents/Header";
import type { OurAchievementsSectionType } from "../../types/About/AboutType";
import type { AppDispatch, RootState } from "../../redux/store";
import { subscribeToAchievements } from "../../redux/thunks/achievementsActions";
import FAQCardSkeleton from "../../components/cards/FAQCardSkeleton";

const OurAchievementsSection = ({ data }: { data: OurAchievementsSectionType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.achievements);

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToAchievements());
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [dispatch]);

  if (error) return <p>error: {error}</p>;

  return (
    <Container>
      <Header
        hash="works"
        title={data.headline}
        description={data.description}
        withIcon
      />
      <div className="flex flex-col lg:flex-row gap-y-5 justify-between">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <FAQCardSkeleton key={i} />)
          : items.length > 0
            ? items.map((item,index) => (
              <FAQCard
                key={item.id}
                faq={{
                  id: item.id,
                  question: item.title,
                  answer: item.description,
                  readMoreLink: "#",
                  btnText: "",
                }}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                withShadow={true}
                showButton={false}
              />
            ))
            : Array.from({ length: 3 }).map((_, i) => (
              <FAQCardSkeleton key={i} />
            ))
        }
      </div>
    </Container>
  );
};

export default OurAchievementsSection;
