// var spotify = "69b5f00afa7a4447a0c2783483abc955"

// fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=lonely&apikey=ce5a466979b88e9a90356a68807c9a00")


function initFetch() {
    fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=3&country=it&apikey=ce5a466979b88e9a90356a68807c9a00")
      .then(res => res.json())
      .then(data => aResults = data)
      .then(() => console.log(aResults))
    // fetch("https://blooming-lowlands-18463.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?f_music_genre_id=1010&f_track_release_group_first_release_date_min=19951212&f_track_release_group_first_release_date_max=19991212&apikey=ce5a466979b88e9a90356a68807c9a00")
    //   .then(res => res.json())
    //   .then(data => bResults = data)
    //   .then(() => console.log(bResults))
  }

  initFetch()


