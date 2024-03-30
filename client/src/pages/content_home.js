// const ContentHome = () => {
//     return ( 
//         // <div className="info">
//         //     <p>Find out the Best Investment Options</p>
//         //     <a href = "/signup"><button>Get Started</button></a>
//         // </div>

//      );
// }

// export default ContentHome;

import React, { useEffect, useState } from 'react';
// import Footer from './Footer';
import { Loader } from "@googlemaps/js-api-loader";

//import brain from '../pictures/brain.jpg'
export default function ContentHome() {
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        window.scrollTo(0, 0);
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const pyrmont = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
    
                const loader = new Loader({
                    apiKey: '<MAP_API_KEY>', 
                    version: "weekly",
                });
    
                loader.load().then(() => {
                    try {
                        const { google } = window;
    
                        const map = new google.maps.Map(document.getElementById('map'), {
                            center: pyrmont,
                            zoom: 17
                        });
    
                        const service = new google.maps.places.PlacesService(map);
    
                        service.nearbySearch({
                            location: pyrmont,
                            radius: 10000,
                            type: ['hospital']
                        }, function (results, status) {
                            if (status !== 'OK') {
                                console.error('PlacesService nearbySearch failed:', status);
                                return;
                            }
                            createMarkers(results, map);
                        });
                    } catch (error) {
                        console.error('Error loading Google Maps:', error);
                    }
                });
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);
    
    function createMarkers(places, map) {
        const bounds = new window.google.maps.LatLngBounds();
        const redMarkerIcon = {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', 
            size: new window.google.maps.Size(48, 48), 
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(24, 48) 
        };
        
        for (let i = 0; i < places.length; i++) {
            const place = places[i];
            const marker = new window.google.maps.Marker({
                map: map,
                icon: redMarkerIcon, // Set the marker icon to the red marker image
                title: place.name,
                position: place.geometry.location
            });
            bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
    }
    
    

    return (
        <>
            <div className='bg-slate-300 mx-28 my-36 py-28'>
                <div className=' main flex'>
                    <div>
                        <div className=' font-serif text-[180px] from-stone-950 ml-36 -mt-3'>
                            <p>Mental</p>
                            <p className=' -mt-12'>Wellness</p>
                        </div>
                        <div className=' ml-28 text-zinc-900 text-2xl w-5/6'>
                            Welcome to a community where vulnerability is strength and self-care is a priority
                        </div>
                    </div>

                    <div className='image ml-auto mr-32 mt-8'>
                        <img src="brai.png" alt="gh" className=' -mt-9 ml-16' />
                    </div>

                </div>
                <div className='feat1 flex mt-20 px-24'>
                    <div className='map bg-black w-1/2 h-96' id="map"></div>
                    <div className=' nearby w-1/2 bg-slate-800 flex justify-center items-center'>
                        <div>
                            <div className='font-serif text-white text-3xl text-center'>
                                Contact Professionals
                            </div>
                            <div className=' bg-neutral-500  rounded-xl text-white text-xl p-4 m-4 text-center'>
                                <p>Rajesh Shetty</p><br />
                                <p>Contact info: 9897654621</p>
                                Email id : rajeshshetty@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}