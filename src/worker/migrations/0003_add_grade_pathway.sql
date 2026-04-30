-- Migration 0003: Add current_grade + selected_pathway to student_profiles
-- Phase 04 — Onboarding & Dashboard personalization

ALTER TABLE student_profiles ADD COLUMN current_grade INTEGER DEFAULT NULL;
ALTER TABLE student_profiles ADD COLUMN selected_pathway TEXT DEFAULT NULL;
