import type { Recipe } from "../types/recipe";
import Image from "./image";

const Ingredient = ({ i }: { i: Recipe["ingredients"][number] }) => (
  <li>
    {i.ingredient ? i.ingredient : ""}
    <span className="text-gray-500 block">
      {i.quantity ? i.quantity : ""}
      {i.unit ? " " + i.unit : ""}
    </span>
  </li>
);

const Card = (r: Recipe) => {
  return (
    <div className="card bg-white shadow-smooth rounded-2xl">
      <div className="card-header h-[250px] rounded-t-2xl relative ">
        <Image
          src={`/recipes/${r.image}`}
          alt={r.name}
          className="object-cover object-center w-full h-full rounded-t-2xl pointer-events-none"
        />
        <div className="badge rounded-full bg-yellow-400 font-light absolute px-3 py-1 top-6 right-6">
          {r.time}min
        </div>
      </div>
      <div className="card-content p-6">
        <h2 className="font-Anton text-xl tracking-wide mt-3 mb-6">{r.name}</h2>

        <h6 className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">
          Recette
        </h6>
        <p className="mb-8">{r.description}</p>

        <h6 className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">
          Ingrédients
        </h6>
        <ul className="grid grid-cols-2 gap-4">
          {r.ingredients.map((i, idx) => (
            <Ingredient key={idx} i={i} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
