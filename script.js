// 1. DAFTAR FOTO KENANGAN (Pastikan nama file foto sesuai di folder Anda)
const daftarFoto = [
    'foto1.jpeg',
    'foto2.jpeg',
    'foto3.jpeg',
    'foto4.jpeg'
];

let indeksFotoSekarang = 0;
let webTerbuka = false;
let intervalAnimasiMenu; 
let intervalBungaGlobal; 

// ================= LOGIKA UTAMA: ENGINES SERBUAN BUNGA SAKURA SINEATIK =================
function jalankanHujanBungaSinematik(durasiMiliDetik, callbackSelesai) {
    const terowonganBunga = document.getElementById('flower-tunnel');
    const introScreen = document.getElementById('intro-screen');
    const kelopakBunga = ['🌸', '🌺', '🌹', '✨'];
    
    introScreen.style.opacity = '1';
    introScreen.classList.remove('hidden-element');

    intervalBungaGlobal = setInterval(() => {
        const bunga = document.createElement('div');
        bunga.classList.add('intro-flower');
        bunga.innerText = kelopakBunga[Math.floor(Math.random() * kelopakBunga.length)];
        
        const sudutAcak = Math.random() * 2 * Math.PI;
        const jarakJauh = Math.random() * 800 + 400; 
        const x = Math.cos(sudutAcak) * jarakJauh + 'px';
        const y = Math.sin(sudutAcak) * jarakJauh + 'px';
        
        bunga.style.setProperty('--x', x);
        bunga.style.setProperty('--y', y);
        bunga.style.animationDuration = (Math.random() * 1.2 + 1.2) + 's';
        
        if(terowonganBunga) terowonganBunga.appendChild(bunga);
        setTimeout(() => { bunga.remove(); }, 2500);
    }, 12);

    setTimeout(() => {
        clearInterval(intervalBungaGlobal);
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.classList.add('hidden-element');
            if(callbackSelesai) callbackSelesai();
        }, 800);
    }, durasiMiliDetik);
}

// JALANKAN INTRO PERTAMA KALI SAAT LINK DIKLIK
jalankanHujanBungaSinematik(4500, function() {
    document.getElementById('main-nav').classList.remove('hidden-element');
    document.getElementById('main-container').classList.remove('hidden-element');
});

// ================= TAHAP 1: CEK PASSWORD ANGKA TANGGAL JADIAN =================
function cekKode() {
    const input = document.getElementById('inputKode').value;
    const pesanError = document.getElementById('pesanError');

    if (input === '250525') {
        pesanError.innerText = "";
        document.getElementById('card-password').classList.add('hidden-element');
        document.getElementById('game-layer').classList.remove('hidden-element');
        buatPapanGameLove(); 
    } else {
        pesanError.innerText = "Kode salah sayang! Coba ingat tanggal jadian kita 😉";
    }
}

// ================= TAHAP 2: GENERATOR PAPAN GAME (220 LOVE PENUH KOTAK) =================
function buatPapanGameLove() {
    const board = document.getElementById('game-board');
    if(!board) return;

    const totalHati = 220; 
    const indeksHatiPink = Math.floor(Math.random() * totalHati); 

    for(let i = 0; i < totalHati; i++) {
        const heart = document.createElement('div');
        heart.classList.add('game-heart');
        
        if(i === indeksHatiPink) {
            heart.innerText = '💗'; 
            heart.onclick = function() { pemicuSelesaiGame(heart); };
        } else {
            heart.innerText = '❤️'; 
            heart.onclick = () => {
                heart.style.transform = "scale(0.7)";
                heart.style.opacity = "0.15"; 
            };
        }

        const targetX = (Math.random() * 94 + 2) + '%';
        const targetY = (Math.random() * 90 + 4) + '%';
        heart.style.setProperty('--target-x', targetX);
        heart.style.setProperty('--target-y', targetY);

        heart.style.animationDuration = (Math.random() * 0.7 + 1.2) + 's';
        heart.style.animationDelay = (Math.random() * 0.4) + 's';
        
        board.appendChild(heart);
    }
}

// ================= TAHAP 3: KLIK LOVE PINK -> ZOOM 4X LEBIH BESAR (HENING) =================
function pemicuSelesaiGame(elemenPink) {
    webTerbuka = true;
    elemenPink.classList.add('pink-active');

    // Buka gembok menu navigasi di background
    document.getElementById('nav-letter').classList.remove('disabled');
    document.getElementById('nav-pray').classList.remove('disabled');
    document.getElementById('nav-love').classList.remove('disabled');

    setTimeout(() => {
        document.getElementById('welcome-box').classList.remove('hidden-element');
    }, 1200);
}

