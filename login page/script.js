// ── DOM References ──
const emailInput  = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signInBtn   = document.getElementById('signinBtn');

// ── Sign In Handler ──
function handleSignIn() {
  const email    = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Basic validation
  if (!email || !password) {
    showError('Please enter both email and password.');
    return;
  }

  if (!isValidEmail(email)) {
    showError('Please enter a valid email address.');
    return;
  }

  if (password.length < 6) {
    showError('Password must be at least 6 characters.');
    return;
  }

  // Success (replace this with your real auth/API call)
  showSuccess('🙏 Welcome! Jai Maa Raghveshwari!');
}

// ── Email Validator ──
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ── Show Error Toast ──
function showError(message) {
  showToast(message, 'error');
}

// ── Show Success Toast ──
function showSuccess(message) {
  showToast(message, 'success');
}

// ── Toast Utility ──
function showToast(message, type) {
  // Remove existing toast if any
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;

  // Inline styles for toast (no extra CSS file needed)
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    padding: '12px 24px',
    borderRadius: '4px',
    fontFamily: "'Playfair Display', serif",
    fontSize: '0.9rem',
    letterSpacing: '0.04em',
    color: type === 'success' ? '#fdf6e3' : '#fff',
    background: type === 'success'
      ? 'linear-gradient(135deg, #8b1a1a, #6b0f0f)'
      : 'linear-gradient(135deg, #5a2d00, #3a1a00)',
    boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
    zIndex: '9999',
    opacity: '0',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  // Auto remove after 3s
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

// ── Button Click Listener ──
signInBtn.addEventListener('click', handleSignIn);

// ── Enter Key Support ──
[emailInput, passwordInput].forEach(input => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSignIn();
  });
});