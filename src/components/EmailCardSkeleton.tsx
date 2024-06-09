export function EmailCardSkeleton() {
  return (
    <div className="w-full my-2 items-start gap-4 border border-gray-200 rounded-lg p-3 dark:border-gray-800 animate-pulse">
      <div className="flex w-full">
        <div className="w-20 h-8 rounded-lg animate-pulse bg-slate-700"></div>
        <div className="w-full ml-4 h-8 rounded-lg animate-pulse bg-slate-700"></div>
      </div>
      <div>
        <div className="flex flex-col items-center justify-cente my-2">
          <div className="font-medium w-full rounded-lg h-4 my-1 bg-slate-700"></div>
          <div className="font-medium w-full rounded-lg h-4 my-1 bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
}
