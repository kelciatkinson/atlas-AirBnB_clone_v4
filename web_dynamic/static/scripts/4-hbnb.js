$(document).ready(function() {
    let chosenAmenities = {};
    $('input[type="checkbox"]').change(function() {
      let amenityID = $(this).data("id")
      let amenityName = $(this).data("name")
  
      if ($(this).is(':checked')) {
        chosenAmenities[amenityID] = amenityName;
      } else {
        delete chosenAmenities[amenityID];
      }
      console.log(Object.values(chosenAmenities));
      console.log(Object.keys(chosenAmenities));
      $('div.amenities h4').text(Object.values(chosenAmenities).join(', '));
    });

    $.get("http://localhost:5003/api/v1/status", (resp) => {
        if (resp.status === "OK") {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });

    function loadPlaces(amenities = {}) {
        $.post({
            url: "http://localhost:5003/api/v1/places_search",
            data: JSON.stringify(amenities), 
            contentType: "application/json",
            success: function(places) {
                const placesSection = $('section.places');
                placesSection.empty();// ensures the displayed places are cleared
                $.each(places, function(index, place) {
                    // Creating an article tag for each place
                    const $article = $('<article></article>');
                    $article.html(`
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    `);
                    placesSection.append($article);
                });
            }
        });
    }
    loadPlaces();//populates the page without filtered amenities

    $('button').click(function() {
        console.log(Object.keys(chosenAmenities));
        loadPlaces({amenities: Object.keys(chosenAmenities)});
    });
});