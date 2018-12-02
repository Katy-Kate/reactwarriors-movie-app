import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ type, color }) => (
  <div className="loader d-flex justify-content-center align-items-center">
    <ReactLoading type={type} color={color} height={17} width={35} />
  </div>
);

export default Loader;
