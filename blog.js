// HealthSync 2040 - Blog JavaScript

// Initialize Blog Page
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogInteractions();
    initializeNewsletterSignup();
    initializeArticleActions();
    initializeAnimations();
});

// Initialize Blog Interactions
function initializeBlogInteractions() {
    // Add reading time calculation
    calculateReadingTime();
    
    // Add share functionality
    initializeShareButtons();
    
    // Add bookmark functionality
    initializeBookmarkButtons();
}

// Calculate Reading Time
function calculateReadingTime() {
    const articleBody = document.querySelector('.article-body');
    if (!articleBody) return;
    
    const text = articleBody.textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
    
    const readTimeElement = document.querySelector('.article-read-time');
    if (readTimeElement) {
        readTimeElement.textContent = `${readingTime} min read`;
    }
}

// Initialize Share Buttons
function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('button:contains("Share")');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            shareArticle();
        });
    });
}

// Share Article
function shareArticle() {
    const articleTitle = document.querySelector('.article-title').textContent;
    const articleUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: articleTitle,
            text: 'Check out this article from HealthSync 2040',
            url: articleUrl
        });
    } else {
        // Fallback: copy to clipboard
        const shareText = `${articleTitle}\n\nRead more: ${articleUrl}`;
        copyToClipboard(shareText);
        showSuccessMessage('Article link copied to clipboard!');
    }
}

// Initialize Bookmark Buttons
function initializeBookmarkButtons() {
    const bookmarkButtons = document.querySelectorAll('button:contains("Save")');
    
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleBookmark();
        });
    });
}

// Toggle Bookmark
function toggleBookmark() {
    const button = document.querySelector('button:contains("Save")');
    const isBookmarked = button.classList.contains('bookmarked');
    
    if (isBookmarked) {
        button.classList.remove('bookmarked');
        button.innerHTML = '<i class="fas fa-bookmark"></i> Save for Later';
        showSuccessMessage('Article removed from bookmarks');
    } else {
        button.classList.add('bookmarked');
        button.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
        showSuccessMessage('Article saved to bookmarks');
    }
}

// Initialize Newsletter Signup
function initializeNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleNewsletterSignup(this);
    });
}

// Handle Newsletter Signup
function handleNewsletterSignup(form) {
    if (!form) return;
    
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showFieldError(emailInput, 'Please enter your email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFieldError(emailInput, 'Please enter a valid email address');
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;
    
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    
    // Simulate API call
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        
        // Clear form
        emailInput.value = '';
        
        // Show success message
        showSuccessMessage('Thank you for subscribing! You\'ll receive our latest updates soon.');
    }, 2000);
}

// Initialize Article Actions
function initializeArticleActions() {
    // Add click handlers for related articles
    const relatedArticles = document.querySelectorAll('.read-more');
    
    relatedArticles.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const articleTitle = this.closest('.article-card').querySelector('.article-title').textContent;
            showArticlePreview(articleTitle);
        });
    });
}

// Show Article Preview
function showArticlePreview(articleTitle) {
    const preview = createArticlePreview(articleTitle);
    document.body.appendChild(preview);
    
    setTimeout(() => {
        preview.classList.add('show');
    }, 10);
}

// Create Article Preview
function createArticlePreview(articleTitle) {
    const preview = document.createElement('div');
    preview.className = 'article-preview';
    preview.innerHTML = `
        <div class="preview-overlay"></div>
        <div class="preview-content">
            <div class="preview-header">
                <h3>${articleTitle}</h3>
                <button class="preview-close" onclick="closeArticlePreview()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="preview-body">
                <p>This article is coming soon! We're working hard to bring you the latest insights on AI healthcare and medical technology.</p>
                <div class="preview-actions">
                    <button class="btn btn-primary" onclick="notifyWhenAvailable('${articleTitle}')">
                        <i class="fas fa-bell"></i>
                        Notify When Available
                    </button>
                    <button class="btn btn-secondary" onclick="closeArticlePreview()">
                        <i class="fas fa-times"></i>
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    preview.style.cssText = `
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
    
    return preview;
}

// Close Article Preview
function closeArticlePreview() {
    const preview = document.querySelector('.article-preview');
    if (preview) {
        preview.classList.remove('show');
        setTimeout(() => {
            preview.remove();
        }, 300);
    }
}

// Notify When Available
function notifyWhenAvailable(articleTitle) {
    showSuccessMessage(`You'll be notified when "${articleTitle}" is available!`);
    closeArticlePreview();
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
    const animateElements = document.querySelectorAll('.article-card, .tech-item');
    animateElements.forEach(el => observer.observe(el));
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.position = 'fixed';
    successDiv.style.top = '20px';
    successDiv.style.right = '20px';
    successDiv.style.background = 'var(--success-color)';
    successDiv.style.color = 'white';
    successDiv.style.padding = '1rem 2rem';
    successDiv.style.borderRadius = '10px';
    successDiv.style.zIndex = '1000';
    successDiv.style.animation = 'slideIn 0.3s ease';

    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Global functions
window.closeArticlePreview = closeArticlePreview;
window.notifyWhenAvailable = notifyWhenAvailable;

// Add preview styles to head
const previewStyles = `
<style>
.article-preview.show {
    opacity: 1;
}

.article-preview .preview-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
}

.article-preview .preview-content {
    background: var(--card-bg);
    border-radius: 20px;
    border: 1px solid var(--border-color);
    max-width: 500px;
    width: 90%;
    position: relative;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.article-preview.show .preview-content {
    transform: scale(1);
}

.article-preview .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.article-preview .preview-header h3 {
    color: var(--text-primary);
    margin: 0;
    font-size: 1.3rem;
}

.article-preview .preview-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.article-preview .preview-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
}

.article-preview .preview-body {
    padding: 1.5rem;
}

.article-preview .preview-body p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.article-preview .preview-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

@media (max-width: 768px) {
    .article-preview .preview-content {
        width: 95%;
        margin: 1rem;
    }
    
    .article-preview .preview-actions {
        flex-direction: column;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', previewStyles); 