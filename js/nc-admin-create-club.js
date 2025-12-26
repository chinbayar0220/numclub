// js/nc-admin-create-club.js
// Admin club creation functionality

const API_BASE_URL = 'http://127.0.0.1:3000';

// Form validation
function validateForm(formData) {
    const errors = {};

    // Club name validation
    if (!formData.cname || formData.cname.trim().length === 0) {
        errors.cname = 'Клубын нэр оруулна уу';
    } else if (formData.cname.length > 100) {
        errors.cname = 'Клубын нэр 100 тэмдэгтээс хэтрэхгүй байх ёстой';
    }

    // Short name validation
    if (!formData.shortName || formData.shortName.trim().length === 0) {
        errors.shortName = 'Богино нэр оруулна уу';
    } else if (formData.shortName.length > 50) {
        errors.shortName = 'Богино нэр 50 тэмдэгтээс хэтрэхгүй байх ёстой';
    }

    // Description validation
    if (!formData.description || formData.description.trim().length === 0) {
        errors.description = 'Тайлбар оруулна уу';
    } else if (formData.description.length > 1000) {
        errors.description = 'Тайлбар 1000 тэмдэгтээс хэтрэхгүй байх ёстой';
    }

    // Directions validation
    if (!formData.directions || formData.directions.length === 0) {
        errors.directions = 'Дор хаяж нэг чиглэл сонгоно уу';
    }

    // School validation
    if (!formData.school) {
        errors.school = 'Сургууль сонгоно уу';
    }

    return errors;
}

// Display validation errors
function displayErrors(errors) {
    // Clear all previous errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });

    // Display new errors
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
            errorElement.classList.add('show');
        }
    });
}

// Show alert message
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} show`;
    alertDiv.textContent = message;
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alertDiv);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
    }, 5000);
}

// Parse request body for POST requests
async function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', reject);
    });
}

// Create club function
async function createClub(clubData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/clubs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clubData)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            return { success: true, data: result.data };
        } else {
            return { success: false, error: result.error || 'Алдаа гарлаа' };
        }
    } catch (error) {
        console.error('Create club error:', error);
        return { success: false, error: 'Серверт холбогдоход алдаа гарлаа' };
    }
}

// Form submit handler
document.getElementById('createClubForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Үүсгэж байна...';

    // Collect form data
    const formData = {
        cname: document.getElementById('cname').value.trim(),
        shortName: document.getElementById('shortName').value.trim(),
        description: document.getElementById('description').value.trim(),
        directions: Array.from(document.querySelectorAll('input[name="directions"]:checked'))
            .map(cb => cb.value),
        school: document.getElementById('school').value,
        logo: document.getElementById('logo').value.trim() || undefined,
        socialLinks: {
            facebook: document.getElementById('facebook').value.trim() || undefined,
            instagram: document.getElementById('instagram').value.trim() || undefined,
            twitter: document.getElementById('twitter').value.trim() || undefined,
            website: document.getElementById('website').value.trim() || undefined,
        },
        status: 'active',
        members: 0
    };

    // Remove empty social links
    Object.keys(formData.socialLinks).forEach(key => {
        if (!formData.socialLinks[key]) {
            delete formData.socialLinks[key];
        }
    });

    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
        displayErrors(errors);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Клуб үүсгэх';
        return;
    }

    // Clear errors
    displayErrors({});

    // Create club
    const result = await createClub(formData);

    if (result.success) {
        showAlert('✅ Клуб амжилттай үүсгэлээ!', 'success');
        
        // Reset form
        document.getElementById('createClubForm').reset();
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = '/clubs.html';
        }, 2000);
    } else {
        showAlert(`❌ ${result.error}`, 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Клуб үүсгэх';
    }
});

// Logo preview
document.getElementById('logo')?.addEventListener('input', (e) => {
    const logoPath = e.target.value.trim();
    const preview = document.getElementById('logoPreview');
    const img = document.getElementById('logoImage');

    if (logoPath) {
        img.src = logoPath;
        preview.style.display = 'block';
        
        // Hide if image fails to load
        img.onerror = () => {
            preview.style.display = 'none';
        };
    } else {
        preview.style.display = 'none';
    }
});

// Character count for description
document.getElementById('description')?.addEventListener('input', (e) => {
    const maxLength = 1000;
    const currentLength = e.target.value.length;
    const remaining = maxLength - currentLength;
    
    // You can add a character counter display here if needed
    console.log(`${remaining} characters remaining`);
});

console.log('Admin club creation page loaded');
