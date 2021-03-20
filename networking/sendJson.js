const axios = require("axios");

export const sendJson = async (data, port, url = "", ip = "") => {
  // For testing purposes, I don't want a server to try to send requests to my home network,
  // so it'll just get the loopback IP in the block info and always ignore it in flooding
  if (ip === "127.0.0.1") {
    return;
  }
  if (ip === "" && url !== "") {
    let response = await axios({
      method: "post",
      url: url,
      data: data,
    });
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
  }

  //   console.log(response);
};
