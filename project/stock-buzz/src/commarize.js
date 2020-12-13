
const units = ["K", "M", "B", "T"];
function commarize(num){
  if (num >= 1000) {
    var order = Math.floor(Math.log(num) / Math.log(1000));
    var unitname = units[(order - 1)];
    num = ((num).toFixed(2) / (1000 ** order).toFixed(2)).toFixed(2);
    return num + unitname
  }
  return num;
}


module.exports = commarize;