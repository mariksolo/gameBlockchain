const axios = require("axios");

export const sendJson = async (data, port, url = "", ip = "") => {
  // if (ip === "127.0.0.1") {
  //   return;
  // }
  if (ip === "" && url !== "") {
    let response = await axios({
      method: "post",
      url: url,
      data: data,
    });
    return response;
  } else if (ip !== "") {
    // TODO: Needs testing
    let response = await axios({
      method: "post",
      url: url,
      data: data,

      proxy: {
        host: ip,
        port: port,
      },
    });
    return response;
  }

  //   console.log(response);
};