// ================= TAHAP 4: TEKAN NEXT -> MENU BERUBAH JADI 3 & MENU SURAT DULUAN + LAGU MASUK =================
function pemicuNextKeLetter() {
    document.getElementById('intro-label').innerText = "Opening My Letter For You... 📝";
    
    // Jalankan semburan bunga sakura penutup layar selama 4 detik
    jalankanHujanBungaSinematik(4000, function() {
        // ROMBAK NAVIGASI ATAS: URUTAN DIUBAH (LETTER DULU BARU PRAY DAN MEMORY)
        const navList = document.getElementById('nav-list');
        navList.innerHTML = `
            <li><a href="#" id="nav-letter" class="active" onclick="gantiMenu('letter')">1. The Letter</a></li>
            <li><a href="#" id="nav-pray" onclick="gantiMenu('pray')">2. Pray</a></li>
            <li><a href="#" id="nav-love" onclick="gantiMenu('love')">3. Memory</a></li>
        `;
        
        // Bersihkan sisa elemen panggung game welcome dari sistem browser
        const welcomeSection = document.getElementById('menu-welcome');
        if(welcomeSection) welcomeSection.remove();

        // Alihkan halaman ke LETTER secara resmi beserta menyalakan animasinya
        gantiMenu('letter');
    });

    // Musik masuk pas di tengah transisi semburan bunga
    setTimeout(() => {
        const musik = document.getElementById('bgMusic');
        musik.volume = 0.3; 
        musik.play().catch(() => console.log("Musik menyala di sela transisi"));
    }, 500);
}

// ================= TAHAP 5: PENGENDALI NAVIGASI MENU UTAMA & RESET ANIMASI BACKROUND =================
function gantiMenu(namaMenu) {
    // Sembunyikan seluruh seksi konten
    const semuaSection = document.querySelectorAll('.content-section');
    semuaSection.forEach(sec => sec.classList.remove('active-section'));

    // Bersihkan interval animasi menu lama agar tidak bertumpuk ganda
    clearInterval(intervalAnimasiMenu);
    
    // Cari semua layer animasi background lalu kosongkan isinya
    const semuaBgLayer = document.querySelectorAll('.bg-animation-layer');
    semuaBgLayer.forEach(layer => layer.innerHTML = "");

    // Tampilkan menu yang sedang diklik
    const targetSection = document.getElementById('menu-' + namaMenu);
    if(targetSection) {
        targetSection.classList.add('active-section');
    }

    // Atur kelas warna aktif (merah muda) pada navigasi menu atas yang baru
    const semuaNav = document.querySelectorAll('nav ul li a');
    semuaNav.forEach(nav => nav.classList.remove('active'));
    
    const navAktif = document.getElementById('nav-' + namaMenu);
    if(navAktif) navAktif.classList.add('active');

    // Pastikan musik terus mengalun stabil lintas menu
    const musik = document.getElementById('bgMusic');
    if (musik.paused) {
        musik.play();
    }

    // PENCETUS ULANG ANIMASI PER MENU SEHINGGA MENYALA NORMAL KEMBALI
    if (namaMenu === 'letter') {
        intervalAnimasiMenu = setInterval(buatSakuraGugur, 300); // Menu 1: Sakura Gugur
    } else if (namaMenu === 'pray') {
        buatBintangBerkilauLarge(); // Menu 2: Bintang jumbo kelap-kelip statis
    } else if (namaMenu === 'love') {
        tampilkanFoto(); // Menu 3: Galeri Slide Kenangan
        intervalAnimasiMenu = setInterval(buatLoveJatuh, 200); // Hujan love dibelakang foto
    }
}

// ================= AMBIENCE ENGINE BACKGROUND GENERATOR =================
function buatSakuraGugur() {
    const container = document.getElementById('flower-fall-container');
    if (!container) return;
    const kelopak = document.createElement('div');
    kelopak.classList.add('falling-sakura');
    kelopak.innerText = Math.random() > 0.5 ? '🌸' : '💮';
    kelopak.style.left = Math.random() * 100 + 'vw';
    const ukuran = Math.random() * 15 + 10;
    kelopak.style.fontSize = ukuran + 'px';
    const durasi = Math.random() * 4 + 4;
    kelopak.style.animationDuration = durasi + 's';
    container.appendChild(kelopak);
    setTimeout(() => { kelopak.remove(); }, durasi * 1000);
}

function buatBintangBerkilauLarge() {
    const container = document.getElementById('stars-container');
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 40; i++) {
        const bintang = document.createElement('div');
        bintang.classList.add('twinkle-star');
        const ukuran = Math.random() * 16 + 14; 
        bintang.style.width = ukuran + 'px';
        bintang.style.height = ukuran + 'px';
        bintang.style.left = Math.random() * 100 + 'vw';
        bintang.style.top = Math.random() * 100 + 'vh';
        bintang.style.animationDelay = Math.random() * 2 + 's';
        bintang.style.animationDuration = (Math.random() * 2 + 1.5) + 's'; 
        container.appendChild(bintang);
    }
}

function buatLoveJatuh() {
    const container = document.getElementById('heart-rain-container');
    if (!container) return;
    const love = document.createElement('div');
    love.classList.add('falling-love');
    love.innerText = '❤️';
    love.style.left = Math.random() * 100 + 'vw';
    const ukuran = Math.random() * 20 + 10;
    love.style.fontSize = ukuran + 'px';
    const durasi = Math.random() * 3 + 3;
    love.style.animationDuration = durasi + 's';
    container.appendChild(love);
    setTimeout(() => { love.remove(); }, durasi * 1000);
}

// ================= LOGIKA SLIDER MEMORIES =================
function tampilkanFoto() {
    const elemenFoto = document.getElementById('fotoSlide');
    if(elemenFoto) {
        elemenFoto.src = daftarFoto[indeksFotoSekarang];
    }
}

function geserFoto(arah) {
    indeksFotoSekarang += arah;
    if (indeksFotoSekarang >= daftarFoto.length) indeksFotoSekarang = 0;
    if (indeksFotoSekarang < 0) indeksFotoSekarang = daftarFoto.length - 1;
    tampilkanFoto();}
