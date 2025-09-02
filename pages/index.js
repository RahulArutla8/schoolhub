import Link from 'next/link'

// Home page component
export default function Home() {
  return (
    // Main container: centers content vertically and horizontally
    <div className="h-[80vh] flex items-center justify-center">
      {/* Grid layout: two columns on medium screens and above */}
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl w-full px-8">
        
        {/* Left column: Text content */}
        <div className="space-y-6">
          {/* Main heading with colorful, shiny "SchoolHub" span */}
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Welcome to{" "}
            <span className="underline decoration-wavy bg-gradient-to-br from-yellow-300 via-pink-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg px-2 rounded-lg">
              SchoolHub
            </span>
          </h1>
          {/* Subtitle/description */}
          <p className="text-gray-400 text-lg">
            A clean, responsive interface to add and browse schools.
          </p>
          {/* Action buttons: Add School & Browse Schools */}
          <div className="flex gap-4">
            {/* Add School button with shiny gradient */}
            <Link 
              href="/addSchool" 
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200"
            >
              Add School
            </Link>
            {/* Browse Schools button with shiny gradient */}
            <Link 
              href="/showSchools" 
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold shadow-lg hover:from-yellow-600 hover:to-pink-600 transition-colors duration-200"
            >
              Browse Schools
            </Link>
          </div>
        </div>

        {/* Right column: Hero image */}
        <div className="shadow-lg rounded-lg overflow-hidden">
          <img 
            src="/schoolImages/hero.jpg" // Path to hero image
            alt="Schools" // Alt text for accessibility
            className="w-full h-[400px] object-cover" // Responsive image styling
          />
        </div>
      </div>
    </div>
  )
}
