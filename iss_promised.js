const request = require("request-promise-native");

const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = (body) => {
  const content = JSON.parse(body);
  return request(`http://ipwho.is/${content.ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const coords = JSON.parse(body);
  return request(
    `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
  );
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => JSON.parse(data).response);
};

module.exports = { nextISSTimesForMyLocation };
