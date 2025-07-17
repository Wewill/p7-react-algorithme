import { useState, useEffect } from "react";

// Data & algorithm
import recipes from "./data/recipes.json";
import filterRecipes from "./algorithm/filterRecipes";

// Components
import Header from "./component/header";
import Card from "./component/card";
import FilterSelect from "./component/filter-select";
import FilterLabel from "./component/filter-label";

// Helpers
import { sanitize } from "./helpers/helpers";

function App() {
  //
  // Getting recipes data
  //
  const data = recipes;

  //
  // Filtering logic
  //
  type Filter = {
    value: string;
    name: string;
  };

  const [filters, setFilters] = useState<{
    search: string;
    ingredients: Filter[];
    appliances: Filter[];
    ustensils: Filter[];
  }>({
    search: "",
    ingredients: [],
    appliances: [],
    ustensils: [], // Un seul
  });

  const setFilter = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value, // Do not need to clean value to prevent XSS w/ jsx and app context
    }));
  };

  useEffect(() => {
    console.log("Filters changed:", filters);
  }, [filters]);

  const filteredRecipes = filterRecipes(
    data.recipes ?? [],
    filters.search,
    filters.ingredients.map((i) => i.value),
    filters.appliances.map((a) => a.value),
    filters.ustensils.map((u) => u.value)
  );

  return (
    <>
      <Header
        onChange={(filter) => setFilter(filter)} // Clean value to prevent XSS
        onSubmit={() => {}}
        onReset={() => setFilter("")}
      />
      <div className="h-10" />
      <main className="mx-20 my-10">
        <section className="flex flex-row mb-8 justify-stretch">
          <div
            id="filters"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-x-4 gap-y-2"
          >
            {/* Filter for ingredients */}
            <FilterSelect
              id="ingredients"
              label="Ingrédients"
              values={filteredRecipes.reduce<string[]>((acc, cur) => {
                cur.ingredients.forEach((i) => {
                  if (
                    i.ingredient &&
                    !acc.includes(i.ingredient) &&
                    !acc.map(sanitize).includes(sanitize(i.ingredient))
                  ) {
                    acc.push(i.ingredient);
                  }
                });
                return acc;
              }, [])}
              selectedValues={filters.ingredients}
              onChange={(value: string, name: string) =>
                setFilters({
                  ...filters,
                  ingredients: filters.ingredients.some(
                    (item) => item.value === value
                  )
                    ? filters.ingredients.filter((item) => item.value !== value)
                    : [...filters.ingredients, { value, name }],
                })
              }
            />
            {/* Filter for appliances */}
            <FilterSelect
              id="appliances"
              label="Appareils"
              values={[
                ...new Set(
                  filteredRecipes.map((r) => r.appliance).filter(Boolean)
                ),
              ]}
              selectedValues={filters.appliances}
              onChange={(value: string, name: string) =>
                setFilters({
                  ...filters,
                  appliances: filters.appliances.some(
                    (item) => item.value === value
                  )
                    ? filters.appliances.filter((item) => item.value !== value)
                    : [...filters.appliances, { value, name }],
                })
              }
            />
            {/* Filter for utensils */}
            <FilterSelect
              id="ustensils"
              label="Ustensiles"
              values={filteredRecipes.reduce<string[]>((acc, cur) => {
                cur.ustensils.forEach((u) => {
                  if (
                    u &&
                    !acc.includes(u) &&
                    !acc.map(sanitize).includes(sanitize(u))
                  ) {
                    acc.push(u);
                  }
                });
                return acc;
              }, [])}
              selectedValues={filters.ustensils}
              onChange={(value: string, name: string) =>
                setFilters({
                  ...filters,
                  ustensils: filters.ustensils.some(
                    (item) => item.value === value
                  )
                    ? filters.ustensils.filter((item) => item.value !== value)
                    : [...filters.ustensils, { value, name }],
                })
              }
            />
          </div>
          <div className="flex-grow"></div>
          <div id="counter" className="font-Anton text-lg tracking-wide">
            {filteredRecipes.length} recette
            {filteredRecipes && filteredRecipes.length > 1 ? "s" : ""}
          </div>
        </section>
        <div id="labels" className="flex flex-row mb-8 justify-stretch">
          {filters.ingredients.map((option) => (
            <FilterLabel
              key={option.value}
              type="ingredient"
              value={option.value}
              name={option.name}
              onRemove={(value) =>
                setFilters({
                  ...filters,
                  ingredients: filters.ingredients.filter(
                    (item) => item.value !== value
                  ),
                })
              }
            />
          ))}
          {filters.appliances.map((option) => (
            <FilterLabel
              key={option.value}
              type="appliance"
              value={option.value}
              name={option.name}
              onRemove={(value) =>
                setFilters({
                  ...filters,
                  appliances: filters.appliances.filter(
                    (item) => item.value !== value
                  ),
                })
              }
            />
          ))}
          {filters.ustensils.map((option) => (
            <FilterLabel
              key={option.value}
              type="ustensil"
              value={option.value}
              name={option.name}
              onRemove={(value) =>
                setFilters({
                  ...filters,
                  ustensils: filters.ustensils.filter(
                    (item) => item.value !== value
                  ),
                })
              }
            />
          ))}
        </div>

        {/* <pre className="text-green-600 text-xs">
          {JSON.stringify(filters, null, 2)}
        </pre> */}

        <div id="recipes">
          {/* Recipes will be rendered here */}
          <section
            id="cards"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-10"
          >
            {filteredRecipes.map((r) => (
              <Card {...r} />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
