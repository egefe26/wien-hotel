const hotels = [
    {
        name: "Motel One Wien Westbahnhof",
        distance: 3,
        pricePerNight: 80,
        totalPrice: 160,
        reviews: 13613,
        reviewScore: 8.6,
        bookingLink: "https://www.booking.com/hotel/at/motel-one-wien-westbahnhof.en-gb.html",
        mapsLink: "https://goo.gl/maps/DwA2g1tL4XU2"
    },
    {
        name: "Ibis budget Wien Messe",
        distance: 2,
        pricePerNight: 75,
        totalPrice: 150,
        reviews: 9426,
        reviewScore: 7.5,
        bookingLink: "https://www.booking.com/hotel/at/ibis-budget-wien-messe.en-gb.html",
        mapsLink: "https://goo.gl/maps/3y3yXotj1Z82"
    },
    {
        name: "JUFA Hotel Wien City",
        distance: 4,
        pricePerNight: 85,
        totalPrice: 170,
        reviews: 8947,
        reviewScore: 8.5,
        bookingLink: "https://www.booking.com/hotel/at/jufa-wien-city.en-gb.html",
        mapsLink: "https://goo.gl/maps/f1T1vMYPQUR2"
    },
    {
        name: "Holiday Inn Vienna City",
        distance: 1.7,
        pricePerNight: 100,
        totalPrice: 200,
        reviews: 1473,
        reviewScore: 8.3,
        bookingLink: "https://www.booking.com/hotel/at/holiday-inn-vienna-city.en-gb.html",
        mapsLink: "https://goo.gl/maps/ZLk1D2RuTV32"
    },
    {
        name: "Austria Trend Hotel Europa Wien",
        distance: 0,
        pricePerNight: 137,
        totalPrice: 274,
        reviews: 4985,
        reviewScore: 8.6,
        bookingLink: "https://www.booking.com/hotel/at/austria-trend-europa.en-gb.html",
        mapsLink: "https://goo.gl/maps/dXaXkSkjTUS2"
    },
    {
        name: "Hotel NH Wien City",
        distance: 1.5,
        pricePerNight: 120,
        totalPrice: 240,
        reviews: 2928,
        reviewScore: 8.1,
        bookingLink: "https://www.booking.com/hotel/at/nh-wien-city.en-gb.html",
        mapsLink: "https://goo.gl/maps/vRxUNcBW6E82"
    },
    {
        name: "Flemings Selection Hotel Wien-City",
        distance: 1.1,
        pricePerNight: 150,
        totalPrice: 300,
        reviews: 2896,
        reviewScore: 8.5,
        bookingLink: "https://www.booking.com/hotel/at/fleming-s-deluxe-wien-city.en-gb.html",
        mapsLink: "https://goo.gl/maps/JJ6rmPQmnf62"
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
        const normalizedPrice = hotel.pricePerNight / maxPrice;
        const normalizedReviews = hotel.reviews / maxReviews;
        const normalizedDistance = (hotel.distance - minDistance) / (maxDistance - minDistance);
        
        const rankScore = (normalizedPrice * priceWeight.value) + (normalizedReviews * reviewWeight.value) + (normalizedDistance * distanceWeight.value);
        hotel.rankScore = rankScore;
    });
    
    hotels.sort((a, b) => a.rankScore - b.rankScore);
    displayHotels();
}

function displayHotels() {
    const tbody = document.querySelector('#hotelsTable tbody');
    tbody.innerHTML = '';
    
    hotels.forEach(hotel => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${hotel.name}</td>
            <td>${hotel.distance}</td>
            <td>${hotel.pricePerNight}</td>
            <td>${hotel.totalPrice}</td>
            <td>${hotel.reviews}</td>
            <td>${hotel.reviewScore}</td>
            <td>${hotel.rankScore.toFixed(2)}</td>
            <td><a href="${hotel.bookingLink}" target="_blank">Book Now</a></td>
            <td><a href="${hotel.mapsLink}" target="_blank">View on Map</a></td>
        `;
        
        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateWeights();
});
