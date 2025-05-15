const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-4">
      <div className="text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Indie Tools. All rights reserved.
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
