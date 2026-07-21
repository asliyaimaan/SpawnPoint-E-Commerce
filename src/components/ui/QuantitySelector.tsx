export default function QuantitySelector({ 
  qty, 
  setQty, 
  size = 'md' // Default to 'md'
}: { 
  qty: number, 
  setQty: (q: number) => void,
  size?: 'sm' | 'md'
}) {
  // Define sizing classes
  const styles = size === 'sm' 
    ? "px-2 py-1 text-xs" 
    : "px-4 py-2 text-base";

  return (
    <div className={`flex border-2 border-black rounded-lg overflow-hidden font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
      <button 
        type="button" 
        onClick={() => setQty(Math.max(1, qty - 1))} 
        className={`cursor-pointer ${styles} bg-[#32c0fc] border-r-2 border-black`}
      >-</button>
      
      <span className={`px-4 py-1 bg-white flex items-center ${size === 'sm' ? 'text-xs' : 'text-base'}`}>
        {qty}
      </span>
      
      <button 
        type="button" 
        onClick={() => setQty(qty + 1)} 
        className={`cursor-pointer ${styles} bg-[#ed687a] border-l-2 border-black`}
      >+</button>
    </div>
  );
}