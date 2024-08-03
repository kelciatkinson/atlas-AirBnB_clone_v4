$(document).ready(function() {
    const chosenAmenities = {};
    $('input[type="checkbox"]').change(function() {
      const amenityID = $(this).data("id")
      const amenityName = $(this).data("name")
  
      if ($(this).is(':checked')) {
        chosenAmenities[amenityId] = amenityName;
      } else {
        delete chosenAmenities[amentiyID];
      }
  
      let amenitiesList = Object.values(chosenAmenities).join(', ')
      $('div.amenities h4').text(amenitiesList);
    });

    $.get("http://0.0.0.0:5003/api/v1/status/", (resp) => {
        if (resp.status === "OK") {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    })

    $.get("http://0.0.0.0:5003/api/v1/places_search/")
  });