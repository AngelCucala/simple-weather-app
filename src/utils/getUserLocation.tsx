// src/utils/getUserLocation.ts
export const getUserLocation = (): Promise<GeolocationPosition | null> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by this browser.');
        reject(null);
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position);
          },
          (error) => {
            console.error('Error obtaining geolocation:', error);
            reject(null);
          }
        );
      }
    });
  };
  