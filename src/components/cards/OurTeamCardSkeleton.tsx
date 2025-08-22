function OurTeamCardSkeleton() {
  return (
    <div className="w-full p-5 lg:p-6 xl:p-7.5 border border-Grey-15 rounded-xl flex flex-col gap-10 lg:gap-12.5 animate-pulse">
      <div className="relative flex justify-center">
        <div className="w-full h-[68.7179vw] md:h-[30vw] lg:h-[15.2778vw] xl:h-[13.1770834vw] bg-Grey-15 rounded-lg" />
        <div className="absolute -bottom-5 xl:-bottom-6.5 left-1/2 -translate-x-1/2 w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-Grey-15" />
      </div>

      <div className="flex flex-col gap-4 lg:gap-5 xl:gap-6 flex-1">
        <div className="flex flex-col gap-2 items-center">
          <div className="h-5 md:h-6 xl:h-7 bg-Grey-15 rounded w-1/2" />
          <div className="h-4 md:h-5 xl:h-6 bg-Grey-15 rounded w-1/3" />
        </div>

        <div className="relative mt-auto">
          <div className="w-full h-14 md:h-12 xl:h-16 bg-Grey-15 rounded-full" />
          <div className="absolute right-2 lg:right-2.5 xl:right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-Grey-20" />
        </div>
      </div>
    </div>
  )
}

export default OurTeamCardSkeleton
