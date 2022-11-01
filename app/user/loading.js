export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex justify-center items-center h-screen bg-pink-300">
      <div className="grid gap-2">
        <div className="flex items-center justify-center ">
          <div className="w-40 h-40 border-t-4 border-b-4 border-pink-900 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
