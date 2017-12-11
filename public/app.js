// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {

    if (data[i].title !== undefined) {
      // Display the appropriate information on the page
      $("#articles").append(
        "<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "<a target='_blank' href=" + "http://www.webdesignernews.com" + data[i].link + ">" + "http://www.webdesignernews.com" + data[i].link + "</a" + "</p>");
    }
  }
});

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h4>" + data.title + "</h4>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save note</button>");

      // If there's a note in the article, display on the page
      if (data.note) {
          $("#notes").append("<h4>" + "Previous notes" + "</h4>");
          $("#notes").append("<p>" + data.note.body + "</p>");
          $("#notes").append("<button data-id='" + data._id + "' id='deletenote'>Delete note</button>");
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the input
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the textarea for note entry
  $("#bodyinput").val("");
});

// When you click the deletenote button
$(document).on("click", "#deletenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the input
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the textarea for note entry
  $("#bodyinput").val("");
});