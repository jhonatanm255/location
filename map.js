
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();



    const btnIp = document.getElementById('btn-ip');

    btnIp.addEventListener('click', async () => {
      const inputIp = document.getElementById('ip-num').value;
      const apiKey = `https://geo.ipify.org/api/v2/country,city?apiKey=at_BR2B2Xja65iZkgEmrn0PU35VXzVCo&ipAddress=${inputIp}`;
    
      try {
        const res = await fetch(apiKey);
        if (!res.ok) {
          throw new Error('Error al conectar a la API: ' + res.statusText);
        }
    
        const data = await res.json();

        // Verifica si hay información geográfica
        if (data.location && data.location.country !== 'ZZ') {
          // Muestra la información de ubicación en la consola
          const ip = data.ip;
          const city = data.location.city;
          const region = data.location.region;
          const timeZone = data.location.timezone;
          const isp = data.isp;

          const plantilla = `
            <div class="p-3">
              <p class="text-xs text-center font-bold text-slate-500 sm:mb-4 sm:text-xl">IP Address</p>
              <p class="sm:text-2xl text-lg font-bold text-slate-800 text-center">${ip}</p>
            </div>

            <div class="p-3 sm:border-l sm:border-solid sm:border-gray-300">
              <p class="sm:text-xl text-xs text-center font-bold text-slate-500 sm.mb-4">Location</p>
              <div class="block">
              <p class="sm:text-2xl text-lg font-bold text-slate-800 text-center">${city}, ${region}</p>
              </div>
            </div>

            <div class="p-3 sm:border-l sm:border-solid sm:border-gray-300">
              <p class="sm:text-xl text-xs text-center font-bold text-slate-500 sm:mb-4">Timezone</p>
              <p class="sm:text-2xl text-lg font-bold text-slate-800 text-center">UTC+ ${timeZone}</p>
            </div>

            <div class="p-3 sm:border-l sm:border-solid sm:border-gray-300">
              <p class="sm:text-xl text-xs text-center font-bold text-slate-500 sm:mb-4">ISP</p>
              <p class="sm:text-2xl text-lg font-bold text-slate-800 text-center">${isp}</p>
            </div>
          `
          const section = document.getElementById('seccion');
          section.innerHTML = plantilla

          
    
          // Muestra la ubicación en el mapa
          const lat = data.location.lat;
          const lng = data.location.lng;
    
          // Establece el centro del mapa y añade un marcador
          map.setView([lat, lng], 10); // Ajusta el zoom según sea necesario
          L.marker([lat, lng]).addTo(map)
              .bindPopup(`Ubicación: ${data.location.city || 'Ciudad no disponible'}`)
              .openPopup();
        } else {
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = 'No se pudo encontrar información geográfica para esta dirección IP.';
        }
      } catch (error) {
        console.log('Error al ejecutar la función:', error);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = 'Ocurrió un error al obtener la información. Por favor, intenta de nuevo.';
      }
    });
    