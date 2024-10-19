import React from 'react';

const ESP32Stream = () => {
  return (
    <div>
      <h1>ESP32 Camera Stream</h1>
      <img
        src="http://192.168.50.170:81/stream" // Replace with your ESP32 IP address
        alt="ESP32 Camera"
        style={{ width: '80%', height: 'auto' }}
      />
    </div>
  );
};

export default ESP32Stream;
