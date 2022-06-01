// fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=lonely&apikey=ce5a466979b88e9a90356a68807c9a00")

  // fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=3&country=it&apikey=ce5a466979b88e9a90356a68807c9a00")
  //   .then(res => res.json())
  //   .then(data => aResults = data)
  //   .then(() => console.log(aResults))

// &f_track_release_group_first_release_date_min=19951212&f_track_release_group_first_release_date_max=19991212


// above this are lines that are handy to have around to copy and paste

var weatherKey = "8f14f498b80df53efe91f44dcb494851"
var musicKey = "ce5a466979b88e9a90356a68807c9a00"

var place = document.querySelector("#place")
var genre = document.querySelector("#genre")
var submit = document.querySelector("#submit")
var dropDown = document.querySelector("#dropDown")

var termsB
var idNumber
var genreTerm
var weatherMoodWord
var randoMoodResult

// what fun it will be to think of all the words for all the weather.
var cloudyMoods = ["glum", "pensive"]
var clearMoods = ["happy", "hopeful", "smile", "pleasant", "content", "bliss", "blissful"]
var moodObject = {"Clear": clearMoods, "Cloudy": cloudyMoods}

// this capitalizes the genre search term, and then loops through the whole 
// long list of genres to find the ID number attached to the genre-word. (The search
// only works by number and not word.)
function genreFetch() {
  capitalize(genre)
  genreTerm = termsB
  fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/music.genres.get&apikey=" + musicKey)
    .then(res => res.json())
    .then(data => allGenres = data)
    .then(function(data) {
      // this is what the raw genre json looks like
      console.log("here is the big list of genres:", allGenres)
      for (let i = 0;i < allGenres.message.body.music_genre_list.length; i++) {
        if (allGenres.message.body.music_genre_list[i].music_genre.music_genre_name == genreTerm) {
          idNumber = allGenres.message.body.music_genre_list[i].music_genre.music_genre_id
          console.log("genre chosen:", genreTerm)
          console.log("genre id is:", idNumber)
        }
        else {
          console.log("not found")
        }
      }
      fetchCoords()
      genre.value = ""
      place.value = ""
})}

// the main music search function
function musicSearch() {
  fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics="+randoMoodResult+"&f_music_genre_id="+idNumber+"&apikey="+musicKey)
    .then(res => res.json())
    .then(data => mResults = data)
    .then(() => console.log("a list of songs based on genre and weather should be here:", mResults))


//this is here to be an example of what a successful search for songs by the keyword "lonely" would look like.
  fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=lonely&apikey=ce5a466979b88e9a90356a68807c9a00")
    .then(res => res.json())
    .then(data => obj = data)
    .then(() => console.log("here is what a search for the word lonely looks like", obj))
  }

// fetches the coordinates from openweather
function fetchCoords() {
  fetch("https://blooming-lowlands-18463.herokuapp.com/http://api.openweathermap.org/geo/1.0/direct?q="+place.value+"&limit=1&appid="+weatherKey)
  .then(res => res.json())
  .then(data => aResults = data)
  .then(() => convertCoords())
}

// converts coords into a useable city name for openweather to use
function convertCoords() {
  lat = aResults[0].lat
  lon = aResults[0].lon

  fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid="+weatherKey+"&units=imperial")
    .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json()
        })
    .then(function(data) {
        weather = data
        //this finds whichever word like "clear" or "cloudy"
        weatherMoodWord = weather.current.weather[0].main
        console.log("variable weatherMoodWord is:", weatherMoodWord)

        beginWeatherSearch()
})}

// this function is set to call the other functions that will actually perform
// the search, once they're all working, but they're not yet. Because for 
// whatever reason musicSearch() is successfully fetching an empty result. 
function beginWeatherSearch () {
 
  console.log("this should choose the array with the appropriate mood words:", moodObject[weatherMoodWord])
  randoMood(moodObject[weatherMoodWord])
  musicSearch()
}

//randomizer for picking mood-words from the arrays
function randoMood(mood) {
  randoMoodResult = mood[Math.floor(Math.random()*mood.length)];
  console.log("random mood result is:", randoMoodResult)
  
}

// for multi word search terms, this capitalizes the first letter of each word
function capitalize(term) {
  var terms = term.value.split(" ")
  termsB = terms.map((word) => { 
      return word[0].toUpperCase() + word.substring(1)}).join(" ")
}


submit.addEventListener("click", genreFetch)