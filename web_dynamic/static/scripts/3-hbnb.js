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

    $.post({
        url: "http://0.0.0.0:5003/api/v1/places_search/",
        data: JSON.stringify({}), // Sending an empty dictionary as requested
        contentType: "application/json", // Setting the content type to application/json
        success: function(places) {
            // Assuming resp is an array of place objects
            const placesSection = $('section.places'); // Adjust the selector as needed
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
	                <div class="user">
                        <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
                    </div>
                    <div class="description">
	                    ${place.description}
                    </div>
                `);
                placesSection.append($article);
            });
        },
        error: function(xhr, status, error) {
            console.error("An error occurred:", error);
        }
    })
  });