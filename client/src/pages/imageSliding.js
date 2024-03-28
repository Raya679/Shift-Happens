// import { motion } from 'framer-motion';
// import images from "./imagesFolder";
// import {useRef, useEffect, useState} from "react";


// const ImageSliding = () => {
//     return ( 
//         <div className="maindiv">
//             <motion.div className="carousel">
//                 <motion.div 
//                     drag="x"
//                     dragConstraints={{right:0}}
//                     className="inner-carousel">
//                     {images.map(image => {
//                         return (
//                             <motion.div className="item">
//                                <img src = {image} alt =""/> 
//                             </motion.div>

//                         )
//                     })}
//                 </motion.div>
//             </motion.div>
//         </div>
//      );
// }
 
// export default ImageSliding;


// import img1 from '../pictures/img1.png';
// import img2 from '../pictures/img2.jpg';
// import img3 from '../pictures/img3.jpg';


// const ImageSliding = () => {
//     return ( 
//         <div className="slider">
//         <div className="slide-track">
//             <div className="slide">
//                 <img src = {img1}/>
//             </div>
//             <div className="slide">
//                 <img src = {img2}/>
//             </div>
//             <div className="slide">
//                 <img src = {img3}/>
//             </div>


//             <div className="slide">
//                 <img src = {img1}/>
//             </div>
//             <div className="slide">
//                 <img src = {img2}/>
//             </div>
//             <div className="slide">
//                 <img src = {img3}/>
//             </div>

            

//         </div>
//         </div>
//      );
// }
 
// export default ImageSliding;


// ImageSliding.js


// import React from 'react';
// import img1 from '../pictures/img1.png';
// import img2 from '../pictures/img2.jpg';
// import img3 from '../pictures/img3.jpg';
// import img4 from '../pictures/img4.jpg';
// import img5 from '../pictures/img5.jpg';
// import img6 from '../pictures/img6.jpg';
// import img7 from '../pictures/img7.jpg';
// import { Link } from 'react-router-dom';

// const ImageSliding = () => {
//   return (
//     <div className="forbutton">
//     <div className="slider">
//       <div className="slide-track">
     
//         {[img1, img2, img3, img4, img5, img6, img7].map((imgSrc, index) => (
//           <div key={index} className="slide">
//             <img src={imgSrc} alt={`Slide ${index + 1}`} />
//           </div>
//         ))}

//          {[img1, img2, img3, img4, img5, img6, img7].map((imgSrc, index) => (
//           <div key={index} className="slide">
//             <img src={imgSrc} alt={`Slide ${index + 1}`} />
//           </div>
//         ))}
//       </div>
//     </div>
//     <Link to = "/mainform">
//     <button>Let's Begin</button>
//     </Link>
//     </div>
//   );
// };

// export default ImageSliding;


