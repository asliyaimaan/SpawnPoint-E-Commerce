export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-mono">
      {/* Replace the URL below with the one you copied from Supabase */}
      <img 
        src="https://esmcaeovdxcriamenysu.supabase.co/storage/v1/object/public/pictures/Bean%20Eater@1x-1.0s-200px-200px.svg" 
        alt="Loading..." 
        className="w-40 h-40 mb-4"
      />
    </div>
  );
}