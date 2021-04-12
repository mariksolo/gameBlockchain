import { getKnownNodes } from "./getKnownNodes";

export const getInitNodeIP = async () => {
  const knownNodes = await getKnownNodes();
  return knownNodes[0].ip;
};
