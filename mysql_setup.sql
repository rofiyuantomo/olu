-- MySQL setup for OLU Weapon Loadout

CREATE DATABASE IF NOT EXISTS olu_loadout;
USE olu_loadout;

CREATE TABLE IF NOT EXISTS weapons (
  id VARCHAR(50) PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS loadouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  weapon_id VARCHAR(50) NOT NULL,
  label VARCHAR(150) NOT NULL,
  code TEXT NOT NULL,
  detail TEXT,
  FOREIGN KEY (weapon_id) REFERENCES weapons(id) ON DELETE CASCADE
);

-- Contoh data senjata dan loadout
INSERT INTO weapons (id, category, name, description, image) VALUES
('ar1', 'Assault Rifle', 'Weapon 1', 'Assault Rifle slot 1 — Contoh loadout tersedia.', NULL);

INSERT INTO loadouts (weapon_id, label, code, detail) VALUES
('ar1', 'Close Range Setup', 'AR-CR-2025', 'Loadout ini cocok untuk pertempuran jarak dekat dengan mobilitas tinggi.');
