// HealthSync 2040 - Doctors JavaScript

// Initialize Doctors Page
document.addEventListener('DOMContentLoaded', function() {
    initializeDoctorCards();
    initializeTechnologySection();
    initializeAnimations();
});

// Initialize Doctor Cards
function initializeDoctorCards() {
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    doctorCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click handler for view profile
        const viewProfileBtn = card.querySelector('button[onclick*="viewDoctorProfile"]');
        if (viewProfileBtn) {
            viewProfileBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const doctorId = this.closest('.doctor-card').getAttribute('data-doctor') || 
                               this.getAttribute('onclick').match(/'([^']+)'/)[1];
                viewDoctorProfile(doctorId);
            });
        }
    });
}

// View Doctor Profile
function viewDoctorProfile(doctorId) {
    const doctorData = getDoctorData(doctorId);
    if (!doctorData) return;
    
    // Create modal
    const modal = createDoctorModal(doctorData);
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Get Doctor Data
function getDoctorData(doctorId) {
    const doctors = {
        'dr-neural': {
            name: 'Dr. Neural',
            title: 'Chief AI Physician & General Medicine Specialist',
            avatar: 'fas fa-brain',
            rating: 4.9,
            reviews: 12847,
            responseTime: '30s',
            description: 'Dr. Neural is our flagship AI physician, specializing in comprehensive health diagnostics and treatment planning. Trained on over 50 million medical cases, Dr. Neural combines deep learning algorithms with advanced pattern recognition to provide accurate diagnoses and personalized treatment recommendations.',
            specializations: [
                'General Diagnostics',
                'Disease Prevention',
                'Treatment Planning',
                'Health Monitoring',
                'Risk Assessment',
                'Emergency Triage'
            ],
            stats: {
                accuracy: '99.8%',
                patients: '15M+',
                languages: '150+'
            },
            education: [
                'PhD in Artificial Intelligence - MIT',
                'MD in General Medicine - Harvard Medical School',
                'Specialization in Machine Learning - Stanford'
            ],
            certifications: [
                'Board Certified in AI Medicine',
                'Advanced Neural Network Architecture',
                'Medical Data Analysis Expert'
            ],
            availability: '24/7',
            consultationFee: '$150',
            languages: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic', 'Hindi']
        },
        'dr-cardio': {
            name: 'Dr. Cardio',
            title: 'Cardiovascular Health Specialist',
            avatar: 'fas fa-heart',
            rating: 4.8,
            reviews: 8234,
            responseTime: '45s',
            description: 'Dr. Cardio specializes in cardiovascular health, offering expert analysis of heart conditions, blood pressure monitoring, and ECG interpretation. With advanced algorithms trained on millions of cardiac cases, Dr. Cardio provides precise cardiovascular assessments and preventive care strategies.',
            specializations: [
                'Heart Disease',
                'Blood Pressure',
                'ECG Analysis',
                'Cardiac Risk',
                'Exercise Planning',
                'Medication Review'
            ],
            stats: {
                accuracy: '99.5%',
                patients: '8.2M+',
                monitoring: '24/7'
            },
            education: [
                'PhD in Cardiovascular Medicine - Johns Hopkins',
                'Specialization in Cardiac AI - Mayo Clinic',
                'Advanced ECG Analysis - Cleveland Clinic'
            ],
            certifications: [
                'Board Certified Cardiologist',
                'AI-Enhanced Cardiac Diagnostics',
                'Preventive Cardiology Expert'
            ],
            availability: '24/7',
            consultationFee: '$180',
            languages: ['English', 'Spanish', 'French', 'German', 'Italian']
        },
        'dr-mind': {
            name: 'Dr. Mind',
            title: 'Mental Health & Wellness Specialist',
            avatar: 'fas fa-psychology',
            rating: 4.7,
            reviews: 6891,
            responseTime: '60s',
            description: 'Dr. Mind is a compassionate AI therapist specializing in mental health and emotional wellness. Using advanced natural language processing and psychological assessment algorithms, Dr. Mind provides supportive counseling, anxiety management, and depression screening with empathy and understanding.',
            specializations: [
                'Anxiety Disorders',
                'Depression',
                'Stress Management',
                'Sleep Issues',
                'Mood Disorders',
                'Coping Strategies'
            ],
            stats: {
                satisfaction: '94.2%',
                sessions: '5.6M+',
                methods: '50+'
            },
            education: [
                'PhD in Clinical Psychology - Yale',
                'AI in Mental Health - Stanford',
                'Cognitive Behavioral Therapy - Oxford'
            ],
            certifications: [
                'Licensed Clinical Psychologist',
                'AI-Powered Therapy Systems',
                'Mental Health Technology Expert'
            ],
            availability: '24/7',
            consultationFee: '$120',
            languages: ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Dutch']
        },
        'dr-nutri': {
            name: 'Dr. Nutri',
            title: 'Nutrition & Diet Specialist',
            avatar: 'fas fa-apple-alt',
            rating: 4.6,
            reviews: 4567,
            responseTime: '40s',
            description: 'Dr. Nutri is an expert in nutrition science and dietary planning. Using comprehensive databases of nutritional information and personalized health data, Dr. Nutri creates customized meal plans, supplement recommendations, and dietary strategies for optimal health and wellness.',
            specializations: [
                'Meal Planning',
                'Weight Management',
                'Supplements',
                'Food Allergies',
                'Sports Nutrition',
                'Dietary Restrictions'
            ],
            stats: {
                success: '96.8%',
                plans: '3.2M+',
                foods: '10K+'
            },
            education: [
                'PhD in Nutritional Sciences - UC Berkeley',
                'Sports Nutrition - University of Texas',
                'Clinical Dietetics - Tufts University'
            ],
            certifications: [
                'Registered Dietitian',
                'Sports Nutrition Specialist',
                'AI Nutrition Planning Expert'
            ],
            availability: '24/7',
            consultationFee: '$100',
            languages: ['English', 'Spanish', 'French', 'German', 'Italian', 'Japanese']
        }
    };
    
    return doctors[doctorId];
}

// Create Doctor Modal
function createDoctorModal(doctorData) {
    const modal = document.createElement('div');
    modal.className = 'doctor-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${doctorData.name}</h2>
                <button class="modal-close" onclick="closeDoctorModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="doctor-profile">
                    <div class="profile-header">
                        <div class="profile-avatar">
                            <i class="${doctorData.avatar}"></i>
                        </div>
                        <div class="profile-info">
                            <h3>${doctorData.title}</h3>
                            <div class="profile-rating">
                                <div class="stars">
                                    ${generateStars(doctorData.rating)}
                                </div>
                                <span>${doctorData.rating}/5.0 (${doctorData.reviews.toLocaleString()} reviews)</span>
                            </div>
                            <div class="profile-stats">
                                <span>Response Time: ${doctorData.responseTime}</span>
                                <span>Availability: ${doctorData.availability}</span>
                                <span>Consultation Fee: ${doctorData.consultationFee}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-description">
                        <p>${doctorData.description}</p>
                    </div>
                    
                    <div class="profile-sections">
                        <div class="profile-section">
                            <h4>Specializations</h4>
                            <div class="specializations-grid">
                                ${doctorData.specializations.map(spec => `<span class="specialty">${spec}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="profile-section">
                            <h4>Statistics</h4>
                            <div class="stats-grid">
                                ${Object.entries(doctorData.stats).map(([key, value]) => `
                                    <div class="stat-item">
                                        <div class="stat-value">${value}</div>
                                        <div class="stat-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="profile-section">
                            <h4>Education</h4>
                            <ul class="education-list">
                                ${doctorData.education.map(edu => `<li>${edu}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="profile-section">
                            <h4>Certifications</h4>
                            <ul class="certifications-list">
                                ${doctorData.certifications.map(cert => `<li>${cert}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="profile-section">
                            <h4>Languages</h4>
                            <div class="languages-grid">
                                ${doctorData.languages.map(lang => `<span class="language">${lang}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-actions">
                        <a href="appointments.html" class="btn btn-primary">
                            <i class="fas fa-calendar-plus"></i>
                            Book Consultation
                        </a>
                        <button class="btn btn-secondary" onclick="closeDoctorModal()">
                            <i class="fas fa-times"></i>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    return modal;
}

// Generate Stars
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Close Doctor Modal
function closeDoctorModal() {
    const modal = document.querySelector('.doctor-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Initialize Technology Section
function initializeTechnologySection() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        // Add staggered animation
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-in');
    });
}

// Initialize Animations
function initializeAnimations() {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements
    const animateElements = document.querySelectorAll('.doctor-card, .tech-item');
    animateElements.forEach(el => observer.observe(el));
}

// Global functions
window.viewDoctorProfile = viewDoctorProfile;
window.closeDoctorModal = closeDoctorModal;

// Add modal styles to head
const modalStyles = `
<style>
.doctor-modal.show {
    opacity: 1;
}

.doctor-modal .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
}

.doctor-modal .modal-content {
    background: var(--card-bg);
    border-radius: 20px;
    border: 1px solid var(--border-color);
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.doctor-modal.show .modal-content {
    transform: scale(1);
}

.doctor-modal .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid var(--border-color);
}

.doctor-modal .modal-header h2 {
    color: var(--text-primary);
    margin: 0;
}

.doctor-modal .modal-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.doctor-modal .modal-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
}

.doctor-modal .modal-body {
    padding: 2rem;
}

.doctor-profile .profile-header {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
}

.doctor-profile .profile-avatar {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.doctor-profile .profile-avatar i {
    font-size: 2.5rem;
    color: white;
}

.doctor-profile .profile-info h3 {
    color: var(--text-secondary);
    margin-bottom: 1rem;
}

.doctor-profile .profile-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.doctor-profile .profile-stats {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.doctor-profile .profile-stats span {
    color: var(--text-secondary);
    font-size: 0.9rem;
    padding: 0.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
}

.doctor-profile .profile-description {
    margin-bottom: 2rem;
}

.doctor-profile .profile-description p {
    color: var(--text-secondary);
    line-height: 1.6;
}

.doctor-profile .profile-sections {
    display: grid;
    gap: 2rem;
    margin-bottom: 2rem;
}

.doctor-profile .profile-section h4 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1.2rem;
}

.doctor-profile .specializations-grid,
.doctor-profile .languages-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.doctor-profile .specialty,
.doctor-profile .language {
    padding: 0.5rem 1rem;
    background: rgba(0, 212, 255, 0.1);
    color: var(--primary-color);
    border-radius: 20px;
    font-size: 0.9rem;
    border: 1px solid rgba(0, 212, 255, 0.2);
}

.doctor-profile .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
}

.doctor-profile .education-list,
.doctor-profile .certifications-list {
    list-style: none;
    padding: 0;
}

.doctor-profile .education-list li,
.doctor-profile .certifications-list li {
    color: var(--text-secondary);
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
}

.doctor-profile .education-list li:last-child,
.doctor-profile .certifications-list li:last-child {
    border-bottom: none;
}

.doctor-profile .profile-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

@media (max-width: 768px) {
    .doctor-modal .modal-content {
        width: 95%;
        margin: 1rem;
    }
    
    .doctor-profile .profile-header {
        flex-direction: column;
        text-align: center;
    }
    
    .doctor-profile .profile-stats {
        justify-content: center;
    }
    
    .doctor-profile .profile-actions {
        flex-direction: column;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles); 