import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { FaPlusSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LuLoader2 } from "react-icons/lu";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getUserAlerts, setData } from "../../apis/firebaseApis";
import { getVanceData } from "../../apis/vanceApis";
import { auth, provider } from "../../firebaseConfig";
import { useAuth } from "../../lib/authContext";
import { CURRENCY_OPTIONS } from "../../lib/constant";
import DropdownMenu from "../common/DropDownMenu";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex items-center justify-center p-3 rounded-full bg-[#7265EE]">
        <p className="text-base font-semibold text-white">{`${label}:  ₹${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Dashboard = () => {
  const [forexData, setForexData] = useState([]);
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [alertValue, setAlertValue] = useState(0);
  const [alertLoading, setAlertLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const { user, loading: authLoading } = useAuth();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const fetchData = async () => {
    const code = currency.currencyName;
    const response = await getVanceData(code);
    setForexData(response);
  };

  const fetchAlerts = async () => {
    const userAlerts = await getUserAlerts(user.email);
    setAlerts(userAlerts);
  };

  useEffect(() => {
    if (user && !alertLoading) {
      setDataLoading(true);
      Promise.all([fetchData(), fetchAlerts()]).then(() => {
        setDataLoading(false);
      });
    }
  }, [user, currency, alertLoading]);

  const modifiedForexData = forexData.map((data) => ({
    ...data,
    resDate: new Date(data.resDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    }),
  }));

  const clearInput = () => {
    setTitle("");
    setAlertValue(0);
  };

  const handleAlertSubmit = async () => {
    if (!title || !alertValue) {
      return;
    }
    setAlertLoading(true);
    const body = {
      title,
      alertValue,
      date: new Date().toISOString(),
      currency: currency.currencyName,
    };
    try {
      await setData(body, user.email);
    } catch (error) {
      console.error("Error setting alert data", error);
    } finally {
      clearInput();
      setOpen(false);
      setAlertLoading(false);
    }
  };
  const isLoading = authLoading || dataLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-dvh bg-[#111] w-full">
        <BiLoaderCircle className="text-5xl text-green-btn animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-hidden bg-[#111] w-full">
      {user ? (
        <div className="flex flex-col items-center justify-start w-[544px] h-screen overflow-scroll my-10">
          <div className="text-3xl font-semibold text-white">
            Rate alert dashboard
          </div>
          <div className="flex flex-col items-start justify-center w-full p-6 gap-y-6 bg-[#222] rounded-3xl mt-12">
            <DropdownMenu currency={currency} setCurrency={setCurrency} />
            <AreaChart
              width={530}
              height={300}
              data={modifiedForexData}
              className="-left-[30px]"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
              />
              <XAxis dataKey="resDate" dy={12} />
              <YAxis dx={-10} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="adjClose"
                stroke="#79E7A5"
                strokeWidth={2}
                fill="rgba(121, 231, 165, 0.15)"
              />
            </AreaChart>
            <div className="flex items-center justify-between w-full">
              <span className="text-3xl font-bold text-white">
                {modifiedForexData.length > 0
                  ? `₹${Number(modifiedForexData[0]?.adjClose).toFixed(2)}`
                  : "₹0.00"}
              </span>
              <button
                className="flex items-center justify-center px-4 text-sm font-bold text-black rounded-full bg-green-btn h-11 gap-x-3"
                onClick={() => setOpen(true)}
              >
                Set alert
                <FaPlusSquare />
              </button>
            </div>
          </div>
          {alerts.length > 0 && (
            <>
              <div className="flex items-center justify-between w-full mt-20">
                <span className="text-lg font-semibold text-white/75">
                  Previous Alerts
                </span>
              </div>
              {alerts
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((alert) => (
                  <div
                    className="flex items-center justify-between h-[154px] w-full p-6 gap-y-6 bg-[#222] rounded-2xl mt-8"
                    key={alert.id}
                  >
                    <div className="flex flex-col items-start justify-between h-full">
                      <div className="flex flex-col gap-y-1">
                        <span className="text-xs font-medium text-white/75">
                          {alert.title}
                        </span>
                        <span className="text-xl font-semibold text-white">
                          ₹{alert.alertValue}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-x-2">
                        <img
                          src={
                            CURRENCY_OPTIONS.find(
                              (option) => option.currencyName === alert.currency
                            ).iconSrc
                          }
                          height={24}
                          width={24}
                        />
                        <span className="font-semibold text-white">
                          {
                            CURRENCY_OPTIONS.find(
                              (option) => option.currencyName === alert.currency
                            ).name
                          }
                        </span>
                        <span className="text-white/50">{`${
                          CURRENCY_OPTIONS.find(
                            (option) => option.currencyName === alert.currency
                          ).symbol
                        }(${
                          CURRENCY_OPTIONS.find(
                            (option) => option.currencyName === alert.currency
                          ).currencyName
                        })`}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start h-full">
                      <div className="flex items-center justify-center gap-x-2">
                        <span className="bg-[#333] p-1 text-white text-lg rounded-lg">
                          {new Date(alert.date).getUTCMonth() + 1}
                        </span>
                        <span className="text-[#757575]/75 text-lg">/</span>
                        <span className="bg-[#333] p-1 text-white text-lg rounded-lg">
                          {new Date(alert.date).getUTCDate()}
                        </span>
                        <span className="text-[#757575]/75 text-lg">/</span>
                        <span className="bg-[#333] p-1 text-white text-lg rounded-lg">
                          {new Date(alert.date).getUTCFullYear() % 100}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-[544px] h-screen gap-y-10">
          <img
            src="/assets/dashboard/megaphone-icon.svg"
            height={200}
            width={200}
            className="object-contain z-[9999]"
          />
          <div
            className="absolute z-10 h-full opacity-40 w-[600px]"
            style={{
              backgroundImage:
                "radial-gradient(50% 50% at 50% 50%, #4602D9 0%, #111 100%)",
              top: "15%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <div className="flex flex-col items-center justify-center gap-y-4">
            <div className="flex flex-col items-center jusity-center">
              <p className="text-[#fff] text-3xl text-center font-bold z-[9999] max-w-80 text-wrap">
                Access
              </p>
              <p className="text-[#fff] text-3xl text-center font-bold z-[9999] max-w-80 text-wrap">
                rate alert dashboard
              </p>
            </div>
            <p className="text-base text-center text-white opacity-75 max-w-80">
              Stay updated with real-time currency rates and manage your alerts.
            </p>
          </div>
          <div
            className="bg-[#333333] flex justify-center items-center gap-x-2 rounded-full w-80 px-4 py-3 cursor-pointer"
            onClick={signInWithGoogle}
          >
            <FcGoogle />
            <span className="text-sm font-bold text-white cursor-pointer">
              Sign in with Google
            </span>
          </div>
          <p className="text-center max-w-60">
            <span className="text-sm text-white opacity-35">
              By creating an account or signing you agree to our{" "}
            </span>
            <span className="text-sm font-bold text-white opacity-50 cursor-pointer">
              Terms and Conditions
            </span>
          </p>
        </div>
      )}

      {user && (
        <Dialog
          open={open}
          as="div"
          className="relative z-[999] focus:outline-none"
          onClose={() => setOpen(false)}
        >
          <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xl" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4">
              <DialogPanel
                transition
                className="w-full max-w-[374px] rounded-2xl bg-[#333] p-6 flex flex-col justify-center items-center gap-y-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <DialogTitle
                  as="h3"
                  className="font-medium text-center text-white text-base/7"
                >
                  Set Rate alert!
                </DialogTitle>

                <div className="flex flex-col items-center justify-center gap-y-3">
                  <img
                    src={currency.iconSrc}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                  <p className="flex items-center justify-center gap-2">
                    <span className="font-semibold text-white">
                      {currency.name}
                    </span>
                    <span className="text-white/50">{`${currency.symbol}(${currency.currencyName})`}</span>
                  </p>
                </div>
                <Field className="flex flex-col items-start justify-center w-full gap-y-4">
                  <Label className="text-[#D5D6DE] text-sm font-semibold pl-2">
                    Title
                  </Label>
                  <Input
                    className=" block w-full rounded-xl border-none bg-white/5 py-3 px-4 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </Field>
                <Field className="flex flex-col items-start justify-center w-full gap-y-4">
                  <Label className="text-[#D5D6DE] text-sm font-semibold pl-2">
                    Rate alert value
                  </Label>
                  <div className="relative w-full">
                    <span className="absolute inset-y-0 flex items-center text-sm text-white left-4">
                      ₹
                    </span>
                    <Input
                      className="block w-full rounded-xl border-none bg-white/5 py-3 pl-7 pr-10 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      onChange={(e) => setAlertValue(e.target.value)}
                      value={alertValue > 0 && alertValue}
                      type="number"
                    />
                  </div>
                </Field>
                <button
                  className="flex items-center justify-center w-full px-4 text-sm text-black rounded-full bg-green-btn h-11 gap-x-3"
                  onClick={handleAlertSubmit}
                >
                  {alertLoading ? (
                    <LuLoader2 className="text-2xl text-black animate-spin" />
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-black">
                        Set alert
                      </span>
                      <FaPlusSquare />
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    clearInput();
                  }}
                >
                  <span className="text-xs font-semibold text-white/50">
                    Cancel
                  </span>
                </button>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Dashboard;
