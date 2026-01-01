function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-background border-t border-border py-12 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-300">
            © {currentYear} Flashcards Reinvented. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
