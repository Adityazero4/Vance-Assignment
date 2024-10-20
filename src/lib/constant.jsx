import { BiRupee } from "react-icons/bi";
import { GoAlertFill } from "react-icons/go";
import AlertIcon from "../components/Icons/AlertIcon";

export const TABS_DATA = [
  {
    title: "Currency Converter",
    icon: <BiRupee size={18} />,
  },
  {
    title: "Live Rates",
    icon: <AlertIcon size={16} />,
  },
  {
    title: "Set Rate Alert",
    icon: <GoAlertFill size={16} />,
  },
];

export const CURRENCY_OPTIONS = [
  {
    id: 1,
    name: "UK",
    symbol: "£",
    currencyName: "GBP",
    iconSrc: "/assets/dashboard/uk.png",
  },
  {
    id: 2,
    name: "UAE",
    symbol: "د.ك",
    currencyName: "AED",
    iconSrc: "/assets/dashboard/uae.png",
  },
];
