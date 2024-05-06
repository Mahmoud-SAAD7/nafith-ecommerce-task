export default function Footer() {
    return (
      <div className="bg-gray-900">
        <div className="container px-4 py-12 mx-auto text-white">
          <div className="text-center">
            <h1 className="mb-8 text-4xl font-bold">How can we help you? Get in touch</h1>
            <p className="max-w-lg mx-auto mb-8 text-gray-400">
              To ensure that all Wikipedia content is verifiable, anyone may question an uncited claim.
              If your work has been tagged.
            </p>
            <a href="#" className="inline-block px-10 py-3 font-semibold text-center transition duration-300 bg-red-500 rounded-lg shadow-lg hover:bg-red-600">Contact Us</a>
          </div>
          <div className="flex flex-col items-center justify-between mt-16 md:flex-row">
            <div className="flex flex-wrap justify-center md:justify-start">
              <a href="#" className="mr-6 text-gray-600 uppercase hover:text-white">About</a>
              <a href="#" className="mr-6 text-gray-600 uppercase hover:text-white">Services</a>
              <a href="#" className="mr-6 text-gray-600 uppercase hover:text-white">Why Us</a>
              <a href="#" className="mr-6 text-gray-600 uppercase hover:text-white">Contact</a>
            </div>
            <p className="mt-8 text-gray-600 md:mt-0">Copyright © 2022 Besnik Creative</p>
          </div>
        </div>
      </div>
    );
  }
  