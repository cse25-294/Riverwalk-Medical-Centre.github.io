
document.addEventListener('DOMContentLoaded', function() {
    
    function showMessage(message, isSuccess = true) {
        const toast = document.createElement('div');
        
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: ${isSuccess ? '#10b981' : '#ef4444'};
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
            font-family: 'Inter', sans-serif;
        `;
        
        toast.innerHTML = `
            <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email && email.includes('@') && email.includes('.')) {
                showMessage(`Thank you! Health tips will be sent to ${email}`, true);
                this.reset();
            } else {
                showMessage('Please enter a valid email address', false);
            }
        });
    }

    const resultsForm = document.getElementById('resultsForm');
    if (resultsForm) {
        resultsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[placeholder="Full Name"]').value;
            const email = this.querySelector('input[type="email"]').value;
            
            if (name && email && email.includes('@')) {
                showMessage(`Results request submitted for ${name}. We will contact you within 48 hours.`, true);
                this.reset();
            } else {
                showMessage('Please fill all fields correctly', false);
            }
        });
    }

    const prescriptionForm = document.getElementById('prescriptionForm');
    if (prescriptionForm) {
        prescriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const medication = this.querySelector('input[placeholder="Medication Name"]').value;
            
            if (medication) {
                showMessage(`Refill request for "${medication}" has been submitted. Your pharmacy will be notified.`, true);
                this.reset();
            } else {
                showMessage('Please enter the medication name', false);
            }
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[placeholder="Full Legal Name"]');
            const dob = this.querySelector('input[type="date"]');
            const email = this.querySelector('input[type="email"]');
            const mobile = this.querySelector('input[type="tel"]');
            const address = this.querySelector('input[placeholder="Residential Address"]');
            const medicare = this.querySelector('select');
            const privacy = this.querySelector('#privacyCheck');
            
            if (!name.value || !dob.value || !email.value || !mobile.value || !address.value || !medicare.value || !privacy.checked) {
                showMessage('Please complete all required fields including the privacy consent', false);
                return;
            }
            
            if (!email.value.includes('@')) {
                showMessage('Please enter a valid email address', false);
                return;
            }
            
            const phoneDigits = mobile.value.replace(/\D/g, '');
            if (phoneDigits.length < 8) {
                showMessage('Please enter a valid mobile number (at least 8 digits)', false);
                return;
            }
            
            showMessage(`Welcome ${name.value}! Your registration is complete. A confirmation email has been sent.`, true);
            this.reset();
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    console.log('Riverwalk Medical Centre website loaded successfully');
});
