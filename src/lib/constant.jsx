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
