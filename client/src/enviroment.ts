function getEnv() {
  console.log(window.location);
  if (window.location.href.includes("localhost"))
    return "http://localhost:8800";
  //later when deployed
  return "";
}
const env = getEnv();

export default env;
