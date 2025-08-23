import Container from '../../layouts/Container'
import OurTeamCard from '../../components/cards/OurTeamCard'
import Header from '../../components/sharedComponents/Header'
import type { MeetEstateinTeamCardSectionType } from '../../types/About/AboutType'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { useEffect } from 'react'
import { subscribeToTeam } from '../../redux/thunks/teamActions'
import OurTeamCardSkeleton from '../../components/cards/OurTeamCardSkeleton'

const OurTeam = ({ data }: { data: MeetEstateinTeamCardSectionType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToTeam());
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;
  
  return (
    <Container>
      <Header hash='team' title={data.headline} description={data.description} withIcon />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-7.5'>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <OurTeamCardSkeleton key={i} />)
          : items.length > 0
            ? items.map((item,index) => (
              <OurTeamCard key={item.id} item={item} data-aos="fade-up"
                data-aos-delay={index * 200}/>
            )): Array.from({ length: 4 }).map((_, i) => (
              <OurTeamCardSkeleton key={i} />
            ))
        }
      </div>
    </Container>
  )
}

export default OurTeam
