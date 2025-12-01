import React from "react";
import { ThreeDots } from "react-loader-spinner";

let valued = "40vh";

function Loader(props) {
  const { login } = props;

  if (login) {
    valued = "10vh";
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `${valued}`,
      }}
    >
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
