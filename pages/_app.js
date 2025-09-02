import '@/styles/globals.css'      // Import global styles (Tailwind CSS)
import Navbar from '@/components/Navbar' // Import Navbar component

// Custom App component: wraps all pages in Next.js
export default function App({ Component, pageProps }) {
  return (
    // Main layout container: full height, flex column
    <div className="min-h-screen flex flex-col">
      {/* Navbar at the top, sticky and styled */}
      <Navbar />
      {/* Main content area: grows to fill space, uses container styles */}
      <main className="flex-1 container-nice py-6">
        {/* Render the current page */}
        <Component {...pageProps} />
      </main>
      {/* Footer at the bottom */}
      <footer className="border-t border-gray-200 dark:border-gray-800 text-sm py-4 text-center">
        Built for the Web Development Assignment
      </footer>
    </div>
  )
}
