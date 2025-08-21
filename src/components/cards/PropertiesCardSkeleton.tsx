function PropertiesCardSkeleton() {
  return (
    <div className="w-full h-full bg-Grey-08 border border-Grey-15 p-6 md:p-7.5 xl:p-10 rounded-xl animate-pulse">
      <div className="w-full h-[210px] md:h-[255px] xl:h-[318px] bg-Grey-15 rounded-[10px]" />
      <div className="mt-5 space-y-3">
        <div className="h-5 w-3/4 bg-Grey-15 rounded" />
        <div className="h-4 w-full bg-Grey-15 rounded" />
        <div className="h-4 w-5/6 bg-Grey-15 rounded" />
      </div>
      <div className="flex gap-2 flex-wrap mt-4">
        <div className="h-7 w-20 bg-Grey-15 rounded-full" />
        <div className="h-7 w-24 bg-Grey-15 rounded-full" />
        <div className="h-7 w-16 bg-Grey-15 rounded-full" />
      </div>
      <div className="flex justify-between items-center mt-6">
        <div>
          <div className="h-4 w-12 bg-Grey-15 rounded mb-2" />
          <div className="h-6 w-24 bg-Grey-15 rounded" />
        </div>
        <div className="h-10 w-28 bg-Grey-15 rounded-lg" />
      </div>
    </div>
  );
}

export default PropertiesCardSkeleton;
