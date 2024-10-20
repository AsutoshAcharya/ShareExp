function getEnv() {
  if (window.location.pathname.includes("localhost"))
    return "http://localhost:8080";
  //later when deployed
  return "";
}
const env = getEnv();

export default env;
