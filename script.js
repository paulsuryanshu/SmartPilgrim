// script.js - SmartPilgrim Temple Crowd Management System

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
