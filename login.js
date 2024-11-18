const correctPassword = "Maulln19";

// Ambil elemen form, password input, tombol lihat password, dan pesan error
const form = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eye-icon");
const errorMessage = document.getElementById("error-message");

// Fungsi untuk menangani tombol "Lihat Password"
togglePasswordButton.addEventListener("click", function() {
  // Toggle antara tipe password dan text
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;

  // Ubah ikon mata berdasarkan tipe input
  if (type === "password") {
    eyeIcon.setAttribute("d", "M12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm0 10c-2.211 0-4-1.789-4-4s1.789-4 4-4 4 1.789 4 4-1.789 4-4 4zm0-8c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z"); // Ikon mata tertutup
  } else {
    eyeIcon.setAttribute("d", "M12 4.5C7.34 4.5 3.12 7.13 2 10c1.12 2.87 5.34 5.5 10 5.5s8.88-2.63 10-5.5c-1.12-2.87-5.34-5.5-10-5.5zM12 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"); // Ikon mata terbuka
  }
});

// Fungsi untuk menangani login
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah form untuk submit secara default

  const enteredPassword = passwordInput.value;

  // Cek apakah password yang dimasukkan benar
  if (enteredPassword === correctPassword) {

    window.location.href = "quotes.html";
  } else {
    // Jika password salah, tampilkan pesan error
    errorMessage.style.display = "block";
  }
});
