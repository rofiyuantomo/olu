/* ============================================
   OLU — Weapon Loadout System
   Interactive weapon cards with detail modal,
   admin mode for adding/removing loadout codes.
   Data stored in localStorage.
   ============================================ */

// Default weapon data
const DEFAULT_WEAPONS = [
    // Assault Rifles
    { id: 'ar1', category: 'Assault Rifle', name: 'Weapon 1', description: 'Assault Rifle slot 1 — Belum diisi', image: '', loadouts: [] },
    { id: 'ar2', category: 'Assault Rifle', name: 'Weapon 2', description: 'Assault Rifle slot 2 — Belum diisi', image: '', loadouts: [] },
    { id: 'ar3', category: 'Assault Rifle', name: 'Weapon 3', description: 'Assault Rifle slot 3 — Belum diisi', image: '', loadouts: [] },
    // SMG
    { id: 'smg1', category: 'Submachine Gun', name: 'Weapon 1', description: 'SMG slot 1 — Belum diisi', image: '', loadouts: [] },
    { id: 'smg2', category: 'Submachine Gun', name: 'Weapon 2', description: 'SMG slot 2 — Belum diisi', image: '', loadouts: [] },
    { id: 'smg3', category: 'Submachine Gun', name: 'Weapon 3', description: 'SMG slot 3 — Belum diisi', image: '', loadouts: [] },
    // Shotgun
    { id: 'sg1', category: 'Shotgun', name: 'Weapon 1', description: 'Shotgun slot 1 — Belum diisi', image: '', loadouts: [] },
    { id: 'sg2', category: 'Shotgun', name: 'Weapon 2', description: 'Shotgun slot 2 — Belum diisi', image: '', loadouts: [] },
    { id: 'sg3', category: 'Shotgun', name: 'Weapon 3', description: 'Shotgun slot 3 — Belum diisi', image: '', loadouts: [] },
    // Marksman Rifle
    { id: 'mr1', category: 'Marksman Rifle', name: 'Weapon 1', description: 'Marksman Rifle slot 1 — Belum diisi', image: '', loadouts: [] },
    { id: 'mr2', category: 'Marksman Rifle', name: 'Weapon 2', description: 'Marksman Rifle slot 2 — Belum diisi', image: '', loadouts: [] },
    { id: 'mr3', category: 'Marksman Rifle', name: 'Weapon 3', description: 'Marksman Rifle slot 3 — Belum diisi', image: '', loadouts: [] },
    // LMG
    { id: 'lmg1', category: 'Light Machine Gun', name: 'Weapon 1', description: 'LMG slot 1 — Belum diisi', image: '', loadouts: [] },
    { id: 'lmg2', category: 'Light Machine Gun', name: 'Weapon 2', description: 'LMG slot 2 — Belum diisi', image: '', loadouts: [] },
    { id: 'lmg3', category: 'Light Machine Gun', name: 'Weapon 3', description: 'LMG slot 3 — Belum diisi', image: '', loadouts: [] },
    // Sniper
    { id: 'sr1', category: 'Sniper Rifle', name: 'Weapon 1', description: 'Sniper Rifle slot 1 — Belum diisi', image: '', loadouts: [] },
    { id: 'sr2', category: 'Sniper Rifle', name: 'Weapon 2', description: 'Sniper Rifle slot 2 — Belum diisi', image: '', loadouts: [] },
    { id: 'sr3', category: 'Sniper Rifle', name: 'Weapon 3', description: 'Sniper Rifle slot 3 — Belum diisi', image: '', loadouts: [] },
    // Special
    { id: 'sp1', category: 'Special Weapon', name: 'Weapon 1', description: 'Special Weapon slot 1 — Belum diisi', image: '', loadouts: [] },
    { id: 'sp2', category: 'Special Weapon', name: 'Weapon 2', description: 'Special Weapon slot 2 — Belum diisi', image: '', loadouts: [] },
    { id: 'sp3', category: 'Special Weapon', name: 'Weapon 3', description: 'Special Weapon slot 3 — Belum diisi', image: '', loadouts: [] },
];

const CATEGORY_ICONS = {
    'Assault Rifle': 'fa-crosshairs',
    'Submachine Gun': 'fa-crosshairs',
    'Shotgun': 'fa-crosshairs',
    'Marksman Rifle': 'fa-crosshairs',
    'Light Machine Gun': 'fa-crosshairs',
    'Sniper Rifle': 'fa-crosshairs',
    'Special Weapon': 'fa-crosshairs',
};

let weapons = [];
let isAdmin = false;
let currentWeapon = null;

