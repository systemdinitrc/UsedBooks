import './globals.css'
import  Sidebar  from './components/Sidebar';
import MobileNav from './components/MobileNav';
export default function RootLayout({
  children,
}: {
    children: React.ReactNode
  }) {

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background">
          <div className="flex">
            <Sidebar />

            <main className="flex-1">
              <div className="mx-auto max-w-7xl px-6">
                {children}
              </div>

            </main>
          </div>

          <MobileNav />
        </div>
      </body>
    </html>
  )
}
