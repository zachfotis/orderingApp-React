function MinimumOrder({ minimumPrice, currentPrice }: { minimumPrice: number; currentPrice: number }) {
  const percentage = (currentPrice / minimumPrice) * 100;

  return (
    <div className="w-full flex flex-col justify-between items-center gap-3 py-5">
      <p className="w-full text-sm font-[400] text-center">
        Χρειάζεσαι
        <span className="font-[600]"> {minimumPrice - currentPrice}€ </span>
        ακόμα για την ελάχιστη παραγγελία!
      </p>
      <div className="relative w-full h-[7px] bg-gray-200 rounded-lg">
        <div
          className="absolute top-0 left-0 h-[5px] bg-green rounded-lg"
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
export default MinimumOrder;
