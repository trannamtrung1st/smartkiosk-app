function getTotalSecondFromTimeStr(timeStr, hour0convert = 0) {
  const parts = timeStr.split(":");
  let hour = parseInt(parts[0]);
  hour = hour == 0 ? hour0convert : hour;
  const min = parseInt(parts[1]);
  const sec = parseInt(parts[2]);
  return hour * 3600 + min * 60 + sec;
}

export default {
  getTotalSecondFromTimeStr,
};
