
const ClientsCardSkeleton = () => {
  return (
    <div className="w-full bg-Grey-08 border border-Grey-15 rounded-xl p-7.5 md:p-10 xl:p-12.5 flex flex-col justify-between gap-6 md:gap-7.5 xl:gap-10 animate-pulse">
      <div className="flex gap-2 xl:gap-2.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-full bg-Grey-15 border border-Grey-15 p-1.5 md:p-2 xl:p-2.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] md:w-[20px] xl:w-[24px] text-Grey-40"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.402 8.178L12 18.897l-7.336 3.858 1.402-8.178L.132 9.21l8.2-1.192z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2.5 xl:gap-3.5">
        <div className="h-5 w-2/3 bg-Grey-15 rounded" />
        <div className="h-4 w-full bg-Grey-15 rounded" />
        <div className="h-4 w-5/6 bg-Grey-15 rounded" />
      </div>

      <div className="flex items-center gap-2.5 xl:gap-3">
        <div className="w-12.5 h-12.5 xl:w-15 xl:h-15 rounded-full bg-Grey-15" />
        <div className="flex flex-col gap-1">
          <div className="h-4 w-24 bg-Grey-15 rounded" />
          <div className="h-4 w-32 bg-Grey-15 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ClientsCardSkeleton;
