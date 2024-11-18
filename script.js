// ** Mode Color Switcher (Dark, Light, Blue, Green, Orange, Red) **
const modeToggle = document.getElementById("mode-toggle");
let currentMode = "light"; // Default mode is light

// Fungsi untuk mengganti mode tampilan
function switchMode() {
    switch (currentMode) {
        case "light":
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
            currentMode = "dark";
            break;
        case "dark":
            document.body.classList.remove("dark-mode");
            document.body.classList.add("blue-mode");
            currentMode = "blue";
            break;
        case "blue":
            document.body.classList.remove("blue-mode");
            document.body.classList.add("green-mode");
            currentMode = "green";
            break;
        case "green":
            document.body.classList.remove("green-mode");
            document.body.classList.add("orange-mode");
            currentMode = "orange";
            break;
        case "orange":
            document.body.classList.remove("orange-mode");
            document.body.classList.add("red-mode");
            currentMode = "red";
            break;
        case "red":
            document.body.classList.remove("red-mode");
            document.body.classList.add("light-mode");
            currentMode = "light";
            break;
    }

    // Menyimpan mode saat ini di localStorage agar tetap ada saat refresh
    localStorage.setItem("theme", currentMode);
}

// Event listener untuk mode toggle
modeToggle.addEventListener("click", function () {
    switchMode();
});

// Mengatur mode berdasarkan penyimpanan sebelumnya
window.addEventListener("load", function () {
    const savedMode = localStorage.getItem("theme");

    // Jika mode disimpan sebelumnya, terapkan mode tersebut
    if (savedMode) {
        document.body.classList.remove("light-mode", "dark-mode", "blue-mode", "green-mode", "orange-mode", "red-mode");
        document.body.classList.add(savedMode);
        currentMode = savedMode;
    } else {
        // Jika tidak ada mode sebelumnya, atur default ke light mode
        document.body.classList.add("light-mode");
        currentMode = "light";
    }
});

let currentMusic = null;  // Untuk melacak musik yang sedang diputar
let lastPlayedTime = {};  // Menyimpan posisi terakhir setiap musik

// Fungsi untuk memilih dan memutar musik
function selectMusic(songNumber) {
    // Hentikan musik yang sedang diputar
    if (currentMusic) {
        // Simpan posisi terakhir musik yang diputar
        lastPlayedTime[currentMusic.id] = currentMusic.currentTime;

        currentMusic.pause();
        currentMusic.currentTime = 0; // Reset musik ke awal
    }

    // Tentukan elemen audio yang sesuai dengan musik yang dipilih
    const musicElement = document.getElementById(`music-${songNumber}`);
    
    // Pastikan musik ada dan dapat diputar
    if (musicElement) {
        // Periksa jika ada posisi terakhir yang disimpan untuk musik ini
        if (lastPlayedTime[musicElement.id] !== undefined) {
            musicElement.currentTime = lastPlayedTime[musicElement.id];  // Lanjutkan dari posisi terakhir
        } else {
            musicElement.currentTime = 0;  // Mulai dari awal jika tidak ada posisi yang disimpan
        }

        // Memulai pemutaran musik
        currentMusic = musicElement;
        currentMusic.play()
            .then(() => {
                console.log(`Memutar musik ${songNumber}`);
            })
            .catch((error) => {
                console.error("Error saat memutar musik:", error);
            });
    } else {
        console.log("Musik tidak ditemukan.");
    }
    
    // Sembunyikan dropdown setelah memilih musik
    document.getElementById("music-dropdown-footer").style.display = "none";  // Menyembunyikan dropdown
}

// Fungsi untuk menghentikan musik
function stopMusic() {
    if (currentMusic) {
        // Simpan posisi saat dihentikan
        lastPlayedTime[currentMusic.id] = currentMusic.currentTime;

        currentMusic.pause();  // Hentikan musik
        console.log("Musik dihentikan.");
    }

    // Sembunyikan dropdown setelah menghentikan musik
    document.getElementById("music-dropdown-footer").style.display = "none";  // Menyembunyikan dropdown
}

