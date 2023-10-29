export default function Navbar() {
  return (
    <>
      <div className="flex items-center p-[0.5rem] min-h-[4rem] w-full bg-[#1d232a]">
        <div className="mr-6 justify-start p-2">
          <a href='/' className="font-bold normal-case text-2xl">Sitename</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex-wrap font-medium text-base p-2 inline-flex flex-row px-1 gap-4">
            <li>
              <a class='[data-current]:text-green-600'  href="/">Dashboard</a>
            </li>
            <li>
            <a class='[data-current]:text-green-600' href="/products">Products</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
