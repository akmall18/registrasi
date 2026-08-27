/* ================= TAB SWITCH ================= */
function switchTab(target){
  const isLogin = target === 'login';

  document.getElementById('formLogin').classList.toggle('active', isLogin);
  document.getElementById('formRegister').classList.toggle('active', !isLogin);
  document.getElementById('tabLogin').classList.toggle('active', isLogin);
  document.getElementById('tabRegister').classList.toggle('active', !isLogin);

  // pastikan tab & form terlihat lagi kalau sebelumnya di tampilan sukses
  document.getElementById('tabsWrap').style.display = 'flex';
  document.getElementById('successView').classList.remove('active');
}

/* ================= TOAST ================= */
let toastTimer;
function showToast(message){
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ================= FIELD ERROR HELPERS ================= */
function setError(fieldId, hasError){
  const field = document.getElementById(fieldId);
  if(!field) return;
  field.classList.toggle('invalid', hasError);
}

/* ================= SUCCESS VIEW ================= */
function showSuccessView(message){
  document.getElementById('formLogin').classList.remove('active');
  document.getElementById('formRegister').classList.remove('active');
  document.getElementById('tabsWrap').style.display = 'none';

  const successView = document.getElementById('successView');
  document.getElementById('successMsg').textContent = message;
  successView.classList.add('active');
}

/* ================= INIT ================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOGIN VALIDATION ---------- */
  const formLogin = document.getElementById('formLogin');
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const pass  = document.getElementById('loginPass').value.trim();

    let valid = true;

    if(email === ''){
      setError('fieldLoginEmail', true);
      valid = false;
    } else {
      setError('fieldLoginEmail', false);
    }

    if(pass === ''){
      setError('fieldLoginPass', true);
      valid = false;
    } else {
      setError('fieldLoginPass', false);
    }

    if(!valid){
      showToast('Mohon lengkapi email dan password.');
      return;
    }

    // simulasi proses login berhasil
    showToast('Login berhasil! Mengalihkan…');
    setTimeout(() => {
      showSuccessView('Login berhasil. Selamat menikmati kopi favoritmu di OLD COFFE SHOP!');
    }, 700);
  });

  /* ---------- REGISTER VALIDATION ---------- */
  const formRegister = document.getElementById('formRegister');
  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullname     = document.getElementById('fullname').value.trim();
    const username     = document.getElementById('username').value.trim();
    const email        = document.getElementById('email').value.trim();
    const pass         = document.getElementById('pass').value;
    const passConfirm  = document.getElementById('passConfirm').value;
    const birthdate    = document.getElementById('birthdate').value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    // Nama Lengkap
    if(fullname === ''){
      setError('fieldFullname', true);
      valid = false;
    } else {
      setError('fieldFullname', false);
    }

    // Username
    if(username.length < 4){
      setError('fieldUsername', true);
      valid = false;
    } else {
      setError('fieldUsername', false);
    }

    // Email
    if(!emailPattern.test(email)){
      setError('fieldEmail', true);
      valid = false;
    } else {
      setError('fieldEmail', false);
    }

    // Password
    if(pass.length < 6){
      setError('fieldPass', true);
      valid = false;
    } else {
      setError('fieldPass', false);
    }

    // Konfirmasi Password
    if(passConfirm === '' || passConfirm !== pass){
      setError('fieldPassConfirm', true);
      valid = false;
    } else {
      setError('fieldPassConfirm', false);
    }

    // Tanggal Lahir
    if(birthdate === ''){
      setError('fieldBirthdate', true);
      valid = false;
    } else {
      setError('fieldBirthdate', false);
    }

    if(!valid){
      showToast('Beberapa data belum lengkap atau belum sesuai.');
      // fokus ke field invalid pertama
      const firstInvalid = formRegister.querySelector('.field.invalid input');
      if(firstInvalid) firstInvalid.focus();
      return;
    }

    // simulasi proses pendaftaran berhasil
    showToast('Mendaftarkan akun…');
    setTimeout(() => {
      showSuccessView(`Selamat datang, ${fullname.split(' ')[0]}! Akunmu sudah siap digunakan.`);
      formRegister.reset();
    }, 700);
  });

  /* ---------- KEMBALI KE LOGIN DARI SUCCESS VIEW ---------- */
  document.getElementById('btnGoLogin').addEventListener('click', () => {
    switchTab('login');
  });

});