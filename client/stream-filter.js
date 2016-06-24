// input data stream, collect at least 2 secs of data,
// find mean: average, mode: most often, and median: middle value
// if the data rate is 200 items/seconds, we need get 400 items


function streamFilter() {
  var streamRate = 200; // items input coming per second
  var bufferSize = streamRate * 2;  // buffering 2 seconds of data
  var buffer = [];
  var sorted = [];
  var summary = 0;
  return {
    dump: function() {
      console.log(buffer);
      console.log(sorted);
    },

    getMean: function() {
      return summary / buffer.length;
    },

    putItem: function(d) {
      // push data into buffer, return buffered length
      if (buffer.length >= bufferSize) {
        summery -= buffer.shift();
      }
      buffer.push(d);
      summary += d;

      // sort buffer
      sorted = buffer.slice().sort(function(a, b) {
        return a - b;
      });
      return buffer.length;
    }
  }
}

var filter = new streamFilter();
var data = [2, 3, 5, 1];
for (var i in data) {
  filter.putItem(data[i]);
}
filter.dump();
