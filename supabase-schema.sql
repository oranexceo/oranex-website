-- ==============================================================================
-- ORANEX TRADING ONE MEMBER PLC — SUPABASE PRODUCTION DATABASE SCHEMA
-- Target Database: PostgreSQL 15+ (Supabase Production Instance)
-- Migration File: supabase-schema.sql
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Master Table: Customer Procurement Inquiries, RFQs & BOQs
CREATE TABLE IF NOT EXISTS public.oranex_leads (
    -- Identification
    id TEXT PRIMARY KEY,
    enquiry_type TEXT DEFAULT 'BOQ_SUBMISSION', -- 'BOQ_SUBMISSION', 'RFQ_QUOTATION', 'MERKATO_LCL', 'TECHNICAL_TRIAL'

    -- Customer & Company Contact Information
    name TEXT NOT NULL,                         -- Contact person name
    company TEXT NOT NULL,                      -- Registered company name
    email TEXT,                                 -- Business email
    phone TEXT,                                 -- Mobile or WhatsApp number
    country TEXT DEFAULT 'Ethiopia',
    delivery_location TEXT,                     -- Site destination (e.g. Addis Ababa, Modjo, Hawassa)
    business_type TEXT,                         -- Contractor, Developer, Ready-Mix, Wholesaler, EPC

    -- Sourcing & Project Scope
    product_or_category TEXT NOT NULL,          -- Requested category or product name
    estimated_quantity TEXT,                    -- e.g. "100 MT", "2x20' FCL", "5 CBM"
    required_delivery_date TEXT,                -- Target project timeline
    procurement_package TEXT DEFAULT 'PACKAGE_A',-- 'PACKAGE_A' (Single), 'PACKAGE_B' (Work Section), 'PACKAGE_C' (Multi-Cat), 'PACKAGE_D' (Project-Wide)
    notes TEXT,                                 -- Technical specs, drawings, grade requirements

    -- BOQ Document Metadata & Private Cloud Storage References
    -- Stores structured JSON array: [{"name": "BOQ-Road-Surfacing.xlsx", "size": "2.4 MB", "type": "application/vnd.ms-excel", "storage_path": "boq/2026/...", "bucket": "oranex-boq-documents"}]
    documents JSONB DEFAULT '[]'::jsonb,

    -- Commercial & Administrative Management
    status TEXT DEFAULT 'NEW',                  -- 'NEW', 'IN_REVIEW', 'QUOTED', 'SAMPLE_SENT', 'PO_ISSUED', 'DISQUALIFIED'
    priority TEXT DEFAULT 'MEDIUM',             -- 'LOW', 'MEDIUM', 'HIGH', 'URGENT'
    assigned_to TEXT DEFAULT 'Eng. Petros Abebe Mengesha',
    qualification_status TEXT DEFAULT 'UNQUALIFIED', -- 'UNQUALIFIED', 'MARKETING_QUALIFIED', 'SALES_QUALIFIED'
    qualification_notes TEXT,
    estimated_deal_value_etb NUMERIC(15, 2),
    estimated_deal_value_usd NUMERIC(15, 2),

    -- Marketing Attribution
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_oranex_leads_created_at ON public.oranex_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_oranex_leads_company ON public.oranex_leads(company);
CREATE INDEX IF NOT EXISTS idx_oranex_leads_status ON public.oranex_leads(status);
CREATE INDEX IF NOT EXISTS idx_oranex_leads_priority ON public.oranex_leads(priority);
CREATE INDEX IF NOT EXISTS idx_oranex_leads_product ON public.oranex_leads(product_or_category);
CREATE INDEX IF NOT EXISTS idx_oranex_leads_email ON public.oranex_leads(email);
CREATE INDEX IF NOT EXISTS idx_oranex_leads_phone ON public.oranex_leads(phone);

-- 3. Row Level Security (RLS) Configuration
ALTER TABLE public.oranex_leads ENABLE ROW LEVEL SECURITY;

-- Policy A: Allow public web inquiry insertions from the website
CREATE POLICY "Allow public web inquiry insertions"
    ON public.oranex_leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Policy B: Restrict viewing, updating and deleting customer enquiries STRICTLY to service_role
-- CRITICAL SECURITY RULE: Prevents competitors or unauthenticated public visitors from viewing customer records!
CREATE POLICY "Restrict lead reading strictly to service role"
    ON public.oranex_leads
    FOR SELECT
    TO service_role
    USING (true);

CREATE POLICY "Restrict lead updates strictly to service role"
    ON public.oranex_leads
    FOR UPDATE
    TO service_role
    USING (true);

CREATE POLICY "Restrict lead deletions strictly to service role"
    ON public.oranex_leads
    FOR DELETE
    TO service_role
    USING (true);

-- 4. Trigger to automatically update updated_at on record change
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_oranex_leads_updated_at ON public.oranex_leads;
CREATE TRIGGER trigger_oranex_leads_updated_at
    BEFORE UPDATE ON public.oranex_leads
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 5. Private Document Storage Configuration Reference
-- In Supabase -> Storage:
-- 1. Bucket Name: 'oranex-boq-documents'
-- 2. Public Bucket: False (PRIVATE)
-- 3. Allowed MIME types: application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/*
-- 4. Max file size: 52428800 (50MB)
