// script.js - SmartPilgrim Temple Crowd Management System

// ========== Multi-Language Support ==========
const translations = {
    en: {
        welcome: 'Welcome to Smart Temple Management',
        bookSlot: 'Book E-Darshan',
        currentCrowd: 'Current Devotees',
        emergency: 'Emergency',
        facilities: 'Facilities'
    },
    hi: {
        welcome: 'स्मार्ट मंदिर प्रबंधन में आपका स्वागत है',
        bookSlot: 'ई-दर्शन बुक करें',
        currentCrowd: 'वर्तमान भक्त',
        emergency: 'आपातकाल',
        facilities: 'सुविधाएं'
    },
    gu: {
        welcome: 'સ્માર્ટ મંદિર વ્યવસ્થાપનમાં આપનું સ્વાગત છે',
        bookSlot: 'ઈ-દર્શન બુક કરો',
        currentCrowd: 'વર્તમાન ભક્તો',
        emergency: 'કટોકટી',
        facilities: 'સુવિધાઓ'
    },
    mr: {
        welcome: 'स्मार्ट मंदिर व्यवस्थापनात आपले स्वागत',
        bookSlot: 'ई-दर्शन बुक करा',
        currentCrowd: 'सध्याचे भक्त',
        emergency: 'आपत्कालीन',
        facilities: 'सुविधा'
    },
    ta: {
        welcome: 'ஸ்மார்ட் கோயில் நிர்வாகத்திற்கு வரவேற்கிறோம்',
        bookSlot: 'இ-தரிசனம் பதிவு',
        currentCrowd: 'தற்போதைய பக்தர்கள்',
        emergency: 'அவசரநிலை',
        facilities: 'வசதிகள்'
    },
    te: {
        welcome: 'స్మార్ట్ టెంపుల్ మేనేజ్‌మెంట్‌కు స్వాగతం',
        bookSlot: 'ఇ-దర్శనం బుక్ చేయండి',
        currentCrowd: 'ప్రస్తుత భక్తులు',
        emergency: 'అత్యవసర',
        facilities: 'సౌకర్యాలు'
    }
};

let currentLanguage = 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    updatePageLanguage();
    localStorage.setItem('preferredLanguage', lang);
}

