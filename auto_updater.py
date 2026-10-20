#!/usr/bin/env python3
"""
Auto Project Tracker & README Aura Enhancer
Automatically syncs Gourab's latest GitHub project uploads into README.md
"""

import json
import os
import re
import sys
import urllib.request
from datetime import datetime, timezone, timedelta

USERNAME = "gourab354"
README_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "README.md")

# Custom smart descriptions for known repos if GitHub description is empty
REPO_INTEL = {
    "drone-gesture": "AI Vision-based gesture recognition & teleoperation pipeline for aerial drones",
    "virtual-steering-wheel": "Computer Vision virtual steering wheel & hand telemetry controller using OpenCV",
    "4legged-crawler": "Quadruped robotic crawler architecture with kinematics & embedded C++ control",
    "orbit-eye": "High-precision sensor tracking and vision telemetry system in C++",
    "heart-cv": "Real-time biomedical computer vision & physiological pulse / cardiac analysis",
    "check-mate": "Interactive digital chess platform with intelligent game engine logic",
    "portfolio": "Production-grade portfolio web application showcasing hardware & AI systems",
    "build-club-aot-site": "Official community platform & tech portal for Build Club AOT",
    "build-club-smart-attendance-system": "Face-recognition powered smart biometric attendance tracking system",
    "raspberrypi-openclaw": "Embedded robotic arm manipulation system using Raspberry Pi GPIO & servo PWM",
    "Null-Zone": "Web-based interactive sandbox and algorithmic simulation lab"
}

# Language badge configurations for ultra-slick styling
LANG_BADGES = {
    "Python": ("Python", "3776AB", "python"),
    "C++": ("C++", "00599C", "c%2B%2B"),
    "C": ("C", "A8B9CC", "c"),
    "TypeScript": ("TypeScript", "3178C6", "typescript"),
    "JavaScript": ("JavaScript", "F7DF1E", "javascript"),
    "HTML": ("HTML5", "E34F26", "html5"),
    "Arduino": ("Arduino", "00979D", "arduino"),
    "Rust": ("Rust", "DEA584", "rust"),
}

def get_language_badge(lang):
    if not lang:
        return "`Embedded/Hardware`"
    if lang in LANG_BADGES:
        name, color, logo = LANG_BADGES[lang]
        text_color = "black" if color in ["F7DF1E", "DEA584"] else "white"
        return f'<img src="https://img.shields.io/badge/{name}-{color}?style=flat-square&logo={logo}&logoColor={text_color}" alt="{name}"/>'
    return f"`{lang}`"

def fetch_repositories():
    url = f"https://api.github.com/users/{USERNAME}/repos?sort=pushed&per_page=50"
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": f"AuraTracker/{USERNAME}"
    }
    
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_PAT")
    if token:
        headers["Authorization"] = f"token {token}"
        
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            if response.status == 200:
                data = json.loads(response.read().decode("utf-8"))
                return data
    except Exception as e:
        print(f"Warning: Failed to fetch repos via API: {e}")
        return []
    return []

def format_relative_date(date_str):
    try:
        dt = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
        return dt.strftime("%b %Y")
    except Exception:
        return date_str[:10] if date_str else "Recent"

def generate_projects_markdown(repos):
    # Filter out profile repo and forks
    valid_repos = [r for r in repos if not r.get("fork") and r.get("name") != USERNAME]
    
    # Sort primarily by most recently pushed/updated
    valid_repos.sort(key=lambda x: x.get("pushed_at") or x.get("updated_at") or "", reverse=True)
    
    # Top 6 showcased projects
    showcase_repos = valid_repos[:6]
    
    # Calculate IST time
    ist_now = datetime.now(timezone.utc) + timedelta(hours=5, minutes=30)
    synced_time = ist_now.strftime("%d %b %Y | %I:%M %p IST")
    
    lines = []
    lines.append('<div align="center">\n')
    lines.append('| 🚀 Project | 📝 Highlights & Architecture | 🛠️ Tech Stack | 📅 Uploaded |')
    lines.append('| :--- | :--- | :---: | :---: |')
    
    for r in showcase_repos:
        name = r.get("name")
        html_url = r.get("html_url")
        desc = r.get("description") or REPO_INTEL.get(name, "Next-generation engineering and software system")
        # Sanitize pipe symbols in description
        desc = desc.replace("|", "/")
        lang = r.get("language")
        lang_badge = get_language_badge(lang)
        pushed_at = r.get("pushed_at") or r.get("updated_at")
        date_formatted = format_relative_date(pushed_at)
        
        row = f'| **[{name}]({html_url})** | {desc} | {lang_badge} | `{date_formatted}` |'
        lines.append(row)
        
    lines.append('\n</div>\n')
    
    # Telemetry HUD
    total_repos = len(valid_repos)
    lines.append(f'<p align="right"><sub>⚡ <i>Auto-tracked <b>{total_repos} repositories</b> · Last synced: <code>{synced_time}</code></i></sub></p>')
    
    return "\n".join(lines)

def update_readme():
    print(f"[*] Querying latest project uploads for '{USERNAME}'...")
    repos = fetch_repositories()
    if not repos:
        print("[!] No repositories returned. Skipping update.")
        return False
        
    projects_md = generate_projects_markdown(repos)
    
    if not os.path.exists(README_PATH):
        print(f"[!] README.md not found at {README_PATH}")
        return False
        
    with open(README_PATH, "r", encoding="utf-8") as f:
        content = f.read()
        
    start_tag = "<!-- RECENT_PROJECTS:START -->"
    end_tag = "<!-- RECENT_PROJECTS:END -->"
    
    pattern = rf"({re.escape(start_tag)})(.*?)({re.escape(end_tag)})"
    if not re.search(pattern, content, re.DOTALL):
        print("[!] Target markers not found in README.md")
        return False
        
    replacement = rf"\1\n{projects_md}\n\3"
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    if new_content == content:
        print("[*] README.md is already up to date with the latest projects.")
        return False
        
    with open(README_PATH, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print("[+] Successfully updated README.md with latest project uploads!")
    return True

if __name__ == "__main__":
    update_readme()
