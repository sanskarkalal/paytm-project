import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () => {
  const [balance, setBalance] = useState("fetching....");

  async function getBalance() {
    const response = await axios.get(
      "http://localhost:3000/api/v1/account/balance",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    setBalance(response.data.balance);
  }

  useEffect(() => {
    getBalance();
  });

  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance:</div>
      <div className="font-semibold ml-2 text-lg">Rs. {balance}</div>
    </div>
  );
};
