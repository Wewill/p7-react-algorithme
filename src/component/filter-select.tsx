import { useState, useEffect, useRef } from "react";
import { sanitize, capitalize } from "../helpers/helpers";

type FilterSelectProps = {
  id: "ingredients" | "appliances" | "ustensils";
  label: string;
  values: string[];
  selectedValues: { value: string; name: string }[];
  onChange: (value: string, name: string) => void;
};

const FilterSelect = ({
  id,
  label,
  values,
  selectedValues,
  onChange,
}: FilterSelectProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredValues = searchTerm
    ? values.filter((v) => v.toLowerCase().includes(searchTerm.toLowerCase()))
    : values;

  const isSelected = (value: string) =>
    (selectedValues ?? []).some((option) => option.value === sanitize(value));

  return (
    <div
      className="h-[50px] w-[195px] relative cursor-pointer z-10"
      id={id}
      ref={dropdownRef}
    >
      <button
        id={`button_${id}`}
        type="button"
        aria-expanded={dropdownOpen}
        title="Bouton pour ouvrir le menu déroulant"
        className={`p-3 h-[50px] bg-white w-full flex justify-between items-center ${
          dropdownOpen ? "rounded-t-md" : "rounded-md"
        }`}
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <label>{label}</label>
        <i
          className={`fa-solid ${
            dropdownOpen ? "fa-chevron-up" : "fa-chevron-down"
          }`}
          aria-hidden="true"
        ></i>
      </button>

      <div
        id={`dropdown_${id}`}
        className={`absolute top-0 left-0 mt-[50px] w-[195px] shadow-md bg-white flex flex-col max-h-[300px] overflow-x-scroll ${
          dropdownOpen ? "block rounded-b-md" : "hidden"
        }`}
      >
        <label className="flex m-4 mt-2 relative">
          <input
            id={`search_${id}`}
            name={label}
            placeholder="Filtrer..."
            className="rounded-sm border border-zinc-300 p-1 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-2 top-1 text-zinc-300 hover:text-black">
            <i className="fa fa-search"></i>
          </div>
          {searchTerm && (
            <button
              type="button"
              className="absolute right-8 top-1 text-zinc-300 hover:text-black"
              onClick={() => setSearchTerm("")}
            >
              <i className="fa fa-close"></i>
            </button>
          )}
        </label>

        <ul id={`list_${id}`} role="listbox" className="rounded-md bg-white">
          {[...filteredValues].sort().map((value) => {
            const sanitizedValue = sanitize(value);
            const displayName = capitalize(value);
            const selected = isSelected(value);

            return (
              <li
                key={sanitizedValue}
                data-value={sanitizedValue}
                data-name={displayName}
                data-selected={selected}
                id={sanitizedValue}
                className={`py-2 px-4 border-b text-sm flex justify-between items-center cursor-pointer ${
                  selected ? "bg-yellow-400" : ""
                }`}
                onClick={() => onChange(sanitizedValue, displayName)}
              >
                {displayName}
                {selected && (
                  <button
                    type="button"
                    className="text-yellow-400 rounded-full bg-black w-4 h-4 flex justify-center items-center"
                  >
                    <i className="fa fa-close text-xs"></i>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FilterSelect;
