exports.javaDateToJavascriptDate = function(javaDate) {
  var dayOfWeek = javaDate.split(" ")[0]
  var month = javaDate.split(" ")[1]
  var day = javaDate.split(" ")[2]
  var time = javaDate.split(" ")[3]
  var year = javaDate.split(" ")[5]

  var javascriptDateString = dayOfWeek + ", " + day + " " + month + " " + year + " " + time
  console.log(javascriptDateString)
  return new Date(javascriptDateString)
}
