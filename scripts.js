// scripts.js - SmartPilgrim Temple Crowd Management System

// DOM Ready Event
document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
    updateLiveData();
    setInterval(updateLiveData, 60000); // Update every minute
});

// Initialize the system
function initializeSystem() {
    console.log('SmartPilgrim System Initialized');
    
    // Set last updated timestamp
    updateLastUpdated();
    
    // Initialize tab functionality
    initializeTabs();
    
    // Initialize live ticker
    initializeTicker();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check for geolocation support
    if (navigator.geolocation) {
        console.log('Geolocation is supported');
    }
}

// Update last updated timestamp
function updateLastUpdated() {
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (lastUpdateElement) {
        lastUpdateElement.textContent = new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
}

// Initialize tab functionality
function initializeTabs() {
    // Show first tab by default
    const firstTab = document.querySelector('.tab-header');
    if (firstTab) {
        firstTab.classList.add('active');
        const firstTabPane = document.querySelector('.tab-pane');
        if (firstTabPane) {
            firstTabPane.classList.add('active');
        }
    }
}

// Initialize news ticker
function initializeTicker() {
    const ticker = document.querySelector('.ticker');
    if (ticker) {
        // Duplicate content for seamless looping
        const tickerContent = ticker.innerHTML;
        ticker.innerHTML += tickerContent;
    }
}

// Set up event listeners
function setupEventListeners() {
    // Navigation dropdowns
    const navItems = document.querySelectorAll('.nav-menu > li');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const dropdown = this.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.display = 'block';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const dropdown = this.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        });
    });
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Basic validation will be handled by HTML5 validation
            // Additional custom validation can be added here
        });
    });
    
    // Accessibility options
    const accessibilityBtn = document.querySelector('.accessibility-btn');
    if (accessibilityBtn) {
        accessibilityBtn.addEventListener('click', showAccessibilityModal);
    }
}

// Update live data (simulated)
function updateLiveData() {
    // Simulate live data updates
    updateCrowdCount();
    updateWaitTime();
    updateParkingAvailability();
    updateQueueStatus();
    updateLiveFeeds();
}

// Update crowd count with random fluctuation
function updateCrowdCount() {
    const currentCountElement = document.getElementById('currentCount');
    if (currentCountElement) {
        const currentCount = parseInt(currentCountElement.textContent.replace(/,/g, ''));
        const fluctuation = Math.floor(Math.random() * 201) - 100; // -100 to +100
        const newCount = Math.max(5000, currentCount + fluctuation); // Ensure minimum of 5000
        currentCountElement.textContent = newCount.toLocaleString();
        
        // Update change indicator
        const changeElement = currentCountElement.parentElement.querySelector('.stat-change');
        if (changeElement) {
            if (fluctuation > 0) {
                changeElement.textContent = `↑ ${Math.abs(fluctuation)} from last update`;
                changeElement.className = 'stat-change stat-up';
            } else if (fluctuation < 0) {
                changeElement.textContent = `↓ ${Math.abs(fluctuation)} from last update`;
                changeElement.className = 'stat-change stat-down';
            } else {
                changeElement.textContent = 'No change from last update';
                changeElement.className = 'stat-change';
            }
        }
    }
}

// Update wait time with random fluctuation
function updateWaitTime() {
    const waitTimeElements = document.querySelectorAll('.stat-number');
    if (waitTimeElements.length >= 2) {
        const waitTimeElement = waitTimeElements[1]; // Second stat card is wait time
        const currentTime = parseInt(waitTimeElement.textContent);
        const fluctuation = Math.floor(Math.random() * 11) - 5; // -5 to +5 minutes
        const newTime = Math.max(10, currentTime + fluctuation); // Ensure minimum of 10 minutes
        waitTimeElement.textContent = `${newTime} min`;
        
        // Update change indicator
        const changeElement = waitTimeElement.parentElement.querySelector('.stat-change');
        if (changeElement) {
            if (fluctuation > 0) {
                changeElement.textContent = `↑ ${Math.abs(fluctuation)} min from last update`;
                changeElement.className = 'stat-change stat-up';
            } else if (fluctuation < 0) {
                changeElement.textContent = `↓ ${Math.abs(fluctuation)} min from last update`;
                changeElement.className = 'stat-change stat-down';
            } else {
                changeElement.textContent = 'No change from last update';
                changeElement.className = 'stat-change';
            }
        }
    }
}

// Update parking availability
function updateParkingAvailability() {
    const parkingElements = document.querySelectorAll('.stat-number');
    if (parkingElements.length >= 4) {
        const parkingElement = parkingElements[3]; // Fourth stat card is parking
        const currentCount = parseInt(parkingElement.textContent);
        const fluctuation = Math.floor(Math.random() * 21) - 10; // -10 to +10
        const newCount = Math.max(0, Math.min(2500, currentCount + fluctuation)); // Keep between 0 and 2500
        parkingElement.textContent = newCount.toLocaleString();
        
        // Change color based on availability
        if (newCount < 50) {
            parkingElement.style.color = 'var(--gov-red)';
        } else if (newCount < 100) {
            parkingElement.style.color = 'var(--gov-orange)';
        } else {
            parkingElement.style.color = 'var(--gov-green)';
        }
    }
}

// Update queue status
function updateQueueStatus() {
    const tokenElement = document.querySelector('.current-token');
    if (tokenElement) {
        const currentToken = tokenElement.textContent;
        const prefix = currentToken.substring(0, 2);
        const number = parseInt(currentToken.substring(2));
        const newNumber = number + Math.floor(Math.random() * 3) + 1; // Increment by 1-3
        tokenElement.textContent = `${prefix}${newNumber}`;
        
        // Update "your token" info if it exists
        const yourTokenElement = document.querySelector('.token-info div:nth-child(1) div:nth-child(2)');
        if (yourTokenElement && yourTokenElement.textContent.startsWith(prefix)) {
            const yourNumber = parseInt(yourTokenElement.textContent.substring(2));
            const tokensAhead = newNumber - yourNumber;
            
            if (tokensAhead > 0) {
                // Update tokens ahead
                const tokensAheadElement = document.querySelector('.token-info div:nth-child(3) div:nth-child(2)');
                if (tokensAheadElement) {
                    tokensAheadElement.textContent = tokensAhead;
                }
                
                // Update estimated time (assuming 15 seconds per token)
                const estimatedTimeElement = document.querySelector('.token-info div:nth-child(2) div:nth-child(2)');
                if (estimatedTimeElement) {
                    const minutes = Math.ceil(tokensAhead * 0.25); // 15 seconds per token = 0.25 min
                    estimatedTimeElement.textContent = `${minutes} min`;
                }
            } else if (tokensAhead <= 0) {
                // Token has been served
                const tokensAheadElement = document.querySelector('.token-info div:nth-child(3) div:nth-child(2)');
                const estimatedTimeElement = document.querySelector('.token-info div:nth-child(2) div:nth-child(2)');
                
                if (tokensAheadElement) tokensAheadElement.textContent = '0';
                if (estimatedTimeElement) estimatedTimeElement.textContent = '0 min';
                
                // Show notification
                showNotification('Your token is being served! Please proceed to the queue.');
            }
        }
    }
}

// Update live feeds with new information
function updateLiveFeeds() {
    const liveFeeds = document.querySelectorAll('.live-feed');
    if (liveFeeds.length > 0) {
        const newFeed = document.createElement('div');
        newFeed.className = 'live-feed';
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        newFeed.innerHTML = `
            <small style="color: #666;">${timeString}</small>
            <p style="margin: 5px 0;">${getRandomUpdate()}</p>
        `;
        
        const widgetContent = document.querySelector('.widget-content');
        if (widgetContent) {
            widgetContent.insertBefore(newFeed, widgetContent.firstChild);
            
            // Remove oldest feed if more than 4
            if (widgetContent.children.length > 4) {
                widgetContent.removeChild(widgetContent.lastChild);
            }
        }
    }
}

// Get a random update message
function getRandomUpdate() {
    const updates = [
        'Additional security deployed at Main Gate',
        'Water stations refreshed at all locations',
        'Special prayer session starting in 30 minutes',
        'Parking Lot C now 60% occupied',
        'Free prasad distribution at North Gate',
        'Medical team conducting routine checks',
        'VIP movement expected in next hour',
        'Cleaning crew servicing restroom facilities',
        'Cultural program scheduled for 5:00 PM',
        'Mobile charging stations now available near Food Court'
    ];
    
    return updates[Math.floor(Math.random() * updates.length)];
}

// Tab functionality
function showTab(tabId) {
    // Hide all tab panes
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show the selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Update tab headers
    document.querySelectorAll('.tab-header').forEach(header => {
        header.classList.remove('active');
    });
    
    // Find and activate the clicked header
    event.currentTarget.classList.add('active');
}

// Form submission
function submitBooking(event) {
    event.preventDefault();
    
    // Basic form validation
    const form = event.target;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Simulate API call
    simulateBookingAPI()
        .then(response => {
            if (response.success) {
                showSuccessModal(response.bookingId);
            } else {
                showError('Booking failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Booking error:', error);
            showError('An error occurred during booking. Please try again.');
        });
}

// Simulate booking API call
function simulateBookingAPI() {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            // Generate random booking ID
            const bookingId = 'SPGJ' + new Date().getTime() + 'A' + Math.floor(Math.random() * 1000);
            
            resolve({
                success: true,
                bookingId: bookingId,
                message: 'Booking successful'
            });
        }, 1500);
    });
}

// Show success modal
function showSuccessModal(bookingId) {
    const modal = document.getElementById('successModal');
    if (modal) {
        // Update booking ID in modal
        const bookingIdElement = modal.querySelector('strong');
        if (bookingIdElement) {
            bookingIdElement.textContent = bookingId;
        }
        
        modal.style.display = 'block';
    }
}

// Show error message
function showError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'alert alert-danger';
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = '300px';
    notification.innerHTML = `
        <strong>Error:</strong> ${message}
        <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; cursor: pointer;">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 5000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = '300px';
    notification.innerHTML = `
        ${message}
        <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; cursor: pointer;">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 5000);
}

// Check booking status
function checkStatus() {
    const bookingId = prompt('Please enter your Booking ID:');
    if (bookingId) {
        // Simulate API call to check status
        simulateStatusCheck(bookingId)
            .then(status => {
                alert(`Booking Status: ${status}\n\nBooking ID: ${bookingId}`);
            })
            .catch(error => {
                console.error('Status check error:', error);
                alert('Unable to retrieve booking status. Please try again later.');
            });
    }
}

// Simulate status check API call
function simulateStatusCheck(bookingId) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            const statuses = ['Confirmed', 'Pending', 'Completed', 'Cancelled'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            resolve(randomStatus);
        }, 1000);
    });
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Show accessibility modal
function showAccessibilityModal() {
    document.getElementById('accessibilityModal').style.display = 'block';
}

// Change font size
function changeFontSize(size) {
    const body = document.body;
    
    switch(size) {
        case 'decrease':
            body.style.fontSize = '14px';
            break;
        case 'normal':
            body.style.fontSize = '16px';
            break;
        case 'increase':
            body.style.fontSize = '18px';
            break;
    }
    
    showNotification(`Font size changed to ${size}`, 'success');
}

// Change contrast
function changeContrast(mode) {
    const body = document.body;
    
    switch(mode) {
        case 'normal':
            body.style.filter = 'none';
            body.style.backgroundColor = '#ffffff';
            body.style.color = '#333333';
            break;
        case 'high':
            body.style.filter = 'contrast(200%)';
            break;
        case 'inverted':
            body.style.filter = 'invert(1) contrast(150%)';
            body.style.backgroundColor = '#000000';
            body.style.color = '#ffffff';
            break;
    }
    
    showNotification(`Contrast mode changed to ${mode}`, 'success');
}

// Initiate screen reader mode
function initiateScreenReader() {
    // This would typically integrate with a screen reader API
    // For demonstration, we'll just show a notification
    showNotification('Screen reader mode activated. Please ensure your screen reader software is running.', 'info');
}

// Print booking
function printBooking() {
    window.print();
}

// Download token
function downloadToken() {
    // Simulate token download
    showNotification('E-Token download started', 'success');
    
    // In a real implementation, this would generate and download a PDF
    setTimeout(() => {
        showNotification('E-Token downloaded successfully', 'success');
    }, 2000);
}

// Download app
function downloadApp() {
    window.open('https://play.google.com/store/apps/details?id=com.gujarat.smartpilgrim', '_blank');
}

// Virtual tour
function virtualTour() {
    window.open('virtual-tour.html', '_blank');
}

// Print token
function printToken() {
    // Simulate token printing
    showNotification('Preparing token for printing...', 'info');
    
    setTimeout(() => {
        showNotification('Token sent to printer', 'success');
    }, 1500);
}

// Report issue
function reportIssue() {
    const issue = prompt('Please describe the issue you encountered:');
    if (issue) {
        // Simulate issue reporting
        simulateIssueReport(issue)
            .then(success => {
                if (success) {
                    showNotification('Issue reported successfully. Thank you for your feedback.', 'success');
                } else {
                    showError('Failed to report issue. Please try again.');
                }
            });
    }
}

// Simulate issue report API call
function simulateIssueReport(issue) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            console.log('Issue reported:', issue);
            resolve(true);
        }, 1000);
    });
}

// Quick link functions
function showDashboard() { 
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showBooking() { 
    document.querySelectorAll('.tab-header')[0].click();
    window.scrollTo({ 
        top: document.getElementById('booking-tab').offsetTop - 100, 
        behavior: 'smooth' 
    });
}

function showCrowdMap() { 
    document.querySelectorAll('.tab-header')[1].click();
    window.scrollTo({ 
        top: document.getElementById('crowd-tab').offsetTop - 100, 
        behavior: 'smooth' 
    });
}

function showQueueStatus() { 
    document.querySelectorAll('.tab-header')[2].click();
    window.scrollTo({ 
        top: document.getElementById('queue-tab').offsetTop - 100, 
        behavior: 'smooth' 
    });
}

function showParking() { 
    document.querySelectorAll('.tab-header')[3].click();
    window.scrollTo({ 
        top: document.getElementById('parking-tab').offsetTop - 100, 
        behavior: 'smooth' 
    });
}

function showDonation() { 
    alert('Donation page would open here');
    // window.location.href = 'donation.html';
}

function showComplaints() { 
    alert('Complaints form would open here');
    // window.location.href = 'complaints.html';
}

function showHistory() { 
    alert('Booking history would be shown here');
    // window.location.href = 'history.html';
}

function showGuidelines() { 
    document.querySelectorAll('.tab-header')[4].click();
    window.scrollTo({ 
        top: document.getElementById('alerts-tab').offsetTop - 100, 
        behavior: 'smooth' 
    });
}

function showDownloads() { 
    alert('Download section would open here');
    // window.location.href = 'downloads.html';
}

function showHelp() { 
    alert('Help and support page would open here');
    // window.location.href = 'help.html';
}

// Close modal if user clicks outside the modal content
window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}