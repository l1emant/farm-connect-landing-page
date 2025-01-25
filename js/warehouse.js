const cropIcons = {
    'Wheat': 'fa-wheat-awn',
    'Rice': 'fa-seedling',
    'Corn': 'fa-wheat',
    'Soybean': 'fa-leaf',
    'Pulses': 'fa-bowl-food',
    'Cotton': 'fa-cloud',
    'Sugarcane': 'fa-candy-cane',
    'Oilseeds': 'fa-droplet',
    'Vegetables': 'fa-carrot',
    'Fruits': 'fa-apple-whole',
    'Spices': 'fa-mortar-pestle',
    'Tea': 'fa-mug-hot',
    'Coffee': 'fa-mug-saucer',
    'Jute': 'fa-scroll',
    'All Types': 'fa-warehouse',
    'Organic Only': 'fa-seedling'
};

function generatePieChart(percentage) {
    const rotation = (percentage / 100) * 360;
    const isMoreThanFifty = percentage > 50;
    
    return `
        <div class="capacity-circle">
            <div class="capacity-pie${isMoreThanFifty ? ' more-than-fifty' : ''}" style="transform: rotate(${Math.min(180, rotation)}deg);">
                ${isMoreThanFifty ? `<div class="capacity-pie-fill" style="transform: rotate(${rotation - 180}deg);"></div>` : ''}
            </div>
            <div class="capacity-text">
                <div class="capacity-percentage">${percentage}%</div>
                <div class="capacity-label">Full</div>
            </div>
        </div>
    `;
}

function generateCropIcons(crops) {
    return crops.map(crop => `
        <div class="crop-icon">
            <i class="fas ${cropIcons[crop]}"></i>
            ${crop}
        </div>
    `).join('');
}

const warehouseData = [
    {
        name: "Bharat Grain Storage",
        location: "Delhi NCR",
        capacity: { total: 5000, used: 3500 },
        crops: ["Wheat", "Rice"],
        rating: 4.5,
        reviews: 120
    },
    {
        name: "Coastal Storage Solutions",
        location: "Mumbai",
        capacity: { total: 8000, used: 3200 },
        crops: ["All Types"],
        rating: 5.0,
        reviews: 89
    },
    {
        name: "Green Valley Storage",
        location: "Bangalore",
        capacity: { total: 3000, used: 2700 },
        crops: ["Organic Only"],
        rating: 4.0,
        reviews: 75
    },
    {
        name: "Southern Spice Warehouse",
        location: "Chennai",
        capacity: { total: 12000, used: 4800 },
        crops: ["Rice", "Pulses", "Spices"],
        rating: 4.8,
        reviews: 156
    },
    {
        name: "Heritage Storage Hub",
        location: "Kolkata",
        capacity: { total: 6000, used: 5400 },
        crops: ["Tea", "Jute", "Rice"],
        rating: 4.3,
        reviews: 92
    },
    {
        name: "Deccan Storage Solutions",
        location: "Hyderabad",
        capacity: { total: 9000, used: 2700 },
        crops: ["All Types"],
        rating: 4.7,
        reviews: 134
    }
];

