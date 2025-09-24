export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            © 2024 Scrap Market. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-600">Terms</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}