// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      "<div class='card sticky-action blue-grey darken-1'>" + 
        "<div class='card-content white-text'>" + 
          "<span class='card-title white-text activator'>" + 
          "<p data-id='" + data[i]._id + "'>" + 
          "<a target='_blank' href=" + "http://www.webdesignernews.com" + data[i].link + ">" + data[i].title + "</a>" + 
          // "<br />" + 
          // "<a href=" + "http://www.webdesignernews.com" + data[i].link + 
          "</p>" + 
          "<i class='material-icons right'>" + 'note_add' + "</i>" + 
          "</span>" + 
        "</div>" + 
        "<div class='card-action'>" + 
          "<a id='save' href='#' data-id='" + data[i]._id + "'>" + "Save" + "</a>" +
          "<a id='addnote' href='#' data-id='" + data[i]._id + "'>" + "Add note" + "</a>" + 
        "</div>") + 
        "<div class='card-reveal'>" + 
          "<i class='material-icons write'>"
      
      
      ;

  }
});


// Whenever someone clicks save article
$(document).on("click", "#save", function() {
  // Empty the notes from the note section
  // $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    // data: {
    //   saved: true
    // }
  })

    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);

      $("#saved-articles").append("<div class='card blue-grey darken-1'>" + "<div class='card-content white-text'>" + "<span class='white-text'>" + "<p data-id='" + data._id + "'>" + data.title + "<br />" + "<a href=" + "http://www.webdesignernews.com" + data.link + "</p>" + "</span>" + "</div>" + "<div class='card-action'>" + "<a id='save' href='#'>" + "Save" + "</a>" + "<a id='addnote' href='#' data-id='" + data._id + "'>" + "Add note" + "</a>" + "</div>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});



// Whenever someone clicks a p tag
$(document).on("click", "#addnote", function() {
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
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
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

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
