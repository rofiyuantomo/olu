/* ============================================
   OLU — Weapon Loadout System
   Interactive weapon cards with detail modal,
   admin mode for adding/removing loadout codes.
   Data stored in localStorage.
   ============================================ */

// Default weapon data
const DEFAULT_WEAPONS = [
    // Assault Rifle
    { id: 'ar1', category: 'Assault Rifle', name: 'AKM Assault Rifle', description: 'AKM Assault Rifle — Warfare loadout', image: 'assets/weapon-images/ar/akm.png', loadouts: [
        { label: 'Warfare', code: '6K0BSE407KC16VJTG13QB', detail: 'Loadout Warfare untuk AKM Assault Rifle.' }
    ] },
    { id: 'ar2', category: 'Assault Rifle', name: 'AR-57 Assault Rifle', description: 'AR-57 Assault Rifle — Warfare loadout', image: 'assets/weapon-images/ar/ar-57.png', loadouts: [
        { label: 'Warfare', code: '6K0BSJ007KC16VJTG13QB', detail: 'Loadout Warfare untuk AR-57 Assault Rifle.' }
    ] },
    { id: 'ar3', category: 'Assault Rifle', name: 'AK-12 Assault Rifle', description: 'AK-12 Assault Rifle — Warfare loadout', image: 'assets/weapon-images/ar/ak-12.png', loadouts: [
        { label: 'Warfare', code: '6K0BSOG07KC16VJTG13QB', detail: 'Loadout Warfare untuk AK-12 Assault Rifle.' }
    ] },
    // SMG
    { id: 'smg1', category: 'Submachine Gun', name: 'MP7 Submachine Gun', description: 'MP7 Submachine Gun — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6K0BSRG07KC16VJTG13QB', detail: 'Loadout Warfare untuk MP7 Submachine Gun.' }
    ] },
    { id: 'smg2', category: 'Submachine Gun', name: 'QCQ171 Submachine Gun', description: 'QCQ171 Submachine Gun — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6K0ATEK07KC16VJTG13QB', detail: 'Loadout Warfare untuk QCQ171 Submachine Gun.' }
    ] },
    { id: 'smg3', category: 'Submachine Gun', name: 'MK4 Submachine Gun', description: 'MK4 Submachine Gun — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6K0BTLS07KC16VJTG13QB', detail: 'Loadout Warfare untuk MK4 Submachine Gun.' }
    ] },
    // LMG
    { id: 'lmg1', category: 'Light Machine Gun', name: 'QJB201 Light Machine Gun', description: 'QJB201 Light Machine Gun — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6JUG2Q407KC16VJTG13QB', detail: 'Loadout Warfare untuk QJB201 Light Machine Gun.' }
    ] },
    { id: 'lmg2', category: 'Light Machine Gun', name: 'PKM General Machine Gun', description: 'PKM General Machine Gun — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6JVDVF807KC16VJTG13QB', detail: 'Loadout Warfare untuk PKM General Machine Gun.' }
    ] },
    { id: 'lmg3', category: 'Light Machine Gun', name: 'M249 Light Machine Gun', description: 'M249 Light Machine Gun — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6K0BUD007KC16VJTG13QB', detail: 'Loadout Warfare untuk M249 Light Machine Gun.' }
    ] },
    // DMR
    { id: 'mr1', category: 'Marksman Rifle', name: 'Mini-14 Marksman Rifle', description: 'Mini-14 Marksman Rifle — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6K0BUG007KC16VJTG13QB', detail: 'Loadout Warfare untuk Mini-14 Marksman Rifle.' }
    ] },
    { id: 'mr2', category: 'Marksman Rifle', name: 'SR-25 Marksman Rifle', description: 'SR-25 Marksman Rifle — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6K0BUOC07KC16VJTG13QB', detail: 'Loadout Warfare untuk SR-25 Marksman Rifle.' }
    ] },
    // SR
    { id: 'sr1', category: 'Sniper Rifle', name: 'R93 Sniper Rifle', description: 'R93 Sniper Rifle — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6K0BUSC07KC16VJTG13QB', detail: 'Loadout Warfare untuk R93 Sniper Rifle.' }
    ] },
    { id: 'sr2', category: 'Sniper Rifle', name: 'AWM Sniper Rifle', description: 'AWM Sniper Rifle — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6K0BUUS07KC16VJTG13QB', detail: 'Loadout Warfare untuk AWM Sniper Rifle.' }
    ] },
    { id: 'sr3', category: 'Sniper Rifle', name: 'M82 Sniper Rifle', description: 'M82 Sniper Rifle — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6K0BV0C07KC16VJTG13QB', detail: 'Loadout Warfare untuk M82 Sniper Rifle.' }
    ] },
    // Special
    { id: 'sp1', category: 'Special Weapon', name: 'Compound Bow', description: 'Compound Bow — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6K06DTC07KC16VJTG13QB', detail: 'Loadout Warfare untuk Compound Bow.' }
    ] },
    // Shotgun
    { id: 'sg1', category: 'Shotgun', name: 'S12K Shotgun', description: 'S12K Shotgun — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6JRRALS07KC16VJTG13QB', detail: 'Loadout Warfare untuk S12K Shotgun.' }
    ] },
    { id: 'sg2', category: 'Shotgun', name: 'FS-12 Shotgun', description: 'FS-12 Shotgun — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6K0BV7007KC16VJTG13QB', detail: 'Loadout Warfare untuk FS-12 Shotgun.' }
    ] },
    { id: 'sg3', category: 'Shotgun', name: 'M870 Shotgun', description: 'M870 Shotgun — Warfare loadout', image: '', loadouts: [
        { label: 'Warfare', code: '6JUFVV407KC16VJTG13QB', detail: 'Loadout Warfare untuk M870 Shotgun.' }
    ] },
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
    container.querySelectorAll('.weapon-card').forEach(card => card.classList.add('visible'));
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

// Admin mode disabled for web users.
// To enable admin features, set `isAdmin = true` manually in this file and reload.

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadWeapons();
    renderLoadout();

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
