import { motion } from 'framer-motion';

function MinimumOrder({ minimumPrice, currentPrice }: { minimumPrice: number; currentPrice: number }) {
  const percentage = (currentPrice / minimumPrice) * 100;

  return (
    <motion.div
      className="w-full flex flex-col justify-between items-center gap-3 py-5"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.3 }}
    >
      <p className="w-full text-sm font-[400] text-center">
        Χρειάζεσαι
        <span className="font-[600]"> {minimumPrice - currentPrice}€ </span>
        ακόμα για την ελάχιστη παραγγελία!
      </p>
      <div className="relative w-full h-[7px] bg-gray-200 rounded-lg">
        <div
          className="absolute top-0 left-0 h-[5px] bg-green rounded-lg transition-all duration-1000 ease-in-out"
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>
    </motion.div>
  );
}
export default MinimumOrder;
