// eslint-disable-next-line react/prop-types
const Paginator = ({ productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="flex justify-center mt-4">
        <ul className="flex items-center">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className="px-4 py-2 mx-1 font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
export default Paginator 