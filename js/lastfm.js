// this code i write with ai

 const API_KEY = " 7e5daf139d75eb7859a5255175024549"; 
    const USERNAME = "SakeSao";  

    const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

    async function updateTrack() {
      const params = new URLSearchParams({
        method: "user.getRecentTracks",
        user: USERNAME,
        api_key: API_KEY,
        format: "json",
        limit: 1
      });

      try {
        const response = await fetch(`${BASE_URL}?${params}`);
        const data = await response.json();
        const track = data.recenttracks.track[0];
        const isNowPlaying = track['@attr']?.nowplaying === 'true';

        document.getElementById("title").textContent = track.name;
        document.getElementById("artist").textContent = track.artist["#text"];
        document.getElementById("cover").src =
          track.image?.pop()?.["#text"] || "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png";
        document.getElementById("status").textContent = isNowPlaying
          ? "🎧 Now listen"
          : "⏮ Recently listened";

      } catch (error) {
        console.error("Error:", error);
        document.getElementById("status").textContent = "Error loading data 😕";
      }
    }

    updateTrack();
    setInterval(updateTrack, 1000); // 🔁 обновлять каждые 30 сек