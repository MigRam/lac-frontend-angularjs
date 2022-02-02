//= wrapped

angular.module("client.shared").factory("leafletService", leafletService);

leafletService.$inject = ["leafletData", "contextPath", "$log", "$state"];

function leafletService(leafletData, contextPath, $log, $state) {
  
  var svc = this;

  svc.contextPath = contextPath;

  var markerclusterConfig = L.markerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    maxClusterRadius: 15,
    removeOutsideVisibleBounds: false,
    animate: false,
    zoomToBoundsOnClick: true,
    singleMarkerMode: false
  });

  markerclusterConfig.on("clusterclick", function(a) {
    a.layer.spiderfy();
  });

  var customZoomButton = L.Control.extend({
    options: { position: "topleft" },
    onAdd: function(map) {
      var container = L.DomUtil.create(
        "button",
        "button is-small leaflet-bar leaflet-button-control"
      );

      container.type = "button";
      container.style.cursor = "pointer";
      container.title = "Click to fit world map";
      container.insertAdjacentHTML("beforeend", '<i class="fa fa-map"></i>');

      container.onclick = function(e) {
        e.preventDefault();
        var mapZoomValue = map.getZoom();

        if (mapZoomValue !== 1) {
          map.fitWorld().setView([0, 0], 1);
        }
      };

      return container;
    }
  });

  var cdnIcon = L.icon({
		iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png",
		shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/images/marker-shadow.png",
		iconSize: [25, 41],
		iconAnchor: [13, 41]
	});

  /** */
  function initMap(mapId) {
    leafletData
      .getMap(mapId)
      .then(function(map) {
        map.addControl(new customZoomButton());
        map.addLayer(markerclusterConfig);
        removeClusters();
      })
      .catch(function(error) {
        $log.error(error);
      });
  }

  function generateSingleMarker(id, data) {
    for (var j = 0; j < data.length; j++) {
      var geolocation = new String(data[j].GeoLocation);
      var lat = geolocation.split(",")[0];
      var lng = geolocation.split(",")[1];

      leafletData
        .getMap(id)
        .then(function(map) {
          if (lat === undefined || lng === undefined) {
            lat = 0;
            lng = 0;
          } else {
            L.marker(L.latLng(lat, lng),{
              icon: cdnIcon
            }).addTo(map);
          }

          /** disable any interaction with map */
          map._handlers.forEach(function(handler) {
            handler.disable();
          });

          map.setView([lat, lng], 4);
        })
        .catch(function(error) {
          $log.error(error);
        });
    }
  }

  function generateMarkerCluster(geodata) {

    angular.forEach(geodata, function(data) {
      if (data.Keywords !== undefined) {
        var Keywords = data.Keywords.slice(0, 3).sort().join(", ");
      }

      if (data.ObjectLanguage !== undefined) {
        var Languages = data.ObjectLanguage.slice(0, 3).sort().join(" , ");
      }

      if (data.Description !== undefined) {
        var Description = data.Description.toString().split(".")[0];
      }

      if (data.id !== undefined) {
        var id = data.id.toString().replace("hdl:", "");
      }

      if( data.MetadataType !== undefined) {
        var type = data.MetadataType.toString().toLowerCase();
      }

      
      var markerContent = [
        '<i class="fas fa-link"></i>',
        '<a class="subtitle is-size-6" href="' + svc.contextPath + "/" + type + "/" + id + 
          '" title="View details of ' + data.Title + '">' + data.Title + "</a><br />",
        "<p>" + 
          "<small class='has-text-grey'>Description: </small>"+ Description + ". ..." + "<br />" +
          "<small class='has-text-grey'>Languages: </small>"+ Languages + "<br />" + 
          "<small class='has-text-grey'>Keywords: </small>"+ Keywords + "</p>"
      ].join(" ");
  
      var geolocation = data.GeoLocation[0];
      var lat = geolocation.split(",")[0];
      var lng = geolocation.split(",")[1];

      var marker = L.marker([lat, lng], {
        icon: cdnIcon
      }).bindPopup(markerContent);

      markerclusterConfig.addLayer(marker);
    });
  }

  function removeClusters() {
    markerclusterConfig.clearLayers();
    markerclusterConfig.refreshClusters();
  }

  function queryMap(id, response) {
    leafletData
      .getMap(id)
      .then(function(map) {
        removeClusters();
        generateMarkerCluster(response);
        var zoom = 1;
        map.setView([0, 0], zoom);
      })
      .catch(function(error) {
        $log.error(error);
      });
  }

  return {
    removeClusters: removeClusters,
    initMap: initMap,
    generateSingleMarker: generateSingleMarker,
    generateMarkerCluster: generateMarkerCluster,
    queryMap: queryMap
  };
}
