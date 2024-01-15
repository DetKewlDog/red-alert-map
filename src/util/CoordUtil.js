export function averageCoordinate(coords) {
  if (coords.length === 1) return coords[0];
  
  let x = 0.0;
  let y = 0.0;
  let z = 0.0;
  
  for (let coord of coords) {
    let latitude = coord[0] * Math.PI / 180;
    let longitude = coord[1] * Math.PI / 180;
  
    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  }
  
  let total = coords.length;
  
  x = x / total;
  y = y / total;
  z = z / total;
  
  let centralLongitude = Math.atan2(y, x);
  let centralSquareRoot = Math.sqrt(x * x + y * y);
  let centralLatitude = Math.atan2(z, centralSquareRoot);
  
  return [
    centralLatitude * 180 / Math.PI,
    centralLongitude * 180 / Math.PI
  ];
}