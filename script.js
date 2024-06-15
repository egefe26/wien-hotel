const hotels = [
    {
        name: "Motel One Wien Westbahnhof",
        distance: 3,
        pricePerNight: 80,
        totalPrice: 160,
        reviews: 13613,
        reviewScore: 8.6,
        bookingLink: "https://www.booking.com/hotel/at/motel-one-wien-westbahnhof.en-gb.html",
        mapsLink: "https://goo.gl/maps/dYGoVbW42gUpwV3bA",
        lat: 48.197910,
        lng: 16.337580
    },
    {
        name: "Ibis budget Wien Messe",
        distance: 2,
        pricePerNight: 75,
        totalPrice: 150,
        reviews: 9426,
        reviewScore: 7.5,
        bookingLink: "https://www.booking.com/hotel/at/ibis-budget-wien-messe.en-gb.html",
        mapsLink: "https://goo.gl/maps/WmVG5UFCuFuqZBkF6",
        lat: 48.220339,
        lng: 16.399076
    },
    {
        name: "JUFA Hotel Wien City",
        distance: 4,
        pricePerNight: 85,
        totalPrice: 170,
        reviews: 8947,
        reviewScore: 8.5,
        bookingLink: "https://www.booking.com/hotel/at/jufa-wien-city.en-gb.html",
        mapsLink: "https://goo.gl/maps/gkdcwPPc9qubKkZz6",
        lat: 48.175040,
        lng: 16.408950
    },
    {
        name: "Holiday Inn Vienna City",
        distance: 1.7,
        pricePerNight: 100,
        totalPrice: 200,
        reviews: 1473,
        reviewScore: 8.3,
        bookingLink: "https://www.booking.com/hotel/at/holiday-inn-vienna-city.en-gb.html",
        mapsLink: "https://goo.gl/maps/oyd1F23zqsn2",
        lat: 48.193570,
        lng: 16.359420
    },
    {
        name: "Austria Trend Hotel Europa Wien",
        distance: 0,
        pricePerNight: 137,
        totalPrice: 274,
        reviews: 4985,
        reviewScore: 8.6,
        bookingLink: "https://www.booking.com/hotel/at/austria-trend-europa.en-gb.html",
        mapsLink: "https://goo.gl/maps/xJk8eXuS1dA2",
        lat: 48.206050,
        lng: 16.369550
    },
    {
        name: "Hotel NH Wien City",
        distance: 1.5,
        pricePerNight: 120,
        totalPrice: 240,
        reviews: 2928,
        reviewScore: 8.1,
        bookingLink: "https://www.booking.com/hotel/at/nh-wien-city.en-gb.html",
        mapsLink: "https://goo.gl/maps/p3G4QJgFdDT2",
        lat: 48.201500,
        lng: 16.353890
    },
    {
        name: "Flemings Selection Hotel Wien-City",
        distance: 1.1,
        pricePerNight: 150,
        totalPrice: 300,
        reviews: 2896,
        reviewScore: 8.5,
        bookingLink: "https://www.booking.com/hotel/at/fleming-s-deluxe-wien-city.en-gb.html",
        mapsLink: "https://goo.gl/maps/e2KrFQ3KsCm",
        lat: 48.207530,
        lng: 16.351540
    }
];

const priceWeight = document.getElementById('priceWeight');
const reviewWeight = document.getElementById('reviewWeight');
const distanceWeight = document.getElementById('distanceWeight');

function updateWeights() {
    document.getElementById('priceWeightValue').textContent = priceWeight.value;
    document.getElementById('reviewWeightValue').textContent = reviewWeight.value;
    document.getElementById('distanceWeightValue').textContent = distanceWeight.value;
    calculateRankScores();
}

function calculateRankScores() {
    const maxPrice = Math.max(...hotels.map(h => h.pricePerNight));
    const maxReviews = Math.max(...hotels.map(h => h.reviews));
    const maxDistance = Math.max(...hotels.map(h => h.distance));
    const minDistance = Math.min(...hotels.map(h => h.distance));
    
    hotels.forEach(hotel => {
        const normalizedPrice = 1 - (hotel.pricePerNight / maxPrice);  // Lower price gets higher score
        const normalizedReviews = hotel.reviews / maxReviews;
        const normalizedDistance = 1 - ((hotel.distance - minDistance) / (maxDistance - minDistance));  // Closer distance gets higher score
        
        const rawScore = (normalizedPrice * priceWeight.value) + (normalizedReviews * reviewWeight.value) + (normalizedDistance * distanceWeight.value);
        hotel.rawScore = rawScore;
    });
    
    const maxRawScore = Math.max(...hotels.map(h => h.rawScore));
    const minRawScore = Math.min(...hotels.map(h => h.rawScore));
    
    hotels.forEach(hotel => {
        hotel.rankScore = (hotel.rawScore - minRawScore) / (maxRawScore - minHere's the complete and corrected implementation of the HTML, CSS, and JavaScript to display the hotel rankings, normalize the rank scores, and embed Google Maps directly in the webpage.

### 1. HTML (`index.html`)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Rankings in Vienna</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Hotel Rankings in Vienna</h1>
        <div class="sliders">
            <div>
                <label for="priceWeight">Price Weight: <span id="priceWeightValue">1</span></label>
                <input type="range" id="priceWeight" name="priceWeight" min="0" max="10" value="1" step="0.1" oninput="updateWeights()">
            </div>
            <div>
                <label for="reviewWeight">Review Score Weight: <span id="reviewWeightValue">1</span></label>
                <input type="range" id="reviewWeight" name="reviewWeight" min="0" max="10" value="1" step="0.1" oninput="updateWeights()">
            </div>
            <div>
                <label for="distanceWeight">Distance Weight: <span id="distanceWeightValue">1</span></label>
                <input type="range" id="distanceWeight" name="distanceWeight" min="0" max="10" value="1" step="0.1" oninput="updateWeights()">
            </div>
        </div>
        <table id="hotelsTable">
            <thead>
                <tr>
                    <th>Hotel</th>
                    <th>Distance to City Center (km)</th>
                    <th>Price per Night (€)</th>
                    <th>Total Price (€)</th>
                    <th>Number of Reviews</th>
                    <th>Review Score (/10)</th>
                    <th>Normalized Rank Score</th>
                    <th>Booking Link</th>
                    <th>Google Maps</th>
                </tr>
            </thead>
            <tbody>
                <!-- Table rows will be populated by JavaScript -->
            </tbody>
        </table>
        <div id="map" style="height: 400px; width: 100%; margin-top: 20px;"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