// Load data from localStorage or use defaults
function loadWeapons() {
    const saved = localStorage.getItem('olu_weapons');
    if (saved) {
        try {
            weapons = JSON.parse(saved);
        } catch (e) {
            weapons = JSON.parse(JSON.stringify(DEFAULT_WEAPONS));
        }
    } else {
        weapons = JSON.parse(JSON.stringify(DEFAULT_WEAPONS));
    }
}

function saveWeapons() {
    localStorage.setItem('olu_weapons', JSON.stringify(weapons));
}

// Group weapons by category
function groupByCategory(weaponList) {
    const groups = {};
    weaponList.forEach(w => {
        if (!groups[w.category]) groups[w.category] = [];
        groups[w.category].push(w);
    });
    return groups;
}

// Render all weapon categories and cards
function renderLoadout() {
    const container = document.getElementById('loadoutContainer');
    if (!container) return;

    const groups = groupByCategory(weapons);
    let html = '';

    for (const [category, items] of Object.entries(groups)) {
        const icon = CATEGORY_ICONS[category] || 'fa-crosshairs';
        html += `
        <div class="loadout-category">
            <h3 class="category-title"><i class="fas ${icon}"></i> ${category}</h3>
            <div class="loadout-grid">
        `;

        items.forEach(weapon => {
            const loadoutCount = weapon.loadouts.length;
            const hasImage = weapon.image && weapon.image.trim() !== '';
            html += `
                <div class="weapon-card weapon-card-clickable" data-weapon-id="${weapon.id}" onclick="openWeaponDetail('${weapon.id}')">
                    <div class="weapon-img-area">
                        ${hasImage
                            ? `<img src="${weapon.image}" alt="${weapon.name}" class="weapon-card-img">`
                            : `<div class="weapon-img-placeholder"><i class="fas fa-image"></i><span>Foto Senjata</span></div>`
                        }
                    </div>
                    <div class="weapon-info">
                        <h4>${weapon.name}</h4>
                        <p class="weapon-loadout-count">
                            <i class="fas fa-code"></i> ${loadoutCount} loadout code${loadoutCount !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <div class="weapon-card-arrow"><i class="fas fa-chevron-right"></i></div>
                </div>
            `;
        });

        // Admin: add weapon button
        if (isAdmin) {
            html += `
                <div class="weapon-card weapon-card-add" onclick="addWeapon('${category}')">
                    <i class="fas fa-plus"></i>
                    <span>Tambah Senjata</span>
                </div>
            `;
        }

        html += `
            </div>
        </div>
        `;
    }

    container.innerHTML = html;
}