function updatePageLanguage() {
    // Update page text based on selected language
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// ========== User Authentication ==========
let isLoggedIn = false;
let userData = null;

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function showLoginTab(tab) {
    const tabs = document.querySelectorAll('.login-tab');
    tabs.forEach(t => t.style.display = 'none');
    document.getElementById(tab + '-tab').style.display = 'block';
    
    const headers = document.querySelectorAll('.modal-body .tab-header');
    headers.forEach(h => h.classList.remove('active'));
    event.target.classList.add('active');
}

function performLogin(event) {
    event.preventDefault();
    // Simulate login
    isLoggedIn = true;
    userData = {
        name: 'Devotee User',
        mobile: '9876543210',
        email: 'user@example.com'
    };
    document.getElementById('userMenu').style.display = 'flex';
    document.querySelector('.login-btn').style.display = 'none';
    closeLoginModal();
    showNotification('✅ Login successful! Welcome back!', 'success');
    loadUserData();
}

function performRegister(event) {
    event.preventDefault();
    showNotification('✅ Registration successful! Please login.', 'success');
    showLoginTab('login');
}

function sendOTP(event) {
    event.preventDefault();
    document.getElementById('otpInput').style.display = 'block';
    showNotification('📱 OTP sent to your mobile number', 'info');
}

function verifyOTP() {
    isLoggedIn = true;
    closeLoginModal();
    showNotification('✅ OTP verified successfully!', 'success');
}

function logout() {
    isLoggedIn = false;
    userData = null;
    document.getElementById('userMenu').style.display = 'none';
    document.querySelector('.login-btn').style.display = 'block';
    showNotification('👋 Logged out successfully', 'info');
}

function showProfile() {
    alert('User Profile:\n' + JSON.stringify(userData, null, 2));
}

function forgotPassword() {
    const email = prompt('Enter your registered email:');
    if (email) {
        showNotification('📧 Password reset link sent to ' + email, 'info');
    }
}

function loadUserData() {
    // Load user's booking history, preferences, etc.
    if (isLoggedIn && userData) {
        // Fetch and display user data
        console.log('Loading user data for:', userData.name);
    }
}

// ========== Payment Integration ==========
function showDonationModal() {
    document.getElementById('donationModal').style.display = 'block';
}

function closeDonationModal() {
    document.getElementById('donationModal').style.display = 'none';
}

function updateDonationAmount(category) {
    const amounts = {
        annadaan: 501,
        maintenance: 1001,
        pooja: 2501,
        development: 5001,
        custom: 0
    };
    
    const amountField = document.getElementById('donationAmount');
    if (category === 'custom') {
        amountField.readOnly = false;
        amountField.value = '';
    } else {
        amountField.readOnly = true;
        amountField.value = amounts[category];
    }
}

function processDonation(event) {
    event.preventDefault();
    const amount = document.getElementById('donationAmount').value;
    showNotification(`Processing donation of ₹${amount}...`, 'info');
    // Redirect to payment gateway
    setTimeout(() => {
        showNotification('✅ Donation successful! Receipt sent to your email.', 'success');
        closeDonationModal();
        updateDonationCounter();
    }, 2000);
}

function payWithUPI() {
    window.open('upi://pay?pa=temple@upi&pn=SmartPilgrim&am=' + document.getElementById('donationAmount').value);
}

function payWithCard() {
    // Integrate with payment gateway like Razorpay, PayU, etc.
    alert('Redirecting to card payment gateway...');
}

function payWithNetBanking() {
    alert('Redirecting to net banking...');
}

function updateDonationCounter() {
    const counter = document.getElementById('donationAmount');
    if (counter) {
        const currentAmount = parseInt(counter.textContent.replace(/,/g, ''));
        const newAmount = currentAmount + Math.floor(Math.random() * 1000);
        counter.textContent = newAmount.toLocaleString('en-IN');
    }
}

// ========== Live Camera Feed ==========
function showLiveCam() {
    document.getElementById('liveCamModal').style.display = 'block';
}

function closeLiveCam() {
    document.getElementById('liveCamModal').style.display = 'none';
}

function switchCamera(camera) {
    console.log('Switching to camera:', camera);
    // In production, this would switch actual camera feeds
}

// ========== Chatbot Functions ==========
let chatbotOpen = true;

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = (chatbot.style.display === 'flex') ? 'none' : 'flex';
}



function sendChatMessage(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        input.value = '';
        
        // AI Response (simulated)
        setTimeout(() => {
            const response = getChatbotResponse(message);
            addChatMessage(response, 'bot');
        }, 1000);
    }
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getChatbotResponse(message) {
    const responses = {
        'darshan': 'You can book darshan slots through our E-Darshan booking system. Current waiting time is approximately 45 minutes.',
        'parking': 'Parking Lot A has 150 spots available. Lot B is almost full with only 40 spots.',
        'timing': 'Temple is open from 5:00 AM to 9:00 PM. Special darshan starts at 4:00 AM on festivals.',
        'donate': 'You can donate online through UPI, cards, or net banking. Click the Donate Now button.',
        'emergency': 'For medical emergency call 108. For security issues call 100.',
        'default': 'I can help you with darshan booking, parking info, temple timings, donations, and emergency services. What would you like to know?'
    };
    
    const lowercaseMsg = message.toLowerCase();
    for (const key in responses) {
        if (lowercaseMsg.includes(key)) {
            return responses[key];
        }
    }
    return responses.default;
}

// ========== Voice Assistant ==========
let recognition = null;

function startVoiceAssistant() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.lang = currentLanguage === 'en' ? 'en-IN' : currentLanguage + '-IN';
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onstart = function() {
            showVoiceIndicator();
        };
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            processVoiceCommand(transcript);
            hideVoiceIndicator();
        };
        
        recognition.onerror = function(event) {
            console.error('Voice recognition error:', event.error);
            hideVoiceIndicator();
        };
        
        recognition.start();
    } else {
        alert('Voice recognition not supported in your browser');
    }
}

function processVoiceCommand(command) {
    console.log('Voice command:', command);
    speakResponse('Processing your request: ' + command);
    
    // Process commands
    if (command.toLowerCase().includes('book')) {
        showTab('booking-tab');
        speakResponse('Opening booking form');
    } else if (command.toLowerCase().includes('crowd')) {
        showTab('crowd-tab');
        speakResponse('Showing crowd information');
    } else if (command.toLowerCase().includes('emergency')) {
        showEmergency();
        speakResponse('Opening emergency assistance');
    }
}

function speakResponse(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLanguage === 'en' ? 'en-IN' : currentLanguage + '-IN';
        window.speechSynthesis.speak(utterance);
    }
}

function showVoiceIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'voice-active';
    indicator.id = 'voiceIndicator';
    indicator.innerHTML = `
        <h3>🎤 Listening...</h3>
        <div class="voice-wave"></div>
        <p>Speak your command</p>
    `;
    document.body.appendChild(indicator);
}

function hideVoiceIndicator() {
    const indicator = document.getElementById('voiceIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// ========== Panic Button with GPS ==========
function panicButton() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const emergencyData = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                timestamp: new Date().toISOString(),
                user: userData ? userData.name : 'Anonymous'
            };
            
            // Send to emergency services
            console.log('Emergency alert sent:', emergencyData);
            showNotification('🚨 Emergency alert sent with your location!', 'danger');
            
            // Simulate emergency response
            setTimeout(() => {
                showNotification('✅ Help is on the way! Medical team dispatched.', 'success');
            }, 3000);
        }, error => {
            console.error('Location error:', error);
            showNotification('⚠️ Could not get location. Emergency alert sent!', 'warning');
        });
    } else {
        showNotification('⚠️ Location not available. Emergency alert sent!', 'warning');
    }
}

// ========== QR Code Scanner ==========
function openQRScanner() {
    document.getElementById('qrScanner').style.display = 'block';
    // Initialize QR scanner library (like Html5QrcodeScanner)
    // This would require including a QR scanning library
}

function closeQRScanner() {
    document.getElementById('qrScanner').style.display = 'none';
}

// ========== Interactive Map Functions ==========
function zoomIn() {
    console.log('Zooming in map');
    // Implement zoom functionality
}

function zoomOut() {
    console.log('Zooming out map');
    // Implement zoom functionality
}

function resetView() {
    console.log('Resetting map view');
    // Reset map to default view
}

function switchFloor(floor) {
    console.log('Switching to floor:', floor);
    // Load different floor plan
}

function showZoneDetails(zone) {
    const zoneInfo = {
        'entry1': 'Entry Gate 1: Currently low crowd. Best time to enter.',
        'security': 'Security Check: Moderate crowd. Wait time ~10 minutes.',
        'queue': 'Main Queue: High density. Consider virtual queue booking.',
        'sanctum': 'Main Sanctum: Very crowded. Peak darshan time.',
        'prasad': 'Prasad Counter: Moderate crowd. Prasad available.',
        'parkingA': 'Parking Lot A: 150 spots available',
        'parkingB': 'Parking Lot B: Almost full - 40 spots only'
    };
    
    alert(zoneInfo[zone] || 'Zone information');
}

// ========== Crowd Prediction Chart ==========
function initCrowdChart() {
    const canvas = document.getElementById('crowdChart');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        
        // Simple bar chart
        const hours = ['11AM', '12PM', '1PM', '2PM', '3PM', '4PM'];
        const crowds = [2500, 3000, 2000, 1500, 2800, 3500];
        
        const barWidth = 40;
        const gap = 10;
        const maxHeight = 120;
        
        ctx.fillStyle = '#003d82';
        
        crowds.forEach((crowd, index) => {
            const barHeight = (crowd / 4000) * maxHeight;
            const x = index * (barWidth + gap) + 20;
            const y = maxHeight - barHeight + 10;
            
            // Draw bar
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw label
            ctx.fillStyle = '#666';
            ctx.font = '10px Arial';
            ctx.fillText(hours[index], x + 5, maxHeight + 25);
            ctx.fillText(crowd, x + 5, y - 5);
            
            ctx.fillStyle = '#003d82';
        });
    }
}

// ========== Group Booking Functions ==========
function updateGroupSize(size) {
    const basePrice = 100; // For special darshan
    const totalAmount = document.getElementById('totalAmount');
    if (totalAmount) {
        totalAmount.textContent = basePrice * size;
    }
}

function toggleRecurring(type) {
    if (type === 'Recurring Weekly' || type === 'Recurring Monthly') {
        alert('Recurring bookings will be automatically scheduled for the selected time slot');
    } else if (type === 'Special Occasion') {
        const occasion = prompt('Please specify the occasion (Birthday, Anniversary, etc.):');
        if (occasion) {
            showNotification('Special arrangements will be made for ' + occasion, 'info');
        }
    }
}

// ========== Download Functions ==========
function downloadTicket() {
    // Generate PDF ticket
    const ticketData = {
        token: 'A-2547',
        date: '23/09/2025',
        time: '7:00 AM - 8:00 AM',
        devotees: 2
    };
    
    // In production, use a PDF library like jsPDF
    const ticketContent = `
        SMARTPILGRIM E-TICKET
        =====================
        Token: ${ticketData.token}
        Date: ${ticketData.date}
        Time: ${ticketData.time}
        Devotees: ${ticketData.devotees}
        
        Please carry this ticket and valid ID proof.
    `;
    
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'temple-ticket.txt';
    a.click();
}

// ========== Notification System ==========
function enableNotifications() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification('🔔 Notifications enabled! You will be alerted 15 minutes before your turn.', 'success');
                
                // Schedule notification
                setTimeout(() => {
                    new Notification('SmartPilgrim Alert', {
                        body: 'Your darshan turn is coming up in 15 minutes!',
                        icon: '/favicon.ico',
                        badge: '/badge.png'
                    });
                }, 30000); // Demo: 30 seconds instead of 15 minutes
            }
        });
    }
}

// ========== AI Analytics ==========
function showAIAnalytics() {
    const analytics = `
        🤖 AI-Powered Analytics Report
        ================================
        
        Current Patterns:
        • Peak hours detected: 10-11 AM, 5-7 PM
        • Average wait time: 45 minutes
        • Crowd density: 78% of capacity
        
        Predictions (Next 6 Hours):
        • 11 AM - 12 PM: +25% crowd increase
        • 12 PM - 1 PM: -10% crowd decrease (lunch time)
        • 1 PM - 2 PM: -30% lowest crowd
        • 2 PM - 3 PM: +15% gradual increase
        • 3 PM - 4 PM: +40% afternoon rush
        • 4 PM - 5 PM: +60% evening peak
        
        Recommendations:
        1. Open Emergency Gate 3 at 11:30 AM
        2. Deploy 5 additional security personnel
        3. Activate overflow parking by 3 PM
        4. Increase prasad counter staff by 2
        
        Anomaly Detection:
        ✓ No unusual patterns detected
        ✓ All systems functioning normally
    `;
    
    alert(analytics);
}

// ========== Social Sharing ==========
function shareExperience(platform) {
    const message = 'Had a wonderful darshan at the temple through SmartPilgrim system! #SmartPilgrim #DigitalIndia';
    const url = window.location.href;
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?text=${message}&url=${url}`,
        whatsapp: `https://wa.me/?text=${message} ${url}`,
        instagram: '#' // Instagram doesn't support direct URL sharing
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank');
    }
}

// ========== Service Worker for Offline Support ==========
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(registration => {
        console.log('Service Worker registered:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    showNotification('📱 New version available! Refresh to update.', 'info');
                }
            });
        });
    }).catch(error => {
        console.error('Service Worker registration failed:', error);
    });
}

// ========== Initialize Enhanced Features ==========
function initializeEnhancedFeatures() {
    // Initialize crowd chart
    initCrowdChart();
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        document.getElementById('languageSelector').value = savedLanguage;
        updatePageLanguage();
    }
    
    // Auto-update donation counter
    setInterval(updateDonationCounter, 30000);
    
    // Initialize push notifications
    if ('PushManager' in window) {
        navigator.serviceWorker.ready.then(registration => {
            registration.pushManager.getSubscription().then(subscription => {
                if (!subscription) {
                    // Subscribe to push notifications
                    console.log('Push notifications available');
                }
            });
        });
    }
    
    // Check online/offline status
    window.addEventListener('online', () => {
        const indicator = document.querySelector('.offline-indicator');
        if (indicator) indicator.remove();
        showNotification('✅ Back online!', 'success');
    });
    
    window.addEventListener('offline', () => {
        const indicator = document.createElement('div');
        indicator.className = 'offline-indicator';
        indicator.textContent = '⚠️ You are offline - Limited functionality';
        document.body.appendChild(indicator);
    });
    
    // Initialize geolocation for nearest temple suggestions
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log('User location:', position.coords);
            // Find nearest temples based on location
        });
    }
}

// ========== Admin Dashboard Functions ==========
function showAdminDashboard() {
    if (!isLoggedIn || !userData || userData.role !== 'admin') {
        showNotification('⚠️ Admin access required', 'warning');
        return;
    }
    
    // Load admin dashboard with analytics
    console.log('Loading admin dashboard...');
}

// ========== Initialize All Features on Load ==========
window.addEventListener('load', function() {
    initializeApp();
    initializeEnhancedFeatures();
});

// ========== Mobile Menu Functions ==========
function toggleMobileMenu() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (sidebar.classList.contains('active')) {
        closeMobileMenu();
    } else {
        sidebar.classList.add('active');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.querySelector('.mobile-overlay');
    
    sidebar.classList.remove('active');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ========== Responsive Table Enhancement ==========
function makeTablesResponsive() {
    const tables = document.querySelectorAll('.data-table');
    tables.forEach(table => {
        const headers = table.querySelectorAll('thead th');
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, index) => {
                if (headers[index]) {
                    cell.setAttribute('data-label', headers[index].textContent);
                }
            });
        });
    });
}

// ========== Time Update Function ==========
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    const updateElement = document.getElementById('lastUpdate');
    if (updateElement) {
        updateElement.textContent = timeString;
    }
}

// ========== Responsive Viewport Handler ==========
function handleResize() {
    const width = window.innerWidth;
    const rightSidebar = document.querySelector('.right-sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (width <= 768) {
        // Mobile view adjustments
        if (rightSidebar) {
            const widgets = rightSidebar.querySelectorAll('.widget');
            widgets.forEach(widget => {
                widget.style.marginBottom = '15px';
            });
        }
    } else if (width > 768 && width <= 1024) {
        // Tablet view adjustments
        if (mainContent) {
            mainContent.style.maxWidth = '100%';
        }
    } else {
        // Desktop view
        if (mainContent) {
            mainContent.style.maxWidth = '';
        }
    }
}

