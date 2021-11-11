//import Raven from "..";

function init() {
  //scrpy raven
}

function log(error) {
  //can see unexpected errors when deployed apps
  //Raven.captureException(error)
  console.log("Logging the error", error);
}

export default {
  init,
  log,
};
