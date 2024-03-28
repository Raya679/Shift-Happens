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
import brain from '../pictures/brain.jpg'
export default function ContentHome() {
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        window.scrollTo(0, 0);

        // const img = new Image();
        // img.src = "../pictures/brain.jpg";
        // img.onload = () => {
        //     setImageDimensions({ width: img.width, height: img.height });
        // };

        const loader = new Loader({
            apiKey: 'AIzaSyD48hQw8EEsHM_r2RyF2Mlos0c_E7jYe7U', 
            version: "weekly",
          
        });

        loader.load().then(async () => {
            try {
                const { google } = window;
                const pyrmont = { lat: 23.8701334, lng: 90.2713944 };
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        pyrmont.lat = position.coords.latitude;
                        pyrmont.lng = position.coords.longitude;
                    });
                }
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: pyrmont,
                    zoom: 17
                });

                const service = new google.maps.places.PlacesService(map);

                service.nearbySearch({
                    location: pyrmont,
                    radius: 4000,
                    type: ['hospital']
                }, function(results, status) {
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
    }, []);

    function createMarkers(places, map) {
        const bounds = new window.google.maps.LatLngBounds();
        for (let i = 0; i < places.length; i++) {
            const place = places[i];
            const image = {
                url: place.icon,
                size: new window.google.maps.Size(71, 71),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(17, 34),
                scaledSize: new window.google.maps.Size(25, 25)
            };
            const marker = new window.google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });
            bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
    }

    const div2style = {
        width: imageDimensions.width + 80,
        height: imageDimensions.height + 80,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: '20px',
        borderRadius: '50%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const divStyle = {
        width: imageDimensions.width + 40,
        height: imageDimensions.height + 40,
        backgroundColor: '#E5E7EB',
        padding: '20px',
        borderRadius: '50%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

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
                        <div style={div2style}>
                            <div style={divStyle}>
                                <img src={brain} width={50} height={50} />
                            </div>
                        </div>
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