import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="">
          <h1 className="text-xl font-bold text-blue-600">Indie Tools</h1>
        </Link>

        <nav className="space-x-4 text-sm">
          <Link href="/invoice" className="hover:underline">
            My Invoices
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