// Fungsi untuk melanjutkan musik
function resumeMusic() {
    if (currentMusic) {
        // Periksa apakah ada posisi yang disimpan
        if (lastPlayedTime[currentMusic.id] !== undefined) {
            // Lanjutkan musik dari posisi terakhir
            currentMusic.currentTime = lastPlayedTime[currentMusic.id];
            currentMusic.play();
            console.log("Melanjutkan musik dari posisi terakhir.");
        } else {
            console.log("Tidak ada posisi terakhir yang ditemukan untuk melanjutkan musik.");
        }
    }
}

// Fungsi untuk toggle dropdown musik
document.getElementById("music-toggle-footer").addEventListener("click", function () {
    const musicDropdown = document.getElementById("music-dropdown-footer");
    if (musicDropdown.style.display === "none" || musicDropdown.style.display === "") {
        musicDropdown.style.display = "block"; // Menampilkan dropdown musik
    } else {
        musicDropdown.style.display = "none"; // Menyembunyikan dropdown musik
    }
});

// ** Quotes Logic **
const quotes = [
    {
        text_en: "Happiness is not something ready made. It comes from your own actions.",
        text_id: "Kebahagiaan bukan sesuatu yang sudah jadi. Itu datang dari tindakanmu sendiri.",
        author: "Dalai Lama",
        hasTranslationEnToId: true, // Terjemahan dari English ke Indonesian
        hasTranslationIdToEn: true, // Terjemahan dari Indonesian ke English
    },
    {
        text_en: "Success is not final, failure is not fatal, It is the courage to continue that counts.", // Tidak ada teks dalam Bahasa Inggris
        text_id: "Kesuksesan bukanlah sesuatu yang final, kegagalan bukanlah hal yang fatal, yang terpenting adalah keberanian untuk melanjutkan.",
        author: "Winston S. Churchill",
        hasTranslationEnToId: true, // Tidak ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true,  // Ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "I never dremed about success. I wordked for it.",
        text_id: "Saya tidak pernah memimpikan kesuksesan. Saya bekerja untuk itu.", // Tidak ada terjemahan dalam Bahasa Indonesia
        author: "Estee Lauder",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "We cannot solve problems with the kind of thinking we employed when we came up with them.",
        text_id: "Kita tidak bisa memecahkan masalah dengan cara berpikir seperti yang kita gunakan ketika kita menemukan masalah tersebut.", // Tidak ada terjemahan dalam Bahasa Indonesia
        author: "Albert Einstein",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "Learn as if you will live forever, Live like you will die tomorrow.",
        text_id: "Belajarlah solah-olah kamu akan hidup selamanya, hiduplah seolah-olah kamu akan mati besok.", // Tidak ada terjemahan dalam Bahasa Indonesia
        author: "Mahatma Gandhi",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.",
        text_id: "Jauhi orang-orang yang mencoba meremehkan ambisi anda. Pikiran yang kecil akan selalu melakukan hal itu, tetapi pikiran yang besar akan memberi anda perasaan bahwa anda juga bisa menjadi hebat", // Tidak ada terjemahan dalam Bahasa Indonesia
        author: "Mark Twain",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "When you change your thoughts, remember to also change your world.",
        text_id: "Saat anda mengubah pikiran anda, Ingatlah untuk mengubah dunia anda juga.", // Tidak ada terjemahan dalam Bahasa Indonesia
        author: "Norman Vincent Peale",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "It only when we take changes, when our lives improve. The initial and the most difficult risk that we need to take is to become honest.",
        text_id: "Hanya ketika kita mengambil peluang. Kehidupan kita menjadi lebih baik. Resiko awal dan tersulit yang perlu kita ambil adalah bersikap jujur.", // Tidak ada terjemahan dalam Bahasa Indonesia
        author: "Walter Anderson",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "Sometimes life doesn't give you what you want, not because you don't deserve it, but because you deserve so much more.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Terkadang hidup tidak memberi apa yang kamu mau, bukan karena kamu tidak pantas untuk menerimanya, tetapi karena kamu pantas untuk menerima yang lebih dari itu.",
        author: "Unknown",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "Life is a journey to be experienced, not a problem to be solved.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Hidup adalah sebuah perjalanan yang bisa dijadikan pengalaman, Bukan sekedar masalah yang harus di selesaikan.",
        author: "Winnie The Pooh",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "Go confidently in the direction of your dreams, Live the life you've imagined.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Pergi dengan percaya diri ke arah impian kamu, Jalani kehidupan yang kamu bayangkan.",
        author: "Henry David Thoreau",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "Love is when a person's happiness in more important than your happiness.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Cinta adalah ketika kebahagiaan seseorang lebih menjadi prioritas di banding kebahagiaanmu sendiri.",
        author: "Someone",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "Forgot who hurt you yesterday, but don't forget who loves you tenderly today.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Lupakan siapa yang menyaitimu kemarin, tapi jangan lupakan siapa yang mencintaimu dengan sungguh-sungguh hari ini.",
        author: "Someone",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "Meeting you was fate, becoming your friend was choice, but falling in love with you was completely out of my control.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Bertemu denganmu adalah takdir, menjadi temanmu adalah pilihan, tetapi jatuh cinta padamu sepenuhnya di luar kendaliku.",
        author: "Someone",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "You are the reason i belive in magic.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Kamu adalah alasan aku percaya pada keajaiban.",
        author: "Someone",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "If I were a writer, perhaps the most beautiful book I would ever create would be about you.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Jika aku menjadi seorang penulis, mungkin buku ter-indah yang pernah aku buat itu tentang kamu.",
        author: "Someone",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "Love is a mystery that is hidden throughout the ages, Sneaking behind the appearance and make our hearts as the nest.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Cinta adalah suatu misteri yang terselubung sepanjang zaman, Mengendap-endap di balik penampilan dan menjadikan hati kita sebagai sarangnya.",
        author: "Someone",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "I used to think that love and the one who is loved were different. Now I understand that they are the same.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Aku pernah berpikir bahwa cinta dan yang dicintai itu berbeda. Kini aku mengerti bahwa keduanya sama.",
        author: "Jalaludin Rumi",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "Whatever you hear and say (about love), it is all just the surface. For the essence of love is a secret that remains untold.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Apa pun yang Anda dengar dan katakan (tentang cinta), itu semua hanyalah permukaannya saja. Karena esensi dari cinta adalah sebuah rahasia yang tak terungkap.",
        author: "Jalaludin Rumi",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "Love cannot be learned or taught. Love comes as a grace.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Cinta tidak dapat dipelajari atau diajarkan. Cinta datang sebagai rahmat.",
        author: "Jalaludin Rumi",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "The only true wisdom is in knowing you know nothing.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Satu-satunya kebijaksanaan sejati adalah mengetahui bahwa Anda tidak mengetahui apa-apa.",
        author: "Socrates",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Kita adalah apa yang kita lakukan berulang-ulang. Maka, keunggulan bukanlah suatu tindakan, tetapi kebiasaan.",
        author: "Aristoteles",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "He who has a why to live can bear almost any how.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Seseorang yang memiliki alasan untuk hidup dapat menanggung hampir segala cara.",
        author: "Nietzsche",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", // Tidak ada terjemahan dalam Bahasa Indonesia
        text_id: "Apa yang ada di belakang kita dan apa yang ada di depan kita adalah hal kecil dibandingkan dengan apa yang ada di dalam diri kita.",
        author: "Ralph Waldo Emerson",
        hasTranslationEnToId: true, // Ada terjemahan ke Bahasa Indonesia
        hasTranslationIdToEn: true, // Tidak ada terjemahan ke Bahasa Inggris
    },
    {
        text_en: "It does not matter how slowly you go as long as you do not stop.",
        text_id: "Tidak penting seberapa lambat kamu berjalan, selama kamu tidak berhenti.",
        author: "Confucius",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    {
        text_en: "Experience is a hard teacher because she gives the test first, the lesson afterwards.",
        text_id: "Pengalaman adalah guru yang keras karena dia memberikan ujian-nya terlebih dahulu, baru kemudian pelajarannya.",
        author: "Vernon Sanders Law",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    {
        text_en: "When we are no longer able to change a situation, we are challenged to change ourselves.",
        text_id: "Ketika kita tidak lagi bisa mengubah suatu situasi, kita ditantang untuk mengubah diri kita sendiri.",
        author: "Viktor Frankl",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    {
        text_en: "A journey of a thousand miles begins with a single step.",
        text_id: "Perjalanan seribu mil dimulai dengan satu langkah.",
        author: "Lao Tzu",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    {
        text_en: "Life can only be understood backwards, but it must be lived forwards.",
        text_id: "Hidup hanya dapat dipahami dengan melihat ke belakang, tetapi harus dijalani ke depan.",
        author: "Søren Kierkegaard",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    {
        text_en: "The most fortunate person is the one who improves themselves and their relationship with God.",
        text_id: "Orang yang paling beruntung adalah orang yang memperbaiki dirinya dan memperbaiki hubungannya dengan Tuhan.",
        author: "Ali bin Abi Talib",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    {
        text_en: "Take advantage of your opportunities before difficulties arise, and use your youth before old age comes.",
        text_id: "Ambillah peluangmu sebelum datangnya kesulitan, dan gunakan waktu mudamu sebelum datangnya usia tua.",
        author: "Umar bin Khattab",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    {
        text_en: "Don’t grieve. Anything you lose comes round in new form.",
        text_id: "Jangan bersedih. Apa pun yang kamu kehilangan akan kembali dalam bentuk baru.",
        author: "Jalaludin Rumi",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    {
        text_en: "If you want happiness, do good to others.",
        text_id: "Jika kamu ingin mendapatkan kebahagiaan, maka berbuat baiklah kepada orang lain.",
        author: "Imam Syafi'i",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    {
        text_en: "A person who does not make good use of their time will lose the opportunity to achieve happiness.",
        text_id: "Seseorang yang tidak memanfaatkan waktu dengan baik, ia akan kehilangan kesempatan untuk mencapai kebahagiaan.",
        author: "Ibnu Qayyim al-Jawziyya",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    {
        text_en: "The best of you are those who are the most beneficial to others.",
        text_id: "Orang yang terbaik di antara kalian adalah yang paling bermanfaat bagi orang lain.",
        author: "Prophet Muhammad SAW",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    {
        text_en: "The strong person is not the one who can overpower others, but the one who can control themselves when angry.",
        text_id: "Orang yang kuat bukanlah orang yang dapat mengalahkan orang lain, tetapi orang yang dapat mengendalikan dirinya saat marah.",
        author: "Prophet Muhammad SAW",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    {
        text_en: "Do not grieve, for Allah is with us.",
        text_id: "Jangan bersedih, karena Allah bersama kita.",
        author: "Prophet Muhammad SAW",
        hasTranslationEnToId: true,
        hasTranslationIdToEn: true,
    },
    
];

let currentQuoteIndex = 0;
let isTranslated = false; // Status apakah quote sudah diterjemahkan
let audioPlaying = null; // Untuk melacak audio yang sedang diputar

// Function untuk menampilkan quote
function displayQuote() {
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");

    const currentQuote = quotes[currentQuoteIndex];
    
    // Menampilkan teks sesuai dengan status terjemahan
    if (isTranslated) {
        if (currentQuote.text_id && currentQuote.hasTranslationIdToEn) {
            quoteText.textContent = `"${currentQuote.text_id}"`; // Tampilkan versi Bahasa Indonesia
        } else if (!currentQuote.text_id && currentQuote.hasTranslationEnToId) {
            // Jika tidak ada terjemahan ke Bahasa Indonesia, beri notifikasi
            alert("Terjemahan Bahasa Indonesia tidak tersedia.");
            quoteText.textContent = `"${currentQuote.text_en}"`; // Tetap tampilkan versi Bahasa Inggris
        } else if (!currentQuote.text_en && currentQuote.hasTranslationIdToEn) {
            // Jika tidak ada terjemahan Bahasa Inggris, tampilkan terjemahan jika tersedia
            alert("Terjemahan Bahasa Inggris tidak tersedia.");
            quoteText.textContent = `"${currentQuote.text_id}"`; // Tetap tampilkan versi Bahasa Indonesia
        }
    } else {
        // Jika tidak diterjemahkan, tampilkan versi Bahasa Inggris
        quoteText.textContent = `"${currentQuote.text_en || currentQuote.text_id}"`; 
    }

    quoteAuthor.textContent = `- ${currentQuote.author}`;
    
    // Hentikan audio yang sedang diputar (jika ada)
    if (audioPlaying) {
        audioPlaying.pause();
        audioPlaying.currentTime = 0; // Reset audio ke awal
    }
}

// Function untuk berpindah ke quote berikutnya
function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    isTranslated = false; // Reset status terjemahan (tetap Bahasa Inggris)
    displayQuote();
}

// Function untuk toggle terjemahan
function toggleTranslation() {
    const currentQuote = quotes[currentQuoteIndex];
    
    // Periksa apakah terjemahan ada atau tidak
    if (currentQuote.text_en && !currentQuote.hasTranslationEnToId) {
        // Jika ada teks dalam Bahasa Inggris, tapi tidak ada terjemahan ke Bahasa Indonesia
        alert("Terjemahan Bahasa Indonesia tidak tersedia untuk quote ini.");
        return; // Hentikan proses lebih lanjut
    }
    
    if (currentQuote.text_id && !currentQuote.hasTranslationIdToEn) {
        // Jika ada teks dalam Bahasa Indonesia, tapi tidak ada terjemahan ke Bahasa Inggris
        alert("Terjemahan Bahasa Inggris tidak tersedia untuk quote ini.");
        return; // Hentikan proses lebih lanjut
    }

    // Toggle status terjemahan
    isTranslated = !isTranslated;
    displayQuote();
}

// Function untuk memutar audio (voice)
function playAudio() {
    const currentQuote = quotes[currentQuoteIndex];

    // Menentukan ID audio berdasarkan terjemahan yang ditampilkan
    let audioElement;
    if (isTranslated) {
        // Jika teks terjemahan dalam Bahasa Indonesia, play audio Bahasa Indonesia
        audioElement = document.getElementById(`audio-quote-${currentQuoteIndex + 1}-id`);
    } else {
        // Jika teks dalam Bahasa Inggris, play audio Bahasa Inggris
        audioElement = document.getElementById(`audio-quote-${currentQuoteIndex + 1}-en`);
    }

    // Cek apakah ada musik yang sedang diputar
    if (currentMusic) {
        // Tampilkan pemberitahuan jika musik sedang diputar
        const userWantsToContinue = confirm("Saat ini musik sedang diputar. Untuk mendengarkan voice dengan jelas, lebih baik matikan musik terlebih dahulu. Apakah anda ingin melanjutkan memutar voice dan musik sekaligus?");
        
        if (!userWantsToContinue) {
            // Jika pengguna memilih untuk tidak melanjutkan, batalkan pemutaran voice
            return;
        }
    }

    // Jika elemen audio ditemukan, putar audio voice
    if (audioElement) {
        audioPlaying = audioElement;  // Menyimpan referensi ke audio yang diputar
        audioPlaying.play();
    } else {
        // Jika audio tidak tersedia untuk quote ini
        alert("Audio untuk quote ini tidak tersedia.");
    }
}


// Event listener untuk ikon suara
document.getElementById("voice-icon").addEventListener("click", playAudio);

// Event listener untuk ikon terjemahan
document.getElementById("translate-icon").addEventListener("click", toggleTranslation);

// Initial quote display
displayQuote();