// Open weapon detail modal
function openWeaponDetail(weaponId) {
    const weapon = weapons.find(w => w.id === weaponId);
    if (!weapon) return;
    currentWeapon = weapon;

    document.getElementById('modalCategory').textContent = weapon.category;
    document.getElementById('modalName').textContent = weapon.name;
    document.getElementById('modalDesc').textContent = weapon.description;

    const imgContainer = document.getElementById('modalImg');
    if (weapon.image && weapon.image.trim() !== '') {
        imgContainer.innerHTML = `<img src="${weapon.image}" alt="${weapon.name}">`;
    } else {
        imgContainer.innerHTML = `<div class="modal-img-placeholder"><i class="fas fa-image"></i></div>`;
    }

    renderModalLoadouts(weapon);

    const addSection = document.getElementById('addLoadoutSection');
    if (addSection) addSection.style.display = isAdmin ? 'block' : 'none';

    document.getElementById('weaponModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Render loadout codes in modal
function renderModalLoadouts(weapon) {
    const container = document.getElementById('modalLoadouts');
    if (!container) return;

    if (weapon.loadouts.length === 0) {
        container.innerHTML = `
            <div class="no-loadouts">
                <i class="fas fa-inbox"></i>
                <p>Belum ada loadout code untuk senjata ini.</p>
                ${isAdmin ? '<p class="hint">Klik "Tambah Loadout Code" untuk menambahkan.</p>' : ''}
            </div>
        `;
        return;
    }

    let html = '';
    weapon.loadouts.forEach((loadout, index) => {
        html += `
            <div class="loadout-item">
                <div class="loadout-item-header">
                    <span class="loadout-number">#${index + 1}</span>
                    <span class="loadout-label">${loadout.label || 'Loadout ' + (index + 1)}</span>
                    ${isAdmin ? `<button class="loadout-remove-btn" onclick="removeLoadout('${weapon.id}', ${index})" title="Hapus"><i class="fas fa-trash"></i></button>` : ''}
                </div>
                <div class="loadout-code-block">
                    <code>${loadout.code}</code>
                    <button class="copy-btn" onclick="copyCode(this, '${escapeHtml(loadout.code)}')" title="Copy">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
                ${loadout.detail ? `<div class="loadout-detail"><p>${loadout.detail}</p></div>` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}

function escapeHtml(text) {
    return text.replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Copy loadout code
function copyCode(btn, code) {
    navigator.clipboard.writeText(code.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')).then(() => {
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i>';
            btn.classList.remove('copied');
        }, 2000);
    });
}

// Close modal
function closeModal() {
    document.getElementById('weaponModal').classList.remove('active');
    document.body.style.overflow = '';
    currentWeapon = null;
}

// Admin: Add loadout code
function addLoadoutCode() {
    if (!currentWeapon || !isAdmin) return;

    const label = prompt('Label loadout (contoh: "Close Range Setup", "Rush Build"):');
    if (label === null) return;

    const code = prompt('Masukkan loadout code:');
    if (!code) return;

    const detail = prompt('Penjelasan/detail loadout (opsional):');

    currentWeapon.loadouts.push({
        label: label || 'Loadout ' + (currentWeapon.loadouts.length + 1),
        code: code,
        detail: detail || ''
    });

    saveWeapons();
    renderModalLoadouts(currentWeapon);
    renderLoadout();
}

// Admin: Remove loadout code
function removeLoadout(weaponId, index) {
    if (!isAdmin) return;
    if (!confirm('Hapus loadout code ini?')) return;

    const weapon = weapons.find(w => w.id === weaponId);
    if (!weapon) return;

    weapon.loadouts.splice(index, 1);
    saveWeapons();
    renderModalLoadouts(weapon);
    renderLoadout();
}

// Admin: Add weapon to category
function addWeapon(category) {
    if (!isAdmin) return;

    const name = prompt('Nama senjata:');
    if (!name) return;

    const desc = prompt('Deskripsi senjata (opsional):');
    const image = prompt('URL gambar senjata (opsional, kosongkan jika belum ada):');

    const id = category.toLowerCase().replace(/\s+/g, '') + '_' + Date.now();

    weapons.push({
        id: id,
        category: category,
        name: name,
        description: desc || '',
        image: image || '',
        loadouts: []
    });

    saveWeapons();
    renderLoadout();
}

// Admin: Edit weapon (name, desc, image)
function editWeapon(weaponId) {
    if (!isAdmin) return;
    const weapon = weapons.find(w => w.id === weaponId);
    if (!weapon) return;

    const name = prompt('Nama senjata:', weapon.name);
    if (name === null) return;
    weapon.name = name;

    const desc = prompt('Deskripsi:', weapon.description);
    if (desc !== null) weapon.description = desc;

    const image = prompt('URL gambar:', weapon.image);
    if (image !== null) weapon.image = image;

    saveWeapons();
    openWeaponDetail(weaponId);
    renderLoadout();
}

// Admin: Delete weapon
function deleteWeapon(weaponId) {
    if (!isAdmin) return;
    if (!confirm('Hapus senjata ini beserta semua loadout-nya?')) return;

    weapons = weapons.filter(w => w.id !== weaponId);
    saveWeapons();
    closeModal();
    renderLoadout();
}

// Toggle admin mode
function toggleAdmin() {
    const btn = document.getElementById('adminToggle');
    if (!isAdmin) {
        const pass = prompt('Masukkan password admin:');
        if (pass === 'oluadmin') {
            isAdmin = true;
            btn.innerHTML = '<i class="fas fa-unlock"></i> ADMIN MODE ON';
            btn.classList.add('active');
            document.body.classList.add('admin-mode');
        } else if (pass !== null) {
            alert('Password salah!');
        }
    } else {
        isAdmin = false;
        btn.innerHTML = '<i class="fas fa-lock"></i> ADMIN MODE';
        btn.classList.remove('active');
        document.body.classList.remove('admin-mode');
    }
    renderLoadout();
    if (currentWeapon) {
        const addSection = document.getElementById('addLoadoutSection');
        if (addSection) addSection.style.display = isAdmin ? 'block' : 'none';
        renderModalLoadouts(currentWeapon);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadWeapons();
    renderLoadout();

    // Admin toggle
    const adminBtn = document.getElementById('adminToggle');
    if (adminBtn) adminBtn.addEventListener('click', toggleAdmin);

    // Modal close
    const closeBtn = document.getElementById('modalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close modal on overlay click
    const modal = document.getElementById('weaponModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Add loadout button
    const addBtn = document.getElementById('addLoadoutBtn');
    if (addBtn) addBtn.addEventListener('click', addLoadoutCode);

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
