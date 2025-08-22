function FAQCardSkeleton() {
  return (
    <div
      className={`bg-Grey-08 border border-Grey-15 rounded-[10px] xl:rounded-xl flex flex-col justify-between xl:gap-7.5 w-full
        p-7.5 md:p-10 xl:p-12.5 animate-pulse`}
    >
      <div className="h-6 md:h-7 xl:h-8 bg-Grey-15 rounded w-3/4" />

      <div className="h-4 md:h-5 xl:h-6 bg-Grey-15 rounded w-full" />
      <div className="h-4 md:h-5 xl:h-6 bg-Grey-15 rounded w-5/6" />

      <div className="h-10 bg-Grey-15 rounded-md w-32 mt-4" />
    </div>
  );
}

export default FAQCardSkeleton;
