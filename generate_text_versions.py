#!/usr/bin/env python3
"""
Generate clean, copy-paste-ready, textarea-compliant plain text files for NESFIC 2026:
1. NESFIC_D27_Proposal_Ron_Hatibaruah.txt (Field-by-field copy-paste textarea blocks)
2. NESFIC_D27_Proof_of_Work_Ron_Hatibaruah.txt (Full and modular copy-paste textarea blocks)
"""

import os
import re

base_dir = os.path.dirname(os.path.abspath(__file__))

def clean_text_for_textarea(text):
    """
    Strips raw markdown syntax, converts formulas to plain text,
    standardizes bullets and whitespace for HTML <textarea> compatibility.
    """
    t = text
    lines = t.split('\n')
    cleaned_lines = []
    
    for line in lines:
        stripped = line.strip()
        # Detect table separator
        if re.match(r'^\|?[\s\-:|]+\|?$', stripped):
            continue
        if stripped.startswith('|') and stripped.endswith('|'):
            cells = [c.strip() for c in stripped.strip('|').split('|')]
            clean_cells = [re.sub(r'[*`_]', '', c) for c in cells]
            cleaned_lines.append('  • ' + ' | '.join(clean_cells))
            continue
        cleaned_lines.append(line)
        
    t = '\n'.join(cleaned_lines)
    
    # Strip markdown headers (##, ###)
    t = re.sub(r'^#{1,6}\s+(.*?)$', r'\1', t, flags=re.MULTILINE)
    
    # Strip bold and italics
    t = re.sub(r'\*\*\*(.*?)\*\*\*', r'\1', t)
    t = re.sub(r'\*\*(.*?)\*\*', r'\1', t)
    t = re.sub(r'\*(.*?)\*', r'\1', t)
    t = re.sub(r'`(.*?)`', r'\1', t)
    
    # Convert markdown links [Label](url) -> Label: url
    t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'\1 (\2)', t)
    
    # Clean latex math
    t = re.sub(r'\$([^$]+)\$', r'\1', t)
    
    # Standardize bullet points
    t = re.sub(r'^[ \t]*[-*]\s+', '• ', t, flags=re.MULTILINE)
    
    # Convert comparison symbols to plain English words for textarea safety
    t = re.sub(r'≥', 'greater than or equal to ', t)
    t = re.sub(r'≤', 'smaller than or equal to ', t)
    t = re.sub(r'>=', 'greater than or equal to ', t)
    t = re.sub(r'<=', 'smaller than or equal to ', t)
    t = re.sub(r'>\s*', 'greater than ', t)
    t = re.sub(r'<\s*', 'smaller than ', t)
    
    # Clean excessive empty lines
    t = re.sub(r'\n{3,}', '\n\n', t)
    return t.strip()

def generate_proposal_text():
    src_file = os.path.join(base_dir, 'proposal_contents.md')
    out_file = os.path.join(base_dir, 'NESFIC_D27_Proposal_Ron_Hatibaruah.txt')
    
    with open(src_file, 'r', encoding='utf-8') as f:
        raw = f.read()
        
    # Split by Field headers
    parts = re.split(r'##\s+Field\s+(\d+):\s+(.*?)\n', raw)
    
    header = "=" * 80 + "\n"
    header += "NESFIC 2026 - STREAM 1 (GOVERNMENT TRACK) - OFFICIAL PROPOSAL SUBMISSION\n"
    header += "Problem Statement ID: NESFIC-D-27: Earlier Identification of Congenital Deformities for Timely Care\n"
    header += "Sponsoring Department: National Health Mission & Health & Family Welfare Dept, Govt of Assam\n"
    header += "Applicant / Innovator: Ron Hatibaruah\n"
    header += "Proposed Solution: ShishuDrishti (শিশু দৃষ্টি) — Assam Congenital Sentinel & Early Care Network\n"
    header += "Live Working Prototype: https://shishu-drishti.pages.dev/\n"
    header += "GitHub Repository: https://github.com/RonHatibaruah/shishu-drishti-assam\n"
    header += "=" * 80 + "\n\n"
    header += "INSTRUCTIONS FOR APPLICANT:\n"
    header += "Each section below corresponds exactly to an official online form field on the\n"
    header += "Assam Startup NESFIC application portal. Copy and paste the text block under each field header.\n\n"
    
    body = ""
    # parts[0] is intro text before Field 1
    intro_clean = clean_text_for_textarea(parts[0])
    body += "--- GENERAL METADATA ---\n" + intro_clean + "\n\n"
    
    # Loop over fields
    i = 1
    while i < len(parts):
        field_num = parts[i]
        field_title = parts[i+1].strip()
        field_content = parts[i+2]
        
        # Extract word count notice if present
        wc_match = re.search(r'\*(.*?Word Count.*?)\*', field_content)
        wc_note = wc_match.group(1) if wc_match else ""
        
        cleaned_content = clean_text_for_textarea(field_content)
        cleaned_content = re.sub(r'\(Word Count:.*?\)', '', cleaned_content).strip()
        
        words = len(cleaned_content.split())
        
        body += "=" * 80 + "\n"
        body += f"FIELD {field_num}: {field_title.upper()}\n"
        if wc_note:
            body += f"Portal Requirement Note: {wc_note}\n"
        body += f"Actual Plain Text Word Count: {words} words\n"
        body += "=" * 80 + "\n"
        body += "[BEGIN COPY-PASTE FOR THIS TEXTAREA]\n\n"
        body += cleaned_content + "\n\n"
        body += "[END COPY-PASTE FOR THIS TEXTAREA]\n\n\n"
        
        i += 3
        
    full_output = header + body
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(full_output)
        
    print(f"Generated text version: {out_file} ({len(full_output)} bytes)")

def generate_pow_text():
    src_file = os.path.join(base_dir, 'proof_of_work_dossier.md')
    out_file = os.path.join(base_dir, 'NESFIC_D27_Proof_of_Work_Ron_Hatibaruah.txt')
    
    with open(src_file, 'r', encoding='utf-8') as f:
        raw = f.read()
        
    header = "=" * 80 + "\n"
    header += "NESFIC 2026 - STREAM 1 - PROOF OF WORK & TECHNICAL EVIDENCE DOSSIER\n"
    header += "Problem Statement ID: NESFIC-D-27: Earlier Identification of Congenital Deformities for Timely Care\n"
    header += "Sponsoring Department: National Health Mission & Health & Family Welfare Dept, Govt of Assam\n"
    header += "Applicant / Innovator: Ron Hatibaruah\n"
    header += "Solution: ShishuDrishti (Assam Congenital Sentinel)\n"
    header += "Live Prototype: https://shishu-drishti.pages.dev/\n"
    header += "GitHub Repository: https://github.com/RonHatibaruah/shishu-drishti-assam\n"
    header += "=" * 80 + "\n\n"
    
    cleaned = clean_text_for_textarea(raw)
    full_output = header + cleaned
    
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(full_output)
        
    print(f"Generated text version: {out_file} ({len(full_output)} bytes)")

if __name__ == '__main__':
    generate_proposal_text()
    generate_pow_text()
