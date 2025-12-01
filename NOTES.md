Final Project Scope: Advanced CV Builder

Objective:
Develop a sophisticated, fully-featured CV builder that allows users to create professional, stylish CVs in a secure, controlled environment. The system should provide multiple templates, rich customization, dynamic sections, color schemes, seamless PDF downloads, and a local/optional backend activation system.

1. Design & UI/UX Vision

Style: Creative & bold, modern asymmetric layouts

Colors: Vibrant emerald green primary, coral accents, warm amber highlights; additional 8 presets + custom hex selection

Typography: Poppins for headings, Inter for body text

Animations: Smooth transitions, hover effects, subtle floating elements

Layout: Card-based sections, gradient overlays, responsive for desktop, tablet, and mobile

2. Core Features
2.1 CV Builder Interface

Single-page web application (SPA)

Real-time preview of CV as users edit

Add, edit, remove, and duplicate sections and entries

Dynamic section titles (e.g., rename "References" to "Referees")

Ability to add custom sections with rich text content

Template switching: Modern Professional (timeline) & Creative Bold (sidebar with skill bars)

2.2 CV Sections

Default Sections:

Personal Info

Experience

Education

Skills

Enhanced Sections:

Publications

Awards & Certifications

Volunteering & Leadership

Hobbies & Interests

References (renameable)

Custom Sections (fully user-defined)

Section Functionalities:

Add/remove entries dynamically

Duplicate sections or entries for flexible CV creation

Rich text support: bullets (•/-), bold, italic, line breaks, page breaks ([PAGE_BREAK])

3. Color Customization

Color Picker Component:

Preset palettes (8 professional options)

Custom hex input for primary, secondary, and accent colors

Live preview of changes in templates

Example Color Presets:

Name	Primary	Secondary	Accent
Emerald Pro	#059669	#0d9488	#f97316
Navy Classic	#1e3a5f	#2563eb	#fbbf24
Burgundy	#7f1d1d	#dc2626	#f59e0b
Forest	#14532d	#15803d	#84cc16
Slate Modern	#334155	#64748b	#06b6d4
Purple Reign	#581c87	#7c3aed	#ec4899
Ocean Blue	#0c4a6e	#0284c7	#22d3ee
Charcoal	#1f2937	#4b5563	#f59e0b
4. PDF Export & Download

Direct PDF download button (no print dialog)

Optimized for A4 size (210mm x 297mm)

Slim margins (10mm all sides)

Preserves:

All sections and dynamic content

Rich text formatting and bullets

Custom colors

Fonts (11pt body, heading sizes scaled appropriately)

Page breaks

5. Authentication & Payment Flow
5.1 Local Authentication

Signup and login stored locally (localStorage)

View-only mode for non-activated users

Account activation after MPESA payment

5.2 Payment & Activation Flow

MPESA instructions displayed to user: send payment to 0798993404 (James Sammy)

User calls admin to provide MPESA code

Admin receives email notification with:

User email

MPESA code

Generated activation code

Admin issues activation code to user

Activation unlocks full edit access and 3 CV downloads

Renewal flow: Users with 0 downloads can pay and reactivate for 3 more downloads

5.3 Backend Activation System

Database Table: activation_codes

Stores user email, MPESA code, activation code, usage status, timestamps

Admin notified automatically via email (jms1kenya@gmail.com
)

Admin can manage activation codes (issue, verify, reset)

6. Data Handling & Persistence

Auto-save all CV data in localStorage

Templates and editor read/write from localStorage

Personal information is included in PDF downloads

Download counters decrement per PDF download and enforce limits

7. Technical Requirements

Framework: React + TypeScript

Rich Text Editor: Supports bullets, bold/italic, line breaks, page breaks

Responsive Design: Works on desktop, tablet, mobile

PDF Generation: Seamless download using HTML-to-PDF (html2pdf.js or equivalent)

Backend: Minimal backend for activation code storage and admin email notifications

Accessibility: Keyboard navigation and screen reader friendly

8. File Structure & Components

New Components:

RichTextEditor.tsx – rich text with formatting

ColorPicker.tsx – color scheme selector

Section Editors:

PublicationsEditor.tsx

AwardsEditor.tsx

VolunteeringEditor.tsx

HobbiesEditor.tsx

ReferencesEditor.tsx (renameable)

CustomSectionEditor.tsx

Files to Update:

cv.ts – data interfaces and color scheme

CVEditor.tsx – main editor with new sections, duplication, and rich text support

Templates: ModernTemplate.tsx, CreativeTemplate.tsx – render all sections with colors

Index.tsx – integrates color picker, template switcher, and localStorage

9. Deliverables

Fully functional SPA CV Builder

Two polished CV templates (Modern & Creative)

Dynamic CV sections with duplication, renaming, and rich text formatting

Color customization panel (presets + custom)

Local storage persistence with auto-save

PDF download with perfect A4 formatting

Local authentication, MPESA payment instruction flow, activation codes, download limits, renewal system

Backend activation system for admin management and email notifications

This final scope reflects all implemented features, enhancements, conversations, and feedback. It can now serve as the authoritative specification for the CV Builder project.







START
  │
  ▼
[Landing Page / CV Builder Home]
  │
  ├─> [View Templates & Preview CV] (Allowed for all users)
  │
  └─> [Signup / Login] 
          │
          ▼
    [Signup Form]
          │
          ▼
  [Enter MPESA Payment Instructions] 
          │
          └─> Show: "Send KSH 500 to 0798993404 (James Sammy) and call for activation"
          │
          ▼
  [Enter MPESA Code] 
          │
          ▼
  [System Sends Email to Admin]
          │
          └─> Admin Receives:
                  - User email
                  - MPESA payment code
                  - Generated activation code
          │
          ▼
  [Admin Calls User → Provides Activation Code]
          │
          ▼
  [User Enters Activation Code]
          │
          ▼
  [Account Activated] 
          │
          ├─> [Full Edit Access] 
          │       │
          │       ▼
          │   [CV Builder Interface]
          │       │
          │       ├─> Add/Edit/Delete Sections
          │       ├─> Duplicate Entries & Sections
          │       ├─> Rename Sections (e.g., References → Referees)
          │       ├─> Add Custom Sections
          │       ├─> Rich Text Editor (Bullets, Bold, Italic, Line/Page Breaks)
          │       └─> Color Customization Panel (Presets + Custom)
          │
          └─> [PDF Download]
                  │
                  ▼
          [A4 PDF Generated]
                  │
                  ▼
          [Downloads Counter Decremented]
                  │
                  ├─> If downloads = 0 → [Renew Payment Flow]
                  │       │
                  │       ▼
                  │   User pays again → admin reactivates → 3 fresh downloads
                  │
                  └─> Else → User continues editing / downloading
                  
END
