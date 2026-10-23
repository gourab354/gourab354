#!/usr/bin/env python3
"""
Autonomous Resume Engine & Self-Upgrading Telemetry
Author: Gourab Dutta (github.com/gourab354)

Features:
- GitHub Auto-Discovery: Scans GitHub repositories to discover new projects & tech.
- Multi-Format Auto-Compiler: Generates ATS-optimized PDF (ReportLab) & DOCX (python-docx).
- Single Source of Truth: Maintains resume_data.json, powering the React web app.
- Self-Healing CI/CD: Automated GitHub Action workflow for scheduled resume evolution.
"""

import os
import sys
import json
import argparse
import subprocess
import urllib.request
from datetime import datetime, timezone, timedelta

# ReportLab for crisp vector PDF generation
try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.platypus import (
        SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
    )
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
    REPORTLAB_AVAILABLE = True
except ImportError:
    REPORTLAB_AVAILABLE = False

# python-docx for ATS DOCX generation
try:
    import docx
    from docx.shared import Inches, Pt, RGBColor
    from docx.enum.text import WD_ALIGN_PARAGRAPH
    DOCX_AVAILABLE = True
except ImportError:
    DOCX_AVAILABLE = False


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "resume_data.json")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
DIST_DIR = os.path.join(BASE_DIR, "dist")
PDF_PATH = os.path.join(PUBLIC_DIR, "Gourab_Dutta_Resume.pdf")
DOCX_PATH = os.path.join(PUBLIC_DIR, "Gourab_Dutta_Resume.docx")

USERNAME = "gourab354"


def load_resume_data():
    if not os.path.exists(DATA_FILE):
        raise FileNotFoundError(f"Missing {DATA_FILE}")
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_resume_data(data):
    data["metadata"]["lastUpdated"] = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"[+] Saved updated resume data to {DATA_FILE}")


def fetch_github_repos():
    """Fetch latest repos for user from GitHub API."""
    url = f"https://api.github.com/users/{USERNAME}/repos?sort=pushed&per_page=100"
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": f"ResumeUpgrader/{USERNAME}"
    }
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_PAT")
    if token:
        headers["Authorization"] = f"token {token}"

    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            if res.status == 200:
                return json.loads(res.read().decode("utf-8"))
    except Exception as e:
        print(f"[!] GitHub API warning: {e}")
    return []


def sync_github_into_resume():
    """Discovers new repositories and updates the resume data intelligently."""
    print(f"[*] Syncing GitHub telemetry for {USERNAME}...")
    data = load_resume_data()
    repos = fetch_github_repos()
    if not repos:
        print("[!] No repos returned from GitHub. Using existing resume data.")
        return False

    existing_names = {p["name"].lower() for p in data.get("projects", [])}
    existing_urls = {p.get("repo", "").lower() for p in data.get("projects", [])}

    added_count = 0
    updated_count = 0

    # Sort repos by pushed_at descending
    valid_repos = [
        r for r in repos
        if not r.get("fork")
        and r.get("name") != USERNAME
        and not r.get("archived")
    ]

    for repo in valid_repos:
        name = repo.get("name", "")
        html_url = repo.get("html_url", "")
        desc = repo.get("description") or ""
        lang = repo.get("language")
        topics = repo.get("topics", [])

        # Check if already in projects
        matched_proj = None
        for p in data["projects"]:
            if p["name"].lower() == name.lower() or p.get("repo", "").lower() == html_url.lower():
                matched_proj = p
                break

        if matched_proj:
            # Refresh tech tags if new languages or topics exist
            techs = set(matched_proj.get("tech", []))
            if lang and lang not in techs:
                techs.add(lang)
            for t in topics:
                if len(t) < 15 and t.lower() not in [x.lower() for x in techs]:
                    techs.add(t.capitalize())
            matched_proj["tech"] = list(techs)
            updated_count += 1
        else:
            # If repo has meaningful description or stars/topics, consider adding
            if desc and len(desc) > 15:
                tech_list = []
                if lang:
                    tech_list.append(lang)
                for t in topics[:3]:
                    tech_list.append(t.capitalize())

                new_proj = {
                    "name": name.replace("-", " ").title(),
                    "tech": tech_list if tech_list else ["Embedded/Hardware"],
                    "repo": html_url,
                    "demo": repo.get("homepage") or "",
                    "highlights": [
                        desc,
                        f"Autonomous open-source implementation with continuous GitHub telemetry."
                    ]
                }
                data["projects"].append(new_proj)
                added_count += 1
                print(f"[+] Added new project from GitHub: {name}")

    if added_count > 0 or updated_count > 0:
        save_resume_data(data)
        print(f"[OK] GitHub sync completed: {added_count} added, {updated_count} refreshed.")
        return True
    else:
        print("[*] All resume projects are already up-to-date with GitHub.")
        return False


def generate_pdf():
    """Generates an ATS-compliant, ultra-clean vector PDF using ReportLab."""
    if not REPORTLAB_AVAILABLE:
        print("[!] reportlab is not installed. Skipping PDF build.")
        return False

    os.makedirs(PUBLIC_DIR, exist_ok=True)
    data = load_resume_data()
    basics = data.get("basics", {})

    doc = SimpleDocTemplate(
        PDF_PATH,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    name_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0f172a'),
        alignment=TA_LEFT,
        spaceAfter=2
    )

    contact_style = ParagraphStyle(
        'ContactInfo',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155'),
        alignment=TA_LEFT,
        spaceAfter=10
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#0284c7'),
        spaceBefore=10,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#1e293b'),
        alignment=TA_LEFT,
        spaceAfter=4
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=12.5,
        textColor=colors.HexColor('#334155'),
        leftIndent=12,
        firstLineIndent=-10,
        spaceAfter=3
    )

    bold_item_title = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#0f172a')
    )

    meta_style = ParagraphStyle(
        'ItemMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#64748b'),
        alignment=TA_RIGHT
    )

    story = []

    # 1. Header
    story.append(Paragraph(basics.get("name", "Gourab Dutta"), name_style))
    contact_parts = [
        basics.get("location", "Howrah, West Bengal, India"),
        f'<a href="mailto:{basics.get("email")}">{basics.get("email")}</a>',
        f'<a href="{basics.get("website")}">{basics.get("website", "").replace("https://", "")}</a>',
        f'<a href="{basics.get("github")}">{basics.get("github", "").replace("https://", "")}</a>',
        f'<a href="{basics.get("linkedin")}">{basics.get("linkedin", "").replace("https://", "")}</a>'
    ]
    contact_str = " | ".join(contact_parts)
    story.append(Paragraph(contact_str, contact_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceBefore=2, spaceAfter=8))

    # 2. Summary
    story.append(Paragraph("Summary", section_heading))
    story.append(Paragraph(basics.get("summary", ""), body_style))
    story.append(Spacer(1, 4))

    # 3. Education
    story.append(Paragraph("Education", section_heading))
    for edu in data.get("education", []):
        edu_text = f"<b>{edu['degree']}</b>, {edu['institution']} | {edu['period']}"
        story.append(Paragraph(edu_text, body_style))
    story.append(Spacer(1, 4))

    # 4. Experience
    story.append(Paragraph("Experience", section_heading))
    for exp in data.get("experience", []):
        exp_header = f"<b>{exp['role']}</b>, {exp['company']} | ({exp['period']})"
        story.append(Paragraph(exp_header, bold_item_title))
        for h in exp.get("highlights", []):
            story.append(Paragraph(f"• {h}", bullet_style))
        story.append(Spacer(1, 2))

    # 5. Projects
    story.append(Paragraph("Projects", section_heading))
    for proj in data.get("projects", []):
        tech_badge = f"<font color='#0284c7'>[{', '.join(proj.get('tech', []))}]</font>"
        header_text = f"<b>{proj['name']}</b> | {tech_badge}"
        story.append(Paragraph(header_text, bold_item_title))
        for h in proj.get("highlights", []):
            story.append(Paragraph(f"• {h}", bullet_style))
        story.append(Spacer(1, 2))

    # 6. Achievements
    story.append(Paragraph("Achievements", section_heading))
    for ach in data.get("achievements", []):
        story.append(Paragraph(f"• <b>{ach}</b>", bullet_style))
    story.append(Spacer(1, 4))

    # 7. Technical Skills
    story.append(Paragraph("Technical Skills", section_heading))
    for category, skills in data.get("skills", {}).items():
        skills_str = f"<b>{category}:</b> {', '.join(skills)}"
        story.append(Paragraph(skills_str, body_style))

    # Build Document
    doc.build(story)
    print(f"[+] Successfully generated PDF: {PDF_PATH}")

    # Copy to dist if exists
    if os.path.exists(DIST_DIR):
        dist_pdf = os.path.join(DIST_DIR, "Gourab_Dutta_Resume.pdf")
        with open(PDF_PATH, "rb") as src, open(dist_pdf, "wb") as dst:
            dst.write(src.read())
        print(f"[+] Synced PDF to {dist_pdf}")

    return True


def generate_docx():
    """Generates an ATS-compliant, neatly styled Word document."""
    if not DOCX_AVAILABLE:
        print("[!] python-docx is not installed. Skipping DOCX build.")
        return False

    os.makedirs(PUBLIC_DIR, exist_ok=True)
    data = load_resume_data()
    basics = data.get("basics", {})

    doc = docx.Document()

    # Set 0.5 in margins
    for section in doc.sections:
        section.top_margin = Inches(0.5)
        section.bottom_margin = Inches(0.5)
        section.left_margin = Inches(0.6)
        section.right_margin = Inches(0.6)

    # Name Title
    title = doc.add_paragraph()
    run = title.add_run(basics.get("name", "Gourab Dutta"))
    run.font.name = "Calibri"
    run.font.size = Pt(22)
    run.font.bold = True
    run.font.color.rgb = RGBColor(15, 23, 42)
    title.paragraph_format.space_after = Pt(2)

    # Contact Info
    contact = doc.add_paragraph()
    contact_text = (
        f"{basics.get('location')} | {basics.get('email')} | "
        f"{basics.get('website', '').replace('https://', '')} | "
        f"{basics.get('github', '').replace('https://', '')} | "
        f"{basics.get('linkedin', '').replace('https://', '')}"
    )
    c_run = contact.add_run(contact_text)
    c_run.font.name = "Calibri"
    c_run.font.size = Pt(9.5)
    c_run.font.color.rgb = RGBColor(71, 85, 105)
    contact.paragraph_format.space_after = Pt(8)

    def add_heading(text):
        h = doc.add_paragraph()
        r = h.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(13)
        r.font.bold = True
        r.font.color.rgb = RGBColor(2, 132, 199)
        h.paragraph_format.space_before = Pt(8)
        h.paragraph_format.space_after = Pt(2)

    # Summary
    add_heading("Summary")
    p = doc.add_paragraph()
    r = p.add_run(basics.get("summary", ""))
    r.font.name = "Calibri"
    r.font.size = Pt(10)
    p.paragraph_format.space_after = Pt(4)

    # Education
    add_heading("Education")
    for edu in data.get("education", []):
        p = doc.add_paragraph()
        r1 = p.add_run(edu['degree'])
        r1.font.bold = True
        r2 = p.add_run(f", {edu['institution']} | {edu['period']}")
        for r in [r1, r2]:
            r.font.name = "Calibri"
            r.font.size = Pt(10)
        p.paragraph_format.space_after = Pt(3)

    # Experience
    add_heading("Experience")
    for exp in data.get("experience", []):
        p = doc.add_paragraph()
        r1 = p.add_run(exp['role'])
        r1.font.bold = True
        r2 = p.add_run(f", {exp['company']} | ({exp['period']})")
        for r in [r1, r2]:
            r.font.name = "Calibri"
            r.font.size = Pt(10)
        p.paragraph_format.space_after = Pt(1)
        for h in exp.get("highlights", []):
            bp = doc.add_paragraph(style='List Bullet')
            br = bp.add_run(h)
            br.font.name = "Calibri"
            br.font.size = Pt(9.5)
            bp.paragraph_format.space_after = Pt(1)

    # Projects
    add_heading("Projects")
    for proj in data.get("projects", []):
        p = doc.add_paragraph()
        r1 = p.add_run(proj['name'])
        r1.font.bold = True
        techs = ", ".join(proj.get('tech', []))
        r2 = p.add_run(f" | {techs}")
        r2.font.color.rgb = RGBColor(2, 132, 199)
        for r in [r1, r2]:
            r.font.name = "Calibri"
            r.font.size = Pt(10)
        p.paragraph_format.space_after = Pt(1)
        for h in proj.get("highlights", []):
            bp = doc.add_paragraph(style='List Bullet')
            br = bp.add_run(h)
            br.font.name = "Calibri"
            br.font.size = Pt(9.5)
            bp.paragraph_format.space_after = Pt(1)

    # Achievements
    add_heading("Achievements")
    for ach in data.get("achievements", []):
        bp = doc.add_paragraph(style='List Bullet')
        br = bp.add_run(ach)
        br.font.name = "Calibri"
        br.font.size = Pt(9.5)
        bp.paragraph_format.space_after = Pt(1)

    # Technical Skills
    add_heading("Technical Skills")
    for cat, skills in data.get("skills", {}).items():
        p = doc.add_paragraph()
        r1 = p.add_run(f"{cat}: ")
        r1.font.bold = True
        r2 = p.add_run(", ".join(skills))
        for r in [r1, r2]:
            r.font.name = "Calibri"
            r.font.size = Pt(10)
        p.paragraph_format.space_after = Pt(2)

    doc.save(DOCX_PATH)
    print(f"[+] Successfully generated DOCX: {DOCX_PATH}")

    # Copy to dist if exists
    if os.path.exists(DIST_DIR):
        dist_docx = os.path.join(DIST_DIR, "Gourab_Dutta_Resume.docx")
        with open(DOCX_PATH, "rb") as src, open(dist_docx, "wb") as dst:
            dst.write(src.read())
        print(f"[+] Synced DOCX to {dist_docx}")

    return True


def auto_commit_changes(message="[Auto-Resume] Upgrade resume telemetry and documentation [skip ci]"):
    """Optionally commits and pushes changes."""
    try:
        subprocess.run(["git", "add", DATA_FILE, PDF_PATH, DOCX_PATH], check=True)
        status = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True)
        if status.stdout.strip():
            subprocess.run(["git", "commit", "-m", message], check=True)
            print("[+] Successfully committed resume updates to git.")
        else:
            print("[*] No git changes detected.")
    except Exception as e:
        print(f"[!] Git commit skipped: {e}")


def main():
    parser = argparse.ArgumentParser(description="Autonomous Resume Upgrader & Compiler")
    parser.add_argument("--sync", action="store_true", help="Sync latest projects from GitHub")
    parser.add_argument("--generate", action="store_true", help="Generate PDF and DOCX files")
    parser.add_argument("--commit", action="store_true", help="Commit changes to git")
    parser.add_argument("--all", action="store_true", help="Sync, generate, and commit")

    args = parser.parse_args()

    # Default if no arguments: generate PDF and DOCX
    if not (args.sync or args.generate or args.commit or args.all):
        args.generate = True

    if args.all or args.sync:
        sync_github_into_resume()

    if args.all or args.generate:
        generate_pdf()
        generate_docx()

    if args.all or args.commit:
        auto_commit_changes()

    print("\n[SUCCESS] Resume System Upgraded and Assets Generated Successfully!")


if __name__ == "__main__":
    main()