// ========== Debounce Utility ==========
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== Tab Functionality ==========
function showTab(tabId) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-pane');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active from all headers
    const headers = document.querySelectorAll('.tab-header');
    headers.forEach(header => header.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Mark header as active
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Scroll to top on mobile
    if (window.innerWidth <= 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ========== Live Data Simulation ==========
function updateLiveData() {
    // Update crowd count
    const currentCount = document.getElementById('currentCount');
    if (currentCount) {
        const count = parseInt(currentCount.textContent.replace(/,/g, ''));
        const change = Math.floor(Math.random() * 100) - 50;
        const newCount = Math.max(0, count + change);
        currentCount.textContent = newCount.toLocaleString('en-IN');
    }

    // Update token numbers
    const tokenElements = document.querySelectorAll('.current-token');
    tokenElements.forEach(elem => {
        const currentToken = elem.textContent;
        const prefix = currentToken.substring(0, 2);
        const number = parseInt(currentToken.substring(2));
        if (!isNaN(number)) {
            elem.textContent = prefix + (number + 1);
        }
    });
}

// ========== Form Submissions ==========
function submitBooking(event) {
    event.preventDefault();
    alert('Booking submitted successfully!\nToken Number: A-2547\nYou will receive SMS confirmation shortly.');
    event.target.reset();
}

function submitQueueForm(event) {
    event.preventDefault();
    alert('Virtual Queue Slot Booked!\nYour Token: B-1234\nEstimated Time: 45 minutes');
}

// ========== Quick Action Functions ==========
function showEmergency() {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function bookSlot() {
    showTab('booking-tab');
    const bookingTab = document.querySelector('[onclick*="booking-tab"]');
    if (bookingTab) {
        bookingTab.click();
    }
}

function viewMap() {
    showTab('crowd-tab');
}

function findParking() {
    showTab('parking-tab');
}

function viewFacilities() {
    alert('Facilities Information:\n• Medical Center: Gate 2\n• Restrooms: All Gates\n• Food Court: Near Parking B\n• Cloak Room: Gate 1 & 3');
}

function specialAssistance() {
    alert('Special Assistance Request Registered!\nOur staff will contact you shortly.\nWhatsApp: 98765-XXXXX');
}

function donateOnline() {
    alert('Redirecting to secure payment gateway...\nUPI ID: templedonation@gujarat');
}

function checkStatus() {
    const token = prompt('Enter your booking token number:');
    if (token) {
        alert(`Status for Token ${token}:\nConfirmed for 23/09/2025\nTime Slot: 7:00 AM - 8:00 AM\nDevotees: 2`);
    }
}

function downloadApp() {
    alert('Download SmartPilgrim App:\n• Android: Play Store\n• iOS: App Store\nSearch: "SmartPilgrim Gujarat"');
}

function virtualTour() {
    alert('Launching 360° Virtual Temple Tour...\nRequires WebGL enabled browser');
}

function printToken() {
    window.print();
}

function reportIssue() {
    const issue = prompt('Please describe the issue:');
    if (issue) {
        alert('Issue reported successfully!\nComplaint ID: CMP2025092201\nWe will address it within 24 hours.');
    }
}

function toggleAccessibility() {
    const body = document.body;
    const currentSize = window.getComputedStyle(body).fontSize;
    if (currentSize === '16px') {
        body.style.fontSize = '20px';
        alert('Large font mode enabled');
    } else {
        body.style.fontSize = '16px';
        alert('Normal font mode');
    }
}

// ========== Sidebar Menu Functions ==========
function showDashboard() {
    alert('Loading Dashboard...');
}

function showBooking() {
    showTab('booking-tab');
}

function showCrowdMap() {
    showTab('crowd-tab');
}

function showQueueStatus() {
    showTab('queue-tab');
}

function showParking() {
    showTab('parking-tab');
}

function showDonation() {
    alert('Online Donation Portal:\n• Annadaan: ₹501\n• Temple Maintenance: ₹1001\n• Special Pooja: ₹2501\nUPI/Card/Net Banking accepted');
}

function showComplaints() {
    alert('Lodge Complaint:\n• Category: Select issue type\n• Description: Provide details\n• Upload Photo: Optional\nTrack via Complaint ID');
}

function showHistory() {
    alert('Your Booking History:\n1. 15/08/2025 - Completed\n2. 22/07/2025 - Completed\n3. 10/06/2025 - Completed');
}

function showGuidelines() {
    alert('Visitor Guidelines:\n• Dress Code: Traditional\n• Mobile: Silent Mode\n• Photography: Not allowed in sanctum\n• Prasad: Only from counters');
}

function showDownloads() {
    alert('Available Downloads:\n• Mobile App (Android/iOS)\n• Temple Calendar PDF\n• Visitor Guide PDF\n• Route Map PDF');
}

function showHelp() {
    alert('Need Help?\n• Call: 1800-XXX-XXXX\n• WhatsApp: 98765-XXXXX\n• Email: support@smartpilgrim.gujarat.gov.in');
}

function changeTemple(temple) {
    alert(`Switched to ${temple} live data`);
    // In real implementation, this would load temple-specific data
}

// ========== Swipe Gesture Handler ==========
function initSwipeGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const sidebar = document.getElementById('mobileSidebar');
        
        if (touchEndX < touchStartX - swipeThreshold && sidebar.classList.contains('active')) {
            closeMobileMenu();
        }
        if (touchEndX > touchStartX + swipeThreshold && !sidebar.classList.contains('active') && touchStartX < 50) {
            toggleMobileMenu();
        }
    }
}

// ========== Smooth Scroll ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========== Notification System ==========
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const isMobile = window.innerWidth <= 768;
    
    notification.style.cssText = `
        position: fixed;
        ${isMobile ? 'bottom: 80px; left: 10px; right: 10px;' : 'top: 100px; right: 20px; max-width: 300px;'}
        background: var(--gov-${type === 'success' ? 'green' : 'red'});
        color: white;
        padding: ${isMobile ? '12px 15px' : '15px 20px'};
        border-radius: 5px;
        box-shadow: 0 ${isMobile ? '3px 10px' : '5px 20px'} rgba(0,0,0,0.3);
        z-index: 10000;
        animation: ${isMobile ? 'slideInUp' : 'slideInRight'} 0.5s ease;
    `;
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), isMobile ? 3000 : 5000);
}

// ========== Touch Enhancement ==========
function enhanceTouchElements() {
    if ('ontouchstart' in window) {
        document.querySelectorAll('.btn, .tab-header, .zone-block').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            });
            element.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
    }
}

// ========== Network Status ==========
function initNetworkStatus() {
    window.addEventListener('online', function() {
        showNotification('✅ Connection restored', 'success');
    });

    window.addEventListener('offline', function() {
        showNotification('❌ No internet connection', 'danger');
    });
}

// ========== Lazy Loading ==========
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ========== Mobile Optimizations ==========
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            const style = el.getAttribute('style');
            if (style && style.includes('animation-duration')) {
                el.style.animationDuration = '0.3s';
            }
        });
        
        // Optimize scroll performance
        document.addEventListener('scroll', debounce(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const header = document.querySelector('.main-nav');
            
            if (header) {
                if (scrollTop > 100) {
                    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
                } else {
                    header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
                }
            }
        }, 100));
    }
}

// ========== Service Worker Registration ==========
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(err => console.log('SW registration failed:', err));
    }
}

// ========== WebSocket Connection (Simulated) ==========
function connectWebSocket() {
    console.log('Connecting to real-time updates...');
    // In production, this would be actual WebSocket connection
    // Example:
    // const ws = new WebSocket('wss://smartpilgrim.gujarat.gov.in/live');
    // ws.onmessage = (event) => {
    //     const data = JSON.parse(event.data);
    //     updateLiveData(data);
    // };
}

// ========== Analytics Tracking ==========
function trackEvent(category, action, label) {
    console.log(`Analytics: ${category} - ${action} - ${label}`);
    // In production:
    // if (window.gtag) {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// ========== Initialize Application ==========
function initializeApp() {
    // Update time immediately and set interval
    updateTime();
    setInterval(updateTime, 60000); // Update every minute
    
    // Make tables responsive
    makeTablesResponsive();
    
    // Handle initial resize
    handleResize();
    
    // Set up viewport meta tag
    let viewport = document.querySelector("meta[name=viewport]");
    if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = "viewport";
        viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes";
        document.getElementsByTagName('head')[0].appendChild(viewport);
    }
    
    // Initialize swipe gestures
    initSwipeGestures();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Enhance touch elements
    enhanceTouchElements();
    
    // Initialize network status
    initNetworkStatus();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Optimize for mobile if needed
    optimizeForMobile();
    
    // Register service worker
    registerServiceWorker();
    
    // Connect to WebSocket for real-time updates
    connectWebSocket();
    
    // Show initial notification after 3 seconds
    setTimeout(() => {
        showNotification('✅ System Status: All services operational', 'success');
    }, 3000);
    
    // Start live data updates every 30 seconds
    setInterval(updateLiveData, 30000);
    
    // Auto-refresh critical data every 5 minutes
    setInterval(() => {
        console.log('Refreshing live data...');
        updateLiveData();
    }, 300000);
}

// ========== Event Listeners ==========

// Window load event
window.addEventListener('load', initializeApp);

// Window resize event (debounced)
window.addEventListener('resize', debounce(handleResize, 250));

// Orientation change event
window.addEventListener('orientationchange', function() {
    setTimeout(handleResize, 100);
});

