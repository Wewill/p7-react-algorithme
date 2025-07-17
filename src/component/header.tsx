const Header = ({
  onChange,
  onSubmit,
  onReset,
}: {
  onChange: (filter: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}) => (
  <header
    className="bg-cover bg-center h-[667px] p-10"
    style={{ backgroundImage: "url('header.jpg')" }}
    id="header"
    data-testid="header"
  >
    <div className="logotype font-Anton uppercase text-xl text-white tracking-wide">
      Les petits plats
    </div>
    <div className="flex w-[80%] h-full flex-col justify-center items-center m-auto">
      <h1 className="font-Anton uppercase text-center text-4xl font-bold text-amber-400 mb-6 tracking-wide">
        Cherchez parmi plus de 1500 recettes
        <br />
        du quotidien, simples et délicieuses
      </h1>
      <div className="w-full relative">
        <label className="sr-only">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md p-4 bg-white"
          placeholder="Rechercher une recette, un ingrédient, ..."
        />
        <button
          id="submit"
          type="submit"
          onClick={onSubmit}
          className="absolute right-0 top-0 p-3 px-4 m-1 rounded-md bg-black text-white hover:bg-yellow-500"
        >
          <i className="fa fa-search"></i>
        </button>
        <button
          id="reset"
          type="reset"
          onClick={onReset}
          className="hidden absolute right-0 top-0 p-3 px-4 m-1 mr-12 text-zinc-500 hover:text-black"
        >
          <i className="fa fa-close"></i>
        </button>
      </div>
    </div>
  </header>
);

export default Header;
