import React, { useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Servicearea = () => {
    const mapref=useRef(null);

  const data = useLoaderData();
  console.log(data)
  const position = [23.8103, 90.4125]; 
  

  const handelsubmit=(e)=>{
    e.preventDefault()
    const loacion=e.target.serach.value;
    const found = data.find(f => f.district.toLowerCase().includes(loacion.toLowerCase()));
    if(found){
        const cord=[found.latitude,found.longitude];
        // console.log(cord)
        mapref.current.flyTo(cord,14)
    }
  }



  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
        
      

      <form onSubmit={handelsubmit} className="py-6  bg-white shadow-md sticky top-0 z-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
          Search Service Area
        </h2>
        <input
          type="text"
          placeholder="Search by District..."
          name='serach'
          className="w-full md:w-1/2 px-4 py-3 border-2 border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
        />
      </form>

      
      <div className="flex-1 px-4 md:px-10 py-6">
        <h2 className="text-center text-3xl font-bold text-green-700 mb-4">
          We are available all over Bangladesh
        </h2>
        <div className="w-full h-[80vh] rounded-xl shadow-lg">
          <MapContainer center={position} zoom={8} scrollWheelZoom={false}  ref={mapref} className="w-full h-full rounded-xl">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {data.map((d, index) => (
              <Marker key={index} position={[d.latitude, d.longitude]}>
                <Popup className="text-green-900">
                  <strong>{d.district}</strong>
                  <br />
                  Covered Areas: {d.covered_area.join(', ')}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Servicearea;
