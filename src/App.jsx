// src/App.tsx
import React from "react";
// import './app.css'; // Import the CSS file
import pic1 from "./assets/pic1.png"; // Import the logo image
import svg1 from "./assets/folder.svg"; // Import the logo image
import pic1jpg from "./assets/pic1.jpg"; // Import the logo image

const App = () => {
    return (
        <div>
          <h1 className="text-blue-500 text-5xl">Alhamdulillah!</h1>
          <img src={pic1} alt="Pic1" /> {/* Use the imported pic1 here */}
        <img src={pic1jpg} alt="Pic1 JPG" /> {/* Use the imported pic1jpg here */}
        <img src={svg1} alt="SVG 1" width="50" height="50" />
        <img src="circle.svg" alt="SVG-Public" width="50" height="50" />
        </div>
      );
};

export default App;