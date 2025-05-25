let chatbotOpen = false;
        
        function toggleChatbot() {
            const window = document.getElementById('chatbot-window');
            const icon = document.getElementById('chatbot-icon');
            
            if (chatbotOpen) {
                window.style.display = 'none';
                icon.className = 'fas fa-comments';
                chatbotOpen = false;
            } else {
                window.style.display = 'flex';
                icon.className = 'fas fa-times';
                chatbotOpen = true;
            }
        }
        
        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }
        
        function sendQuickQuestion(question) {
            const input = document.getElementById('chatbot-input');
            input.value = question;
            sendMessage();
        }
        
        function sendMessage() {
            const input = document.getElementById('chatbot-input');
            const message = input.value.trim();
            
            if (!message) return;
            
            // Add user message
            addMessage(message, 'user');
            input.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Simulate AI response after delay
            setTimeout(() => {
                hideTypingIndicator();
                const response = generateAIResponse(message);
                addMessage(response, 'bot');
            }, 1500);
        }
        
        function addMessage(content, sender) {
            const messagesContainer = document.getElementById('chatbot-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
            
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.textContent = content;
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);
            messagesContainer.appendChild(messageDiv);
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        function showTypingIndicator() {
            const messagesContainer = document.getElementById('chatbot-messages');
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot';
            typingDiv.id = 'typing-indicator';
            
            typingDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
            
            messagesContainer.appendChild(typingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        function hideTypingIndicator() {
            const indicator = document.getElementById('typing-indicator');
            if (indicator) {
                indicator.remove();
            }
        }
        
        function generateAIResponse(userMessage) {
            const message = userMessage.toLowerCase();
            
            // Agricultural AI responses based on keywords
            if (message.includes('crop') || message.includes('plant')) {
                return "Based on your location and current season, I recommend considering corn, soybeans, or wheat. These crops have shown strong market demand and are well-suited for current weather patterns. Would you like specific planting guidelines?";
            }
            
            if (message.includes('soil')) {
                return "Soil health is crucial for optimal yields! I suggest testing your soil pH and nutrient levels first. Consider adding organic compost, practicing crop rotation, and using cover crops to improve soil structure and fertility.";
            }
            
            if (message.includes('harvest') || message.includes('timing')) {
                return "Harvest timing depends on your specific crop, but I can help you optimize it! Monitor moisture content, weather forecasts, and market prices. For most grains, harvest when moisture is between 15-20%. Would you like crop-specific advice?";
            }
            
            if (message.includes('pest') || message.includes('disease')) {
                return "Integrated Pest Management (IPM) is your best approach! I can help identify pests through image analysis, recommend beneficial insects, and suggest organic or targeted treatments. Early detection is key to preventing major infestations.";
            }
            
            if (message.includes('weather') || message.includes('climate')) {
                return "I monitor weather patterns and can provide 14-day forecasts tailored to farming needs. This includes temperature, precipitation, humidity, and growing degree days. Would you like alerts for critical weather events?";
            }
            
            if (message.includes('market') || message.includes('price')) {
                return "Current market trends show strong demand for organic produce and sustainable farming products. I can provide real-time commodity prices, connect you with local buyers, and suggest optimal selling times based on price predictions.";
            }
            
            if (message.includes('water') || message.includes('irrigation')) {
                return "Smart irrigation can increase yields by 20-30%! I recommend soil moisture sensors and weather-based scheduling. Consider drip irrigation for water efficiency and reduced disease pressure. Would you like help calculating your irrigation needs?";
            }
            
            // Default responses
            const defaultResponses = [
                "That's a great question! Based on current agricultural data and best practices, I'd recommend consulting with local agricultural extension services for region-specific advice. I can also help you find relevant resources and studies.",
                "I'm constantly learning from the latest agricultural research and farmer experiences. Let me provide you with data-driven insights tailored to your specific farming situation. Could you share more details about your farm?",
                "Agriculture is complex, but I'm here to help simplify it! I can analyze weather patterns, soil conditions, market trends, and crop performance to give you actionable recommendations. What specific area would you like to focus on?"
            ];
            
            return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }


// -------------------------------------------------------
        // AI Assistant Page Javascript
// -------------------------------------------------------


        let activeFeature = 'chat';
let userLocation = null;

// Sample farmer data
const localFarmers = [
    {
        name: "Green Valley Farm",
        distance: "2.3 miles",
        crops: ["Tomatoes", "Lettuce", "Carrots", "Herbs"],
        contact: "09034042611",
        rating: 4.8,
        specialty: "Organic vegetables"
    },
    {
        name: "Sunny Acres Farm",
        distance: "3.7 miles", 
        crops: ["Corn", "Beans", "Squash", "Peppers"],
        contact: "08132412354",
        rating: 4.6,
        specialty: "Fresh produce"
    },
    {
        name: "Heritage Harvest",
        distance: "5.1 miles",
        crops: ["Apples", "Berries", "Pumpkins", "Honey"],
        contact: "09038784768",
        rating: 4.9,
        specialty: "Seasonal fruits"
    }
];

function setActiveFeature(feature) {
    activeFeature = feature;
    
    // Update active tab
    document.querySelectorAll('.feature-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.closest('.feature-tab').classList.add('active');
    
    // Update chat title and suggestions
    updateChatInterface(feature);
}

function updateChatInterface(feature) {
    const title = document.getElementById('chat-title');
    const subtitle = document.getElementById('chat-subtitle');
    const suggestions = document.getElementById('suggestions');
    
    switch(feature) {
        case 'crops':
            title.textContent = 'Crop Advisory AI';
            subtitle.textContent = 'Specialized in planting and harvesting advice';
            suggestions.innerHTML = `
                <div class="suggestion-chip" onclick="sendSuggestion('What vegetables grow best in spring?')">🌱 Spring vegetables</div>
                <div class="suggestion-chip" onclick="sendSuggestion('When to harvest tomatoes?')">🍅 Harvest timing</div>
                <div class="suggestion-chip" onclick="sendSuggestion('Soil preparation tips')">🌱 Soil prep</div>
            `;
            break;
        case 'market':
            title.textContent = 'Market Intelligence AI';
            subtitle.textContent = 'Real-time prices and market trends';
            suggestions.innerHTML = `
                <div class="suggestion-chip" onclick="sendSuggestion('Current vegetable prices')">💰 Vegetable prices</div>
                <div class="suggestion-chip" onclick="sendSuggestion('Best time to sell crops')">📈 Selling strategy</div>
                <div class="suggestion-chip" onclick="sendSuggestion('Market demand forecast')">📊 Demand forecast</div>
            `;
            break;
        case 'farmers':
            title.textContent = 'Farmer Connection Hub';
            subtitle.textContent = 'Find local farmers and fresh produce';
            suggestions.innerHTML = `
                <div class="suggestion-chip" onclick="requestLocation()">📍 Share my location</div>
                <div class="suggestion-chip" onclick="sendSuggestion('Show organic farms near me')">🌿 Organic farms</div>
                <div class="suggestion-chip" onclick="sendSuggestion('Find farmers markets')">🏪 Farmers markets</div>
            `;
            break;
        case 'weather':
            title.textContent = 'Weather Intelligence AI';
            subtitle.textContent = 'Climate predictions for farming';
            suggestions.innerHTML = `
                <div class="suggestion-chip" onclick="sendSuggestion('7-day weather forecast')">🌤️ Weather forecast</div>
                <div class="suggestion-chip" onclick="sendSuggestion('Rainfall predictions')">🌧️ Rainfall forecast</div>
                <div class="suggestion-chip" onclick="sendSuggestion('Frost warnings')">❄️ Frost alerts</div>
            `;
            break;
        default:
            title.textContent = 'AgriAI Assistant';
            subtitle.textContent = 'Online and ready to help';
            suggestions.innerHTML = `
                <div class="suggestion-chip" onclick="sendSuggestion('What crops should I plant this season?')">🌾 Best crops for this season?</div>
                <div class="suggestion-chip" onclick="sendSuggestion('Find local farmers near me')">📍 Find local farmers</div>
                <div class="suggestion-chip" onclick="sendSuggestion('Current market prices for vegetables')">💰 Market prices</div>
                <div class="suggestion-chip" onclick="sendSuggestion('Weather forecast for farming')">🌤️ Weather forecast</div>
            `;
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendSuggestion(text) {
    const input = document.getElementById('user-input');
    input.value = text;
    sendMessage();
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage(message, 'user');
    input.value = '';
    
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateAIResponse(message);
        if (response) {
            addMessage(response, 'bot');
        }
    }, 1500);
}

function addMessage(content, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    if (typeof content === 'string') {
        messageContent.innerHTML = content;
    } else {
        messageContent.appendChild(content);
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    messagesContainer.appendChild(messageDiv);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function requestLocation() {
    if (navigator.geolocation) {
        addMessage("I'm requesting access to your location to find nearby farmers...", 'bot');
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                addMessage("📍 Location acquired! Here are farmers and fresh produce sources near you:", 'bot');
                showNearbyFarmers();
            },
            (error) => {
                addMessage("I couldn't access your location. Here are some popular farmers in common areas:", 'bot');
                showNearbyFarmers();
            }
        );
    } else {
        addMessage("Location services aren't available. Here are some popular local farmers:", 'bot');
        showNearbyFarmers();
    }
}

function showNearbyFarmers() {
    const farmersContainer = document.createElement('div');
    
    localFarmers.forEach(farmer => {
        const farmerCard = document.createElement('div');
        farmerCard.className = 'farmer-card';
        farmerCard.innerHTML = `
            <div class="farmer-header">
                <div class="farmer-avatar">
                    <i class="fas fa-tractor"></i>
                </div>
                <div class="farmer-info">
                    <h6>${farmer.name}</h6>
                    <div class="farmer-distance">📍 ${farmer.distance} away • ⭐ ${farmer.rating}/5</div>
                </div>
            </div>
            <div class="crop-tags">
                ${farmer.crops.map(crop => `<span class="crop-tag">${crop}</span>`).join('')}
            </div>
            <p style="margin: 10px 0; font-size: 14px; color: #6c757d;">
                <strong>Specialty:</strong> ${farmer.specialty}
            </p>
            <button class="contact-btn" onclick="contactFarmer('${farmer.name}', '${farmer.contact}')">
                <i class="fas fa-phone me-1"></i>Contact: ${farmer.contact}
            </button>
        `;
        farmersContainer.appendChild(farmerCard);
    });
    
    addMessage(farmersContainer, 'bot');
}

function contactFarmer(name, contact) {
    addMessage(`Great choice! You can contact ${name} at ${contact}. They're known for high-quality fresh produce and excellent customer service. Would you like me to help you prepare questions to ask them about their current harvest or seasonal availability?`, 'bot');
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Location-based responses
    if (message.includes('local') || message.includes('near me') || message.includes('farmers') || message.includes('find farmer')) {
        requestLocation();
        return '';
    }
    
    // Crop-specific responses
    if (message.includes('crop') || message.includes('plant') || message.includes('grow')) {
        return `🌱 <strong>Crop Recommendations:</strong><br><br>Based on current season and climate patterns, I recommend:<br><br>• <strong>Spring:</strong> Lettuce, spinach, peas, radishes<br>• <strong>Summer:</strong> Tomatoes, peppers, cucumbers, beans<br>• <strong>Fall:</strong> Broccoli, carrots, kale, Brussels sprouts<br>• <strong>Winter:</strong> Garlic, onions, winter squash<br><br>Consider your local climate zone and soil conditions. Would you like specific planting guidelines for any of these crops?`;
    }
    
    // Market information
    if (message.includes('price') || message.includes('market') || message.includes('sell')) {
        return `💰 <strong>Current Market Insights:</strong><br><br>• <strong>Tomatoes:</strong> $3.50/lb (↑ 12% this week)<br>• <strong>Lettuce:</strong> $2.25/head (↓ 5%)<br>• <strong>Peppers:</strong> $4.00/lb (→ stable)<br>• <strong>Herbs:</strong> $12-15/bunch (↑ 8%)<br><br><strong>Best selling strategy:</strong> Organic produce is commanding 25-30% premium. Consider local farmers markets for direct-to-consumer sales. Would you like tips on pricing your specific crops?`;
    }
    
    // Weather information
    if (message.includes('weather') || message.includes('rain') || message.includes('forecast')) {
        return `🌤️ <strong>Agricultural Weather Forecast:</strong><br><br>• <strong>Next 7 days:</strong> Partly cloudy, 68-75°F<br>• <strong>Rainfall:</strong> 0.3" expected Tuesday<br>• <strong>Humidity:</strong> 65-80% (good for leafy greens)<br>• <strong>UV Index:</strong> 7-8 (adequate sun for fruiting plants)<br><br><strong>Farming recommendations:</strong><br>• Good week for transplanting<br>• Minimal irrigation needed<br>• Watch for aphids in warm weather<br><br>Would you like specific weather alerts for your crops?`;
    }
    
    // Soil and farming advice
    if (message.includes('soil') || message.includes('fertilizer') || message.includes('pest')) {
        return `🌱 <strong>Soil & Plant Health Advice:</strong><br><br><strong>Soil Management:</strong><br>• Test pH levels (ideal: 6.0-7.0 for most crops)<br>• Add compost for organic matter<br>• Rotate crops to prevent soil depletion<br><br><strong>Natural Pest Control:</strong><br>• Companion planting (basil with tomatoes)<br>• Beneficial insects (ladybugs, predatory wasps)<br>• Neem oil for organic pest management<br><br><strong>Fertilization:</strong><br>• Use nitrogen-rich fertilizer for leafy greens<br>• Phosphorus for root development<br>• Potassium for fruit and flower production<br>• Apply organic compost monthly<br><br>Would you like specific advice for your particular crops or soil conditions?`;
    }
    
    // Harvest timing
    if (message.includes('harvest') || message.includes('when to pick') || message.includes('ripe')) {
        return `🍅 <strong>Harvest Timing Guide:</strong><br><br><strong>Common Harvest Indicators:</strong><br>• <strong>Tomatoes:</strong> Deep red color, slight give when pressed<br>• <strong>Lettuce:</strong> Full-sized leaves, before bolting<br>• <strong>Peppers:</strong> Firm texture, full color development<br>• <strong>Carrots:</strong> Orange color visible at soil surface<br><br><strong>Best Practices:</strong><br>• Harvest in early morning for best quality<br>• Use clean, sharp tools<br>• Handle gently to avoid bruising<br>• Store properly for maximum shelf life<br><br>Which specific crops are you planning to harvest?`;
    }
    
    // Disease and pest identification
    if (message.includes('disease') || message.includes('sick') || message.includes('problem') || message.includes('help')) {
        return `🩺 <strong>Plant Health Diagnostics:</strong><br><br><strong>Common Issues:</strong><br>• <strong>Yellowing leaves:</strong> Often overwatering or nitrogen deficiency<br>• <strong>Brown spots:</strong> Possible fungal infection<br>• <strong>Wilting:</strong> Root problems or water stress<br>• <strong>Holes in leaves:</strong> Insect damage<br><br><strong>Quick Solutions:</strong><br>• Improve drainage for water issues<br>• Apply organic fungicide for spots<br>• Check soil moisture regularly<br>• Use row covers for pest protection<br><br>Can you describe the specific symptoms you're seeing? I can provide targeted advice.`;
    }
    
    // Organic farming
    if (message.includes('organic') || message.includes('natural') || message.includes('chemical-free')) {
        return `🌿 <strong>Organic Farming Guide:</strong><br><br><strong>Natural Fertilizers:</strong><br>• Compost and aged manure<br>• Fish emulsion for quick nitrogen<br>• Bone meal for phosphorus<br>• Wood ash for potassium<br><br><strong>Pest Management:</strong><br>• Crop rotation every season<br>• Beneficial insect habitat<br>• Companion planting strategies<br>• Physical barriers and traps<br><br><strong>Certification Tips:</strong><br>• Keep detailed records<br>• 3-year transition period required<br>• Use only approved inputs<br><br>Are you interested in transitioning to organic methods or already certified?`;
    }
    
    // Season-specific advice
    if (message.includes('spring') || message.includes('summer') || message.includes('fall') || message.includes('winter')) {
        const season = getCurrentSeason();
        return `🗓️ <strong>${season} Farming Calendar:</strong><br><br><strong>Current Tasks:</strong><br>${getSeasonalTasks(season)}<br><br><strong>Planting Schedule:</strong><br>${getSeasonalPlants(season)}<br><br><strong>Maintenance:</strong><br>${getSeasonalMaintenance(season)}<br><br>Would you like specific timing for your climate zone?`;
    }
    
    // Default responses
    const defaultResponses = [
        `🌾 <strong>Welcome to AgriAI!</strong><br><br>I'm here to help with all your farming needs. I can assist with:<br><br>• Crop planning and planting advice<br>• Market prices and selling strategies<br>• Weather forecasts for farming<br>• Connecting you with local farmers<br>• Soil health and pest management<br><br>What would you like to know about today?`,
        
        `🤖 <strong>How can I help you today?</strong><br><br>I specialize in:<br>• Agricultural advice and crop management<br>• Local farmer connections<br>• Market intelligence and pricing<br>• Weather and climate information<br><br>Feel free to ask me anything about farming, gardening, or finding fresh local produce!`,
        
        `👋 <strong>Hello there!</strong><br><br>I'm your AI farming assistant. Whether you're a seasoned farmer, home gardener, or looking for fresh local produce, I'm here to help.<br><br>Try asking me about seasonal planting, market prices, weather forecasts, or finding farmers in your area!`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Helper functions for seasonal advice
function getCurrentSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Fall';
    return 'Winter';
}

function getSeasonalTasks(season) {
    const tasks = {
        'Spring': '• Prepare seedbeds and soil<br>• Start seedlings indoors<br>• Plan crop rotation<br>• Apply compost and amendments',
        'Summer': '• Regular watering and mulching<br>• Pest and disease monitoring<br>• Harvest early crops<br>• Succession planting',
        'Fall': '• Harvest and storage<br>• Plant cover crops<br>• Clean up garden beds<br>• Collect and save seeds',
        'Winter': '• Plan next year\'s garden<br>• Order seeds and supplies<br>• Maintain tools and equipment<br>• Study crop rotation plans'
    };
    return tasks[season] || '';
}

function getSeasonalPlants(season) {
    const plants = {
        'Spring': '• Cool-season crops: lettuce, spinach, peas<br>• Root vegetables: carrots, radishes<br>• Herbs: cilantro, dill, parsley',
        'Summer': '• Warm-season crops: tomatoes, peppers<br>• Vine crops: cucumbers, squash<br>• Heat-loving herbs: basil, oregano',
        'Fall': '• Winter vegetables: kale, Brussels sprouts<br>• Storage crops: potatoes, onions<br>• Cover crops: rye, clover',
        'Winter': '• Indoor growing: microgreens, sprouts<br>• Cold frames: winter lettuce<br>• Planning: seed orders, garden design'
    };
    return plants[season] || '';
}

function getSeasonalMaintenance(season) {
    const maintenance = {
        'Spring': '• Soil testing and amendment<br>• Irrigation system check<br>• Tool sharpening and maintenance',
        'Summer': '• Daily watering monitoring<br>• Mulch application<br>• Pruning and training plants',
        'Fall': '• Equipment winterization<br>• Compost pile management<br>• Greenhouse preparation',
        'Winter': '• Tool maintenance and storage<br>• Planning and education<br>• Cold protection for perennials'
    };
    return maintenance[season] || '';
}

// Initialize the interface when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateChatInterface('chat');
    
    // Add welcome message
    setTimeout(() => {
        addMessage("🌾 Welcome to AgriAI! I'm your intelligent farming assistant. How can I help you today?", 'bot');
    }, 500);
});





// -------------------------------------------------------
        // About Page Javascript
// -------------------------------------------------------


// Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.mission-card, .feature-card, .team-card, .stat-item').forEach(el => {
            observer.observe(el);
        });

        // Counter animation for stats
        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString() + (element.dataset.suffix || '');
            }, 40);
        };

        // Animate stats when they come into view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const number = entry.target.querySelector('.stat-number');
                    const text = number.textContent;
                    let target;
                    
                    if (text.includes('K')) {
                        target = parseInt(text) * 1000;
                        number.dataset.suffix = 'K+';
                    } else if (text.includes('M')) {
                        target = parseInt(text) * 1000000;
                        number.dataset.suffix = 'M+';
                    } else if (text.includes('%')) {
                        target = parseInt(text);
                        number.dataset.suffix = '%';
                    }
                    
                    animateCounter(number, target);
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll('.stat-item').forEach(el => {
            statsObserver.observe(el);
        });