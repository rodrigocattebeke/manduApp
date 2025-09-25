export const generateSignature = async (params, apiSecret) => {
  const sortedKeys = Object.keys(params).sort();
  const paramString = sortedKeys.map((key) => `${key}=${params[key]}`).join("&");

  const toHash = paramString + apiSecret;

  // hash SHA-1
  const data = new TextEncoder().encode(toHash);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return signature;
};