// Click event delegation
document.addEventListener('click', function(event) {
    // Close modal when clicking outside
    const modal = document.getElementById('emergencyModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    
    // Close mobile menu if clicking overlay
    if (event.target.classList.contains('mobile-overlay')) {
        closeMobileMenu();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key handling
    if (e.key === 'Escape') {
        closeModal();
        closeMobileMenu();
    }
    
    // Tab key handling for accessibility
    if (e.key === 'Tab') {
        // Allow default tab behavior
    }
});

// Form validation enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add custom validation messages
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('invalid', function(e) {
            e.preventDefault();
            const field = e.target;
            field.classList.add('error');
            
            // Custom validation messages
            if (field.validity.valueMissing) {
                field.setCustomValidity('This field is required');
            } else if (field.validity.patternMismatch) {
                field.setCustomValidity('Please enter a valid format');
            }
        }, true);
        
        form.addEventListener('input', function(e) {
            const field = e.target;
            field.classList.remove('error');
            field.setCustomValidity('');
        });
    });
});

// ========== Utility Functions ==========

// Format number with Indian numbering system
function formatIndianNumber(num) {
    const formatter = new Intl.NumberFormat('en-IN');
    return formatter.format(num);
}

// Get current location (if needed for location-based services)
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log('Location:', position.coords.latitude, position.coords.longitude);
                // Use location for nearest temple suggestions
            },
            error => {
                console.log('Location error:', error);
            }
        );
    }
}

// Check browser compatibility
function checkCompatibility() {
    const features = {
        'Service Worker': 'serviceWorker' in navigator,
        'LocalStorage': typeof(Storage) !== "undefined",
        'Geolocation': navigator.geolocation,
        'WebSocket': 'WebSocket' in window,
        'IntersectionObserver': 'IntersectionObserver' in window
    };
    
    console.log('Browser Compatibility:', features);
    return features;
}

// Performance monitoring
function monitorPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                console.log('Page load time:', loadTime + 'ms');
                
                // Send to analytics if needed
                trackEvent('Performance', 'PageLoad', loadTime.toString());
            }, 0);
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

// ========== API Functions (for production) ==========

// These would connect to actual backend APIs in production
const API = {
    baseURL: 'https://api.smartpilgrim.gujarat.gov.in/v1',
    
    // Get live crowd data
    getCrowdData: async function(templeId) {
        try {
            // const response = await fetch(`${this.baseURL}/crowd/${templeId}`);
            // const data = await response.json();
            // return data;
            
            // Simulated data for demo
            return {
                currentCount: Math.floor(Math.random() * 5000) + 1000,
                density: 'moderate',
                waitTime: Math.floor(Math.random() * 60) + 15
            };
        } catch (error) {
            console.error('Error fetching crowd data:', error);
        }
    },
    
    // Book darshan slot
    bookDarshan: async function(bookingData) {
        try {
            // const response = await fetch(`${this.baseURL}/booking`, {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify(bookingData)
            // });
            // const result = await response.json();
            // return result;
            
            // Simulated response for demo
            return {
                success: true,
                tokenNumber: 'A-' + Math.floor(Math.random() * 9000 + 1000),
                message: 'Booking successful'
            };
        } catch (error) {
            console.error('Error booking darshan:', error);
        }
    },
    
    // Get parking availability
    getParkingStatus: async function() {
        try {
            // const response = await fetch(`${this.baseURL}/parking`);
            // const data = await response.json();
            // return data;
            
            // Simulated data for demo
            return {
                lots: [
                    { name: 'Lot A', available: 150, total: 1000 },
                    { name: 'Lot B', available: 40, total: 800 },
                    { name: 'Lot C', available: 200, total: 500 }
                ]
            };
        } catch (error) {
            console.error('Error fetching parking status:', error);
        }
    }
};

// ========== Export for testing (if using modules) ==========
// export { 
//     toggleMobileMenu, 
//     showTab, 
//     submitBooking, 
//     updateLiveData,
//     API 
// };

// ========== Initialize on DOM Ready ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
}

// Log successful initialization
console.log('SmartPilgrim Temple Crowd Management System initialized successfully');
console.log('Version: 1.0.0');
console.log('Environment:', window.location.hostname === 'localhost' ? 'Development' : 'Production');
