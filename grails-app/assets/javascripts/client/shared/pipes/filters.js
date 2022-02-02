angular
  .module("client.shared")
  .filter("secondsToTime", function() {
    return function(input) {
      var sec = parseInt(input, 10);
      if (isNaN(sec)) return "00:00:00";
      var hours = Math.floor(sec / 3600);
      var minutes = Math.floor((sec - hours * 3600) / 60);
      var seconds = sec - hours * 3600 - minutes * 60;
      return (
        ("0" + hours).substr(-2) +
        ":" +
        ("0" + minutes).substr(-2) +
        ":" +
        ("0" + seconds).substr(-2)
      );
    };
  })

  .filter("replaceChar", function() {
    return function(input, from, to) {
      input = input || "";
      from = from || "";
      to = to || "";
      return input.replace(new RegExp(from, "g"), to);
    };
  })

  .filter("limitList", function($filter) {
    return function(objects, limit, showAll) {
      if (showAll) {
        return objects;
      } else {
        return $filter("limitTo")(objects, limit);
      }
    };
  })

  .filter("datatype", function() {
    return function(mimetype) {
      switch (mimetype) {
        case "audio/x-wav":
          return (mimetype = "Audio");
        case "application/pdf":
          return (mimetype = "PDF");
        case "text/eaf+xml":
          return (mimetype = "EAF");
        case "text/x-eaf+xml":
          return (mimetype = "EAF");
        case "text/cmdi+xml":
          return (mimetype = "BUNDLE");
        case "video/mp4":
          return (mimetype = "Video");
        case "image/jpeg":
          return (mimetype = "Image");
        case "text/plain":
          return (mimetype = "Text");
        case "ObjectLanguage":
          return (mimetype = "Language");
        case "MetadataType":
          return (mimetype = "Type");
        case "ResourceMimeType":
          return (mimetype = "Data Type")
        default:
          return mimetype;
      }
    };
  })

  .filter("formatLabel", function() {
    return function(input) {
      // console.log(input);
      if (input) {
        var formatString = input.split(".")[0];
        return formatString;
      }
    };
  });
