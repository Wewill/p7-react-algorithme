import type { MouseEvent } from "react";

type FilterLabelProps = {
  type: "ingredient" | "appliance" | "ustensil";
  value: string;
  name: string;
  onRemove: (value: string) => void;
};

const FilterLabel = ({ type, value, name, onRemove }: FilterLabelProps) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onRemove(value);
  };

  return (
    <div
      className="label rounded-md bg-yellow-400 font-normal px-5 py-3 mr-4 cursor-pointer flex items-center"
      data-type={type}
      data-value={value}
    >
      <span>{name}</span>
      <button type="button" className="ml-4" onClick={handleClick}>
        <i className="fa fa-close" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default FilterLabel;
