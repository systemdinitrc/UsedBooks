export default function Page() {

  return(
      <div className="px-4 pt-4 sm:px-8 sm:pt-8 lg:px-10">
        {/* Hero header card */}
        <header className="brutal-card relative overflow-hidden bg-brand-orange p-6 text-foreground sm:p-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div className="min-w-0">
              <h1 className="font-display text-5xl font-bold italic leading-none sm:text-6xl lg:text-7xl">
                Kiddies
              </h1>
              <p className="mt-3 text-lg font-bold sm:text-xl">Hello 👋</p>
            </div>
            <div
              aria-hidden
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] border-foreground bg-tint-pink font-display text-lg font-bold sm:h-14 sm:w-14"
            >
              B
            </div>
          </div>

          <div className="mt-6 max-w-xl">
            {/* <SearchBar value={query} onChange={setQuery} /> */}
          </div>
        </header>

        </div>
  );
}
