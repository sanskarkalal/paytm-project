import React from "react";
import { Link } from "react-router-dom";

const BottomWarning = ({ label, text, to }) => {
  return (
    <div className="flex justify-center py-2 text-sm ">
      <div>{label}</div>
      <Link className="pointer underline pl-1" to={to}>{text}</Link>
    </div>
  );
};

export default BottomWarning;
