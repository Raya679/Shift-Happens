import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import bg from "../pictures/duplo24.jpeg";
import Navbar from "../components/navbar";

export default function ContentHome() {
  useEffect(() => {
    window.scrollTo(0, 0);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const pyrmont = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const apiKey = process.env.REACT_APP_MAP_API;

        if (!apiKey) {
          console.error("Google Maps API key is missing.");
          return;
        }

        const loader = new Loader({
          apiKey: apiKey,
          version: "weekly",
        });

        loader.load().then(() => {
          try {
            const { google } = window;

            const map = new google.maps.Map(document.getElementById("map"), {
              center: pyrmont,
              zoom: 17,
            });

            const service = new google.maps.places.PlacesService(map);

            service.nearbySearch(
              {
                location: pyrmont,
                radius: 10000,
                type: ["hospital"],
              },
              function(results, status) {
                if (status !== "OK") {
                  console.error("PlacesService nearbySearch failed:", status);
                  return;
                }
                createMarkers(results, map);
              }
            );
          } catch (error) {
            console.error("Error loading Google Maps:", error);
          }
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  function createMarkers(places, map) {
    const bounds = new window.google.maps.LatLngBounds();
    const redMarkerIcon = {
      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      size: new window.google.maps.Size(48, 48),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(24, 48),
    };

    for (let i = 0; i < places.length; i++) {
      const place = places[i];
      const marker = new window.google.maps.Marker({
        map: map,
        icon: redMarkerIcon,
        title: place.name,
        position: place.geometry.location,
      });
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
  }

  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="min-h-screen flex flex-col items-center justify-center py-16"
      >
        <div className="bg-white w-5/6 lg:w-4/6 shadow-2xl rounded-lg p-10">
          <div className="main flex flex-col lg:flex-row p-8 lg:p-12">
            <div className="text-center lg:text-left">
              <h1 className="font-serif text-[60px] lg:text-[120px] text-slate-900 leading-none">
                Shift
                <br />
                Happens
              </h1>
              <p className="mt-6  text-slate-900 text-xl lg:text-2xl">
                Embrace the journey of self-discovery and growth—because mental
                wellness is a shift that transforms lives.
              </p>
            </div>

            <div className="flex justify-center lg:ml-auto mt-10 lg:mt-0">
              <img
                src="brain.png"
                alt="Mental Wellness"
                className="w-full lg:w-[650px] h-[350px] "
              />
            </div>
          </div>

          <div className="flex flex-col items-center mt-16">
            <div
              className="map bg-gray-300 w-full h-96 rounded-lg shadow-lg"
              id="map"
            ></div>
            <div className="mt-6 text-slate-900 text-3xl font-bold">
              Hospitals Near You
            </div>
            <p className="mt-2 text-slate-800 text-lg">
              Find nearby hospitals with ease and care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
