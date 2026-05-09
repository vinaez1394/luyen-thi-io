-- ============================================================
-- Migration: 0010_seed_emojis_flyers_animals.sql
-- Cập nhật emoji cho 20 từ Animals Flyers đã có trong DB
-- ============================================================

UPDATE vocabulary_bank SET emoji = '🦇' WHERE id = 'fl-an-001'; -- bat
UPDATE vocabulary_bank SET emoji = '🦋' WHERE id = 'fl-an-002'; -- butterfly
UPDATE vocabulary_bank SET emoji = '🐪' WHERE id = 'fl-an-003'; -- camel
UPDATE vocabulary_bank SET emoji = '🐆' WHERE id = 'fl-an-004'; -- cheetah
UPDATE vocabulary_bank SET emoji = '🦀' WHERE id = 'fl-an-005'; -- crab
UPDATE vocabulary_bank SET emoji = '🐊' WHERE id = 'fl-an-006'; -- crocodile
UPDATE vocabulary_bank SET emoji = '🦌' WHERE id = 'fl-an-007'; -- deer
UPDATE vocabulary_bank SET emoji = '🐬' WHERE id = 'fl-an-008'; -- dolphin
UPDATE vocabulary_bank SET emoji = '🦅' WHERE id = 'fl-an-009'; -- eagle
UPDATE vocabulary_bank SET emoji = '🦩' WHERE id = 'fl-an-010'; -- flamingo
UPDATE vocabulary_bank SET emoji = '🦍' WHERE id = 'fl-an-011'; -- gorilla
UPDATE vocabulary_bank SET emoji = '🪼' WHERE id = 'fl-an-012'; -- jellyfish
UPDATE vocabulary_bank SET emoji = '🦘' WHERE id = 'fl-an-013'; -- kangaroo
UPDATE vocabulary_bank SET emoji = '🐙' WHERE id = 'fl-an-014'; -- octopus
UPDATE vocabulary_bank SET emoji = '🦜' WHERE id = 'fl-an-015'; -- parrot
UPDATE vocabulary_bank SET emoji = '🐧' WHERE id = 'fl-an-016'; -- penguin
UPDATE vocabulary_bank SET emoji = '🦈' WHERE id = 'fl-an-017'; -- shark
UPDATE vocabulary_bank SET emoji = '🦢' WHERE id = 'fl-an-018'; -- swan
UPDATE vocabulary_bank SET emoji = '🐳' WHERE id = 'fl-an-019'; -- whale
UPDATE vocabulary_bank SET emoji = '🐺' WHERE id = 'fl-an-020'; -- wolf
