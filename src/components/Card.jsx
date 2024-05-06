export default function Card() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full p-12 bg-gray-900 rounded-lg sahdow-lg">
        <div className="mb-8">
          <img
            className="object-cover object-center rounded-full h-36 w-36"
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
            alt="photo"
          />
        </div>
        <div className="text-center">
          <p className="mb-2 text-xl font-bold text-white">Dany Bailey</p>
          <p className="text-base font-normal text-gray-400">Software Engineer</p>
        </div>
      </div>
    </div>
  );
}
