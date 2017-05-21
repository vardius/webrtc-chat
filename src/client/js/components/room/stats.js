function getStats(peers, counter) {
  _getStats(peer, function (results) {
    for (var i = 0; i < results.length; ++i) {
      var res = results[i];

      if (res.googCodecName == 'opus') {
        if (!window.prevBytesSent)
          window.prevBytesSent = res.bytesSent;

        var bytes = res.bytesSent - window.prevBytesSent;
        window.prevBytesSent = res.bytesSent;

        var kilobytes = bytes / 1024;
        console.log(kilobytes.toFixed(1) + ' kbits/s');
      }
    }

    setTimeout(function () {
      getStats(peer);
    }, 1000);
  });
}

function _getStats(peer, cb) {
  if (navigator.mozGetUserMedia) {
    peer.getStats(
      function (res) {
        var items = [];
        res.forEach(function (result) {
          items.push(result);
        });
        cb(items);
      },
      cb
    );
  } else {
    peer.getStats(function (res) {
      var items = [];
      res.result().forEach(function (result) {
        var item = {};
        result.names().forEach(function (name) {
          item[name] = result.stat(name);
        });
        item.id = result.id;
        item.type = result.type;
        item.timestamp = result.timestamp;
        items.push(item);
      });
      cb(items);
    });
  }
}
