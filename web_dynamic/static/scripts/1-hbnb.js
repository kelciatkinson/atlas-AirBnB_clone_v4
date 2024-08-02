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
  });