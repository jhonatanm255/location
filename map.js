
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
          console.log(data);
    
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
    