export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gray-200" />
              <div>
                <div className="h-7 w-32 rounded bg-gray-200" />
                <div className="mt-2 h-4 w-80 rounded bg-gray-200" />
              </div>
            </div>
            <div className="h-10 w-36 rounded-lg bg-gray-200" />
          </div>

          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="h-10 w-64 rounded-lg bg-gray-200" />
                <div className="h-10 w-24 rounded-lg bg-gray-200" />
              </div>
              <div className="h-10 w-40 rounded-lg bg-gray-200" />
            </div>

            <div className="mt-6 space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-4 w-4 rounded bg-gray-200" />
                  <div className="h-4 w-40 rounded bg-gray-200" />
                  <div className="h-4 w-56 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-4 w-12 rounded bg-gray-200" />
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded bg-gray-200" />
                    <div className="h-8 w-8 rounded bg-gray-200" />
                    <div className="h-8 w-8 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
