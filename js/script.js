document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // FITUR 1: RESPONSIVE NAVIGATION MENU (Hamburger)
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Tutup menu otomatis jika salah satu link di klik (khusus mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // ==========================================
    // FITUR 2: FORM VALIDATION
    // ==========================================
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah reload halaman saat submit
        
        let isValid = true;

        // Validasi Nama tidak boleh kosong
        if (nameInput.value.trim() === '') {
            document.getElementById('nameError').innerText = 'Nama tidak boleh kosong.';
            isValid = false;
        } else {
            document.getElementById('nameError').innerText = '';
        }

        // Validasi Email harus valid menggunakan regex sederhana
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            document.getElementById('emailError').innerText = 'Email harus valid.';
            isValid = false;
        } else {
            document.getElementById('emailError').innerText = '';
        }

        // Validasi Pesan minimal 10 karakter
        if (messageInput.value.trim().length < 10) {
            document.getElementById('messageError').innerText = 'Pesan minimal 10 karakter.';
            isValid = false;
        } else {
            document.getElementById('messageError').innerText = '';
        }

        // Jika semua validasi lolos
        if (isValid) {
            const successBox = document.getElementById('successMessage');
            successBox.innerText = 'Sedang mengirim pesan...';
            successBox.style.display = 'block';
            successBox.style.backgroundColor = '#f1f5f9'; // Warna abu-abu saat loading
            successBox.style.color = '#475569';

            // Mengambil seluruh data dari inputan form
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // Mengirim data ke Web3Forms secara asynchronous (Latar belakang)
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status == 200) {
                    // Jika sukses terkirim ke email
                    successBox.innerText = 'Terima kasih! Pesan Anda telah berhasil dikirim langsung ke email Alka.';
                    successBox.style.backgroundColor = '#dcfce7'; // Kembali ke hijau sukses
                    successBox.style.color = '#22c55e';
                    form.reset(); // Kosongkan form kembali
                } else {
                    // Jika API bermasalah
                    successBox.innerText = res.message;
                    successBox.style.backgroundColor = '#fee2e2';
                    successBox.style.color = '#ef4444';
                }
            })
            .catch(error => {
                // Jika koneksi internet terputus
                successBox.innerText = 'Terjadi kesalahan jaringan. Silakan coba lagi.';
                successBox.style.backgroundColor = '#fee2e2';
                successBox.style.color = '#ef4444';
            })
            .then(() => {
                // Sembunyikan notifikasi setelah 5 detik
                setTimeout(() => {
                    successBox.style.display = 'none';
                }, 5000);
            });
        }
    });


    // ==========================================
    // FITUR 3: SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Menghitung posisi scroll yang halus dikurangi tinggi navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ==========================================
    // FITUR 4: BACK TO TOP BUTTON
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Munculkan tombol jika halaman di-scroll melewati 400px
        if (window.pageYOffset > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});