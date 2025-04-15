export default function About() {
  return (
    <main className="px-6 py-8">
      <h1 className="text-2xl font-bold text-center mb-4">Welcome to Bookworm</h1>
      <p className="text-center max-w-2xl mx-auto mb-10">
        "Bookworm is an independent New York bookstore and language school with
        locations in Manhattan and Brooklyn. We specialize in travel books and
        language classes."
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-12">
        <div className="max-w-md">
          <h2 className="font-bold text-lg mb-2">Our Story</h2>
          <p className="text-sm text-gray-700 mb-2">
            The name Bookworm was taken from the original name for New York
            International Airport, which was renamed JFK in December 1963.
          </p>
          <p className="text-sm text-gray-700 mb-2">
            Our Manhattan store has just moved to the West Village. Our new location is 170 7th Avenue South, at the corner of Perry Street.
          </p>
          <p className="text-sm text-gray-700">
            From March 2008 through May 2016, the store was located in the Flatiron District.
          </p>
        </div>

        <div className="max-w-md">
          <h2 className="font-bold text-lg mb-2">Our Vision</h2>
          <p className="text-sm text-gray-700 mb-2">
            One of the last travel bookstores in the country, our Manhattan store carries a range of guidebooks (all 10% off) to suit the needs and tastes of every traveler and budget.
          </p>
          <p className="text-sm text-gray-700">
            We believe that a novel or travelogue can be just as valuable a key to a place as any guidebook, and our well-read, well-traveled staff is happy to make reading recommendations for any traveler, book lover, or gift giver.
          </p>
        </div>
      </div>
    </main>
  );
}
