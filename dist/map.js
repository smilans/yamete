document.addEventListener('DOMContentLoaded', () => {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip').textContent = data.ip;
            document.getElementById('city').textContent = data.city;
            document.getElementById('region').textContent = data.region;
            document.getElementById('country').textContent = data.country_name;

            const map = L.map('map').setView([data.latitude, data.longitude], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            L.marker([data.latitude, data.longitude]).addTo(map)
                .bindPopup(`Lokasi Anda: ${data.city}, ${data.region}, ${data.country_name}`)
                .openPopup();
        })
        .catch(error => console.error('Error fetching IP data:', error));
});
