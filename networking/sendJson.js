const axios = require("axios");

export const sendJson = async (ip, block) => {
  // For testing purposes, I don't want a server to try to send requests to my home network,
  // so it'll just get the loopback IP in the block info and always ignore it in flooding
  if (ip === "127.0.0.1") {
    return;
  }
  let response = await axios({
    method: "post",
    url: "/blocks",
    data: {
      block:
        block,
    },

    proxy: {
      host: ip,
      port: 3000,
    },
  });

//   console.log(response);
};