// Generate more warehouses with random data
const cities = ["Delhi NCR", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Indore", "Bhopal", "Patna", "Ludhiana", "Agra", "Nashik", "Kanpur", "Nagpur"];
const cropTypes = ["Wheat", "Rice", "Corn", "Soybean", "Pulses", "Cotton", "Sugarcane", "Oilseeds", "Vegetables", "Fruits", "Spices", "Tea", "Coffee", "Jute"];
const warehouseNames = [
    "Kisan Storage Solutions",
    "Annapurna Warehousing",
    "Samridhi Storage Hub",
    "Krishna Valley Storage",
    "Ganga Warehousing",
    "Himalayan Storage Co",
    "Golden Harvest Storage",
    "Indus Valley Warehouse",
    "Royal Agri Storage",
    "Narmada Storage Hub",
    "Kaveri Storage Solutions",
    "Godavari Warehousing",
    "Yamuna Valley Storage",
    "Thar Storage Solutions",
    "Konkan Storage Hub",
    "Vindhya Storage Co",
    "Malwa Storage Solutions",
    "Deccan Plateau Storage",
    "Brahmaputra Warehouse",
    "Satpura Storage Hub",
    "Mahanadi Storage Co",
    "Sundarbans Storage",
    "Western Ghats Storage",
    "Eastern Plains Storage"
];

for (let i = 0; i < 24; i++) {
    const totalCapacity = Math.floor(Math.random() * 15000) + 3000;
    const usedCapacity = Math.floor(Math.random() * totalCapacity);
    const numCrops = Math.floor(Math.random() * 3) + 1;
    const selectedCrops = [];
    
    for (let j = 0; j < numCrops; j++) {
        const crop = cropTypes[Math.floor(Math.random() * cropTypes.length)];
        if (!selectedCrops.includes(crop)) {
            selectedCrops.push(crop);
        }
    }

    warehouseData.push({
        name: warehouseNames[i],
        location: cities[Math.floor(Math.random() * cities.length)],
        capacity: { total: totalCapacity, used: usedCapacity },
        crops: selectedCrops,
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviews: Math.floor(Math.random() * 200) + 50
    });
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return `${`<i class="fas fa-star"></i>`.repeat(fullStars)}${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}${`<i class="far fa-star"></i>`.repeat(emptyStars)}`;
}

function generateWarehouseCards() {
    const warehouseGrid = document.querySelector('.warehouse-grid');
    warehouseGrid.innerHTML = '';

    warehouseData.forEach((warehouse, index) => {
        const usedPercentage = Math.round((warehouse.capacity.used / warehouse.capacity.total) * 100);
        const available = warehouse.capacity.total - warehouse.capacity.used;

        const card = document.createElement('div');
        card.className = 'warehouse-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index % 3) * 100);

        card.innerHTML = `
            <div class="warehouse-content">
                <h3 class="warehouse-title">${warehouse.name}</h3>
                <div class="warehouse-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${warehouse.location}
                </div>
                <div class="warehouse-details">
                    <div class="detail-item">
                        <div class="capacity-indicator">
                            <div class="capacity-circle">
                                <div class="capacity-fill" style="height: ${usedPercentage}%;"></div>
                                <div class="capacity-text">
                                    <div class="capacity-percentage">${usedPercentage}%</div>
                                    <div class="capacity-label">Full</div>
                                </div>
                            </div>
                        </div>
                        <div class="capacity-details">
                            <div>Used: <span>${warehouse.capacity.used}</span> tons</div>
                            <div>Available: <span>${available}</span> tons</div>
                            <div>Total: <span>${warehouse.capacity.total}</span> tons</div>
                        </div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Crops</span>
                        <div class="crop-icons">
                            ${generateCropIcons(warehouse.crops)}
                        </div>
                    </div>
                </div>
                <div class="warehouse-rating">
                    <div class="rating-stars">
                        ${generateStarRating(parseFloat(warehouse.rating))}
                    </div>
                    <span>${warehouse.rating} (${warehouse.reviews} reviews)</span>
                </div>
                <div class="warehouse-cta">
                    <a href="#" class="warehouse-btn btn-primary">Book Now</a>
                    <a href="#" class="warehouse-btn btn-secondary">View Details</a>
                </div>
            </div>
        `;

        warehouseGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Generate initial warehouse cards
    generateWarehouseCards();

    // Get all filter elements
    const cropFilter = document.getElementById('crop-type');
    const locationFilter = document.getElementById('location');
    const capacityFilter = document.getElementById('capacity');
    const ratingFilter = document.getElementById('rating');

    // Get all warehouse cards
    const warehouseCards = document.querySelectorAll('.warehouse-card');

    // Add event listeners to all filters
    [cropFilter, locationFilter, capacityFilter, ratingFilter].forEach(filter => {
        filter.addEventListener('change', filterWarehouses);
    });

    function filterWarehouses() {
        const selectedCrop = cropFilter.value.toLowerCase();
        const selectedLocation = locationFilter.value.toLowerCase();
        const minCapacity = parseInt(capacityFilter.value) || 0;
        const minRating = parseInt(ratingFilter.value) || 0;

        const filteredWarehouses = warehouseData.filter(warehouse => {
            const cropMatch = !selectedCrop || 
                warehouse.crops.some(crop => crop.toLowerCase().includes(selectedCrop)) ||
                warehouse.crops.includes("All Types");
            
            const locationMatch = !selectedLocation || 
                warehouse.location.toLowerCase().includes(selectedLocation);
            
            const capacityMatch = (warehouse.capacity.total - warehouse.capacity.used) >= minCapacity;
            
            const ratingMatch = !minRating || warehouse.rating >= minRating;

            return cropMatch && locationMatch && capacityMatch && ratingMatch;
        });

        // Update warehouseData with filtered results and regenerate cards
        const warehouseGrid = document.querySelector('.warehouse-grid');
        warehouseGrid.innerHTML = '';
        filteredWarehouses.forEach((warehouse, index) => {
            const usedPercentage = Math.round((warehouse.capacity.used / warehouse.capacity.total) * 100);
            const available = warehouse.capacity.total - warehouse.capacity.used;

            const card = document.createElement('div');
            card.className = 'warehouse-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index % 3) * 100);

            card.innerHTML = `
                <div class="warehouse-content">
                    <h3 class="warehouse-title">${warehouse.name}</h3>
                    <div class="warehouse-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${warehouse.location}
                    </div>
                    <div class="warehouse-details">
                        <div class="detail-item">
                            <div class="capacity-indicator">
                                <div class="capacity-circle">
                                    <div class="capacity-fill" style="height: ${usedPercentage}%;"></div>
                                    <div class="capacity-text">
                                        <div class="capacity-percentage">${usedPercentage}%</div>
                                        <div class="capacity-label">Full</div>
                                    </div>
                                </div>
                            </div>
                            <div class="capacity-details">
                                <div>Used: <span>${warehouse.capacity.used}</span> tons</div>
                                <div>Available: <span>${available}</span> tons</div>
                                <div>Total: <span>${warehouse.capacity.total}</span> tons</div>
                            </div>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Crops</span>
                            <div class="crop-icons">
                                ${generateCropIcons(warehouse.crops)}
                            </div>
                        </div>
                    </div>
                    <div class="warehouse-rating">
                        <div class="rating-stars">
                            ${generateStarRating(parseFloat(warehouse.rating))}
                        </div>
                        <span>${warehouse.rating} (${warehouse.reviews} reviews)</span>
                    </div>
                    <div class="warehouse-cta">
                        <a href="#" class="warehouse-btn btn-primary">Book Now</a>
                        <a href="#" class="warehouse-btn btn-secondary">View Details</a>
                    </div>
                </div>
            `;

            warehouseGrid.appendChild(card);
        });
    }

    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });
});
