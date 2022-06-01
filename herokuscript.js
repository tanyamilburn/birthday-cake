// fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=lonely&apikey=ce5a466979b88e9a90356a68807c9a00")

  // fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=3&country=it&apikey=ce5a466979b88e9a90356a68807c9a00")
  //   .then(res => res.json())
  //   .then(data => aResults = data)
  //   .then(() => console.log(aResults))

// &f_track_release_group_first_release_date_min=19951212&f_track_release_group_first_release_date_max=19991212

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

var cloudyMoods = ["glum", "pensive"]
var clearMoods = ["happy", "hopeful", "smile", "pleasant", "content", "bliss", "blissful"]
var moodObject = {"Clear": clearMoods, "Cloudy": cloudyMoods}


function genreFetch() {
  capitalize(genre)
  genreTerm = termsB
  fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/music.genres.get&apikey=" + musicKey)
    .then(res => res.json())
    .then(data => allGenres = data)
    .then(function(data) {
      for (let i = 0;i < allGenres.message.body.music_genre_list.length; i++) {
        if (allGenres.message.body.music_genre_list[i].music_genre.music_genre_name == genreTerm) {
          idNumber = allGenres.message.body.music_genre_list[i].music_genre.music_genre_id
          console.log("genre chosen:", genreTerm)
          console.log("genre id is:", idNumber)
        }
        else {
          console.log("no")
        }
      }
      fetchCoords()
      genre.value = ""
      place.value = ""
})}

function musicSearch() {
  fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics="+randoMoodResult+"f_music_genre_id="+idNumber+"&apikey="+musicKey)
    .then(res => res.json())
    .then(data => mResults = data)
    .then(() => console.log("a song:", mResults))
  }

function fetchCoords() {
  fetch("https://blooming-lowlands-18463.herokuapp.com/http://api.openweathermap.org/geo/1.0/direct?q="+place.value+"&limit=1&appid="+weatherKey)
  .then(res => res.json())
  .then(data => aResults = data)
  .then(() => convertCoords())
}


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
        console.log(weather.current.weather[0].main)
        weatherMoodWord = weather.current.weather[0].main
        divineWeather()
})}

function divineWeather () {
 
  console.log("??", moodObject[weatherMoodWord])
  randoMood(moodObject[weatherMoodWord])
  musicSearch()
}

function randoMood(mood) {
  randoMoodResult = mood[Math.floor(Math.random()*mood.length)];
  console.log("mood result is:", randoMoodResult)
  
}

function capitalize(term) {
  var terms = term.value.split(" ")
  termsB = terms.map((word) => { 
      return word[0].toUpperCase() + word.substring(1)}).join(" ")
}


submit.addEventListener("click", genreFetch)