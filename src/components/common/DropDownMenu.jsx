import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { CURRENCY_OPTIONS } from "../../lib/constant";

export default function DropdownMenu({ currency, setCurrency }) {
  return (
    <div className="relative z-20">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 bg-[#393939] py-2 px-3 text-sm rounded-lg">
          <img
            src={currency.iconSrc}
            alt={currency.name}
            className="w-5 h-5 rounded"
          />
          <span className="font-semibold text-white">{currency.name}</span>
          <span className="text-white/50">{`${currency.symbol}(${currency.currencyName})`}</span>
          <FaChevronDown className="size-4 fill-white" />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="absolute z-20 w-40 mt-2 text-white transition duration-100 ease-out origin-top-right border rounded-xl border-white/5 text-sm/6"
        >
          {CURRENCY_OPTIONS.map((option) => (
            <MenuItem
              key={option.id}
              className="flex items-center justify-between w-full px-3 py-2 bg-[#393939] text-white/80"
              onClick={() => setCurrency(option)}
              as="button"
            >
              <span className="font-semibold text-white">{option.name}</span>
              <span className="text-white/50">{`${option.symbol}(${option.currencyName})`}</span>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
