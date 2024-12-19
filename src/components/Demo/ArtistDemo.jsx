import { useState, useEffect } from "react";
import requestWrapper from "../../spotify/requestWrapper";
import "./ArtistDemo.css";

export default function Artist() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch artist data
    requestWrapper("artists/0TnOYISbd1XYRBk9myaseg", null, setData, setError);
  }, []); // Empty dependency array ensures the effect runs only once

  if (error) {
    return (
      <h1>
        Error {error.status}
        {error.message ? ": " + error.message : null}
      </h1>
    );
  }

  if (!data) {
    return <h1>Loading profile information...</h1>;
  }

  return (
    <div className="card">
      <h1>{data.name}</h1>
      <img
        src={data.images?.[0]?.url || ""}
        alt={`${data.name} image`}
        width={data.images?.[0]?.width || 0}
        height={data.images?.[0]?.height || 0}
      />
      <p>
        <span className="label">Genres:</span>
        <span className="description">
          {data.genres?.join(", ") || "No genres available"}
        </span>
      </p>
      <p>
        <span className="label">Popularity:</span>
        <span className="description">{data.popularity || "N/A"}</span>
      </p>
      <a href={data.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
        View on Spotify
      </a>
      
    </div>
  );
}
/*
I used Postman to make the API call with a token you can get from the console with this command:

localStorage.getItem("accessToken")

This is the text I was going off of while building this:

{
    "external_urls": {
        "spotify": "https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg"
    },
    "followers": {
        "href": null,
        "total": 11001192
    },
    "genres": [
        "dance pop",
        "miami hip hop",
        "pop"
    ],
    "href": "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg?locale=en-US%2Cen%3Bq%3D0.9%2Cfi-FI%3Bq%3D0.8%2Cfi%3Bq%3D0.7",
    "id": "0TnOYISbd1XYRBk9myaseg",
    "images": [
        {
            "url": "https://i.scdn.co/image/ab6761610000e5eb4051627b19277613e0e62a34",
            "height": 640,
            "width": 640
        },
        {
            "url": "https://i.scdn.co/image/ab676161000051744051627b19277613e0e62a34",
            "height": 320,
            "width": 320
        },
        {
            "url": "https://i.scdn.co/image/ab6761610000f1784051627b19277613e0e62a34",
            "height": 160,
            "width": 160
        }
    ],
    "name": "Pitbull",
    "popularity": 86,
    "type": "artist",
    "uri": "spotify:artist:0TnOYISbd1XYRBk9myaseg"
} */