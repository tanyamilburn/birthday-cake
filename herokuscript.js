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

var history1 = document.querySelector("#history1")
var history2 = document.querySelector("#history2")
var history3 = document.querySelector("#history3")
var history4 = document.querySelector("#history4")
var history5 = document.querySelector("#history5")
var historyBox = document.querySelector("#historyBox")

var searchArray = [
  history1, 
  history2, 
  history3,
  history4,
  history5,
]

var storage1 = "storage1"
var storage2 = "storage2"
var storage3 = "storage3"
var storage4 = "storage4"
var storage5 = "storage5"

var storageArray = [
  storage1,
  storage2,
  storage3,
  storage4,
  storage5
]

var trackNameArray = []
var trackNumberArray = []

var searchIndex = 0
var termsB
var idNumber
var genreTerm
var weatherMoodWord 
var randoMoodResult

// what fun it will be to think of all the words for all the weather.
var cloudyMoods = ["cloud", "clouds", "cloudy", "gloomy", "blue"]
var clearMoods = ["happy", "hopeful", "smile", "sunny", "content", "bliss", "blissful", "sunshine", "bright", "sun", "laugh"]
var rainMoods =["sad", "lonely", "cold", "rainy", "rain", "raining", "dark", "alone", "sorrow", "despair", "cry", "crying", "cried"]
var drizzleMoods = ["sad", "lonely", "cold", "rainy", "rain", "raining", "dark", "alone", "sorrow", "despair", "cry", "crying", "cried"]
var thunderMoods = ["storm", "stormy", "angry", "anger", "rage", "troubled", "thunder", "lightning"]
var snowMoods =["cold", "cozy", "calm", "solice", "winter", "chill", "frost", "ice", "snow", "snowing", "freezing", "frozen", "freeze"]
var moodObject = {"Clear": clearMoods, "Clouds": cloudyMoods, "Rain": rainMoods, "Drizzle": drizzleMoods, "Thunderstorm": thunderMoods, "Snow": snowMoods}

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
          historyFunction()

          return fetchCoords()
        }}
        for (let i = 0;i < allGenres.message.body.music_genre_list.length; i++) {
          if (allGenres.message.body.music_genre_list[i].music_genre.music_genre_name !== genreTerm) {
              console.log(genreTerm , "not found")
              submit.textContent = genreTerm + " not found"
              setTimeout(changeSubmitText, 1500)
              }}
        // else if (allGenres.message.body.music_genre_list[i].music_genre.music_genre_name !== genreTerm) {
        //   console.log(genreTerm , "not found")
        //   submit.textContent = genreTerm + " not found"
        //   setTimeout(changeSubmitText, 2000)
        // }
        // // else {
        //   console.log("not found")
        // }
      
      //fetchCoords()
      
      
      })}

function changeSubmitText() {
  submit.textContent = "Music Search"
}

// the main music search function
function musicSearch() {
  fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track="+randoMoodResult+"&f_music_genre_id="+idNumber+"&apikey="+musicKey)
    .then(res => res.json())
    .then(data => mResults = data)
    .then(() => console.log("a list of songs based on genre and weather should be here:", mResults))
    .then(function(data) {
      pushFunction()
    })}

//this is here to be an example of what a successful search for songs by the keyword "lonely" would look like.
  // fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=lonely&apikey=ce5a466979b88e9a90356a68807c9a00")
  //   .then(res => res.json())
  //   .then(data => obj = data)
  //   .then(() => console.log("here is what a search for the word lonely looks like", obj))
  // }

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
          console.log("city not found")
          throw response.json();
        }
        return response.json()
        })
    .then(function(data) {
        weather = data
        //this finds whichever word like "clear" or "cloudy"
        weatherMoodWord = weather.current.weather[0].main
        console.log("variable weatherMoodWord is:", weatherMoodWord)
        changeBackground(weatherMoodWord)
        beginWeatherSearch(weatherMoodWord)
})}

// this function is set to call the other functions that will actually perform
// the search, once they're all working, but they're not yet. Because for 
// whatever reason musicSearch() is successfully fetching an empty result. 
function beginWeatherSearch () {
 
  console.log("this should choose the array with the appropriate mood words:", moodObject[weatherMoodWord])
  randomizer(moodObject[weatherMoodWord])
  musicSearch()
}

//randomizer for picking mood-words from the arrays
function randomizer(mood) {
  randoMoodResult = mood[Math.floor(Math.random()*mood.length)]
  console.log("random lyrics/mood result is:", randoMoodResult)
  
}

// for multi word search terms, this capitalizes the first letter of each word
function capitalize(term) {
  var terms = term.value.split(" ")
  termsB = terms.map((word) => { 
      return word[0].toUpperCase() + word.substring(1)}).join(" ")
}

// this populates two different arrays with both song names and song numbers
// and then provides full track information for one randomly chosen.
function pushFunction() {
  trackNameArray = []
  trackNumberArray = []
  for (let i = 0; i < mResults.message.body.track_list.length; i++) {
    trackNameArray.push(mResults.message.body.track_list[i].track.track_name)
    trackNumberArray.push(mResults.message.body.track_list[i].track.commontrack_id)
  }
  console.log("ten songs:", trackNameArray)
  console.log("ten song id numbers:", trackNumberArray)

  aRandomSong = trackNameArray[Math.floor(Math.random()*trackNameArray.length)]
  aRandomSongID = trackNumberArray[Math.floor(Math.random()*trackNumberArray.length)]


  fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?commontrack_id="+aRandomSongID+"&apikey="+musicKey)
    .then(res => res.json())
    .then(data => {
      console.log('data', data)
      if(data.message.body) {
        
        const { track_name, artist_name, album_name } = data.message.body.track

        console.log(
          "randomly a |song:", track_name,
          "|album:", album_name,
          "|artist:", artist_name
        )
        // redirectPage()
        renderResultToScreen(track_name, artist_name, album_name)
      } else {
        renderResultToScreen()
      }
    })
}

function renderResultToScreen(track, artist, album){
  genre.value = ""
  place.value = ""
  artistResult = document.querySelector("#artist")
  trackResult = document.querySelector("#track")
  albumResult = document.querySelector("#album")

  if(track && artist && album) {
    artistResult.innerHTML = `${artist}` 
    trackResult.innerHTML = `${track}`
    albumResult.innerHTML = `${album}`
    // submit.addEventListener("click", redirectPage)
    console.log(track)
  // } else {
  //   // result.innerHTML = "Oops, try again!"
  // }
  }

}
// function addClass (){
  
// }
function changeBackground(weather){
  document.querySelector('.hero').classList.remove("heroClouds", "heroRain", "heroSnow", "heroThunderstorm", "heroClear") 
  if(weather === "Clouds"){
    document.querySelector('.hero').classList.add("heroClouds")
  }
  else if(weather === "Rain"){
    document.querySelector('.hero').classList.add("heroRain")
  }
  else if(weather === "Drizzle"){
    document.querySelector('.hero').classList.add("heroRain")
  }
  else if(weather === "Snow"){
    document.querySelector('.hero').classList.add("heroSnow")
  }
  else if(weather === "Thunderstorm"){
    document.querySelector('.hero').classList.add("heroThunderstorm") 
  }
  else if(weather === "Clear"){
    document.querySelector('.hero').classList.add("heroClear")
  }
  
  document.querySelector('.display').classList.remove('hidden')
}

function historyFunction() {
    if (searchIndex < 5) {
      searchArray[searchIndex].textContent = place.value + "/" + genre.value
      localStorage.setItem(storageArray[searchIndex], searchArray[searchIndex].value)
      searchArray[searchIndex].removeAttribute('disabled')
      searchIndex++
    }
    else if (searchIndex >= 5) {searchIndex = 0}
}

function historyChange() {
  var splitArray = historyBox.value.split("/")
  place.value = splitArray[0]
  genre.value = splitArray[1]
}

function initHistory() {
  for (let i = 0; i < 5; i++) {
    if (localStorage.getItem(storageArray[i])) {
      searchArray[i].textContent = localStorage.getItem(storageArray[i])
      searchArray[i].removeAttribute('disabled')
      console.log("it's here!")
    }
    else (
      console.log("it is not there")
    )
    }
  // history1.textContent = localStorage.getItem(storageArray[0])
  // history2.textContent = localStorage.getItem(storageArray[1])
  // history3.textContent = localStorage.getItem(storageArray[2])
  // history4.textContent = localStorage.getItem(storageArray[3])
  // history5.textContent = localStorage.getItem(storageArray[4])
  }

initHistory()
historyBox.addEventListener("change", historyChange)
submit.addEventListener("click", genreFetch)
// submit.addEventListener("click", addClass)
