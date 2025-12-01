import React from "react";
import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "40vh",
    }}>
      <ThreeDots
        visible={true}
        height="30"
        width="50"
        color="#f7931e"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}

export default Loader;
