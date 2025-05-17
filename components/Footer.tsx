import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-4 flex justify-center flex-col md:flex-row">
      <div className="text-center text-sm text-gray-500 mb-2 md:mb-0 md:mr-6">
        <nav className="space-x-4 text-sm">
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
      <div className="text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Indie Tools. All rights reserved.{" "}
        <br className="md:hidden" />
        Created by{" "}
        <a
          href="https://velombe.com"
          target={"_blank"}
          className="text-blue-600"
        >
          Velombe
        </a>
      </div>
    </footer>
  )
}

export default Footer
