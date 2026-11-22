import os
import re
from xml.sax.saxutils import escape
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable, Image
)
from reportlab.pdfgen import canvas

base_dir = os.path.dirname(os.path.abspath(__file__))
img_dir = os.path.join(base_dir, 'assets', 'proposal_images')

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages after page 1)
        if self._pageNumber > 1:
            self.drawString(54, letter[1] - 36, "Government of Assam • National Health Mission & Health & Family Welfare Dept • NESFIC-D-27")
            self.drawRightString(letter[0] - 54, letter[1] - 36, "ShishuDrishti (Assam Congenital Sentinel) — Ron Hatibaruah")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(54, letter[1] - 42, letter[0] - 54, letter[1] - 42)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 45, letter[0] - 54, 45)
        self.drawString(54, 32, "NESFIC 2026 Proposal • Problem NESFIC-D-27 • Applicant: Ron Hatibaruah")
        self.drawRightString(letter[0] - 54, 32, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def clean_inline_markdown(text):
    if not text:
        return ""
    t = text.strip()
    
    code_matches = []
    def save_code(m):
        code_matches.append(m.group(1))
        return f"__CODE_PH_{len(code_matches)-1}__"
    t = re.sub(r'`([^`]+)`', save_code, t)

    t = re.sub(r'\*{3,}', '***', t)

    # Unicode cleanup for Helvetica
    t = t.replace('₹', 'Rs. ')
    t = t.replace('শিশু দৃষ্টি', 'ShishuDrishti').replace('নিশ্চয় দৃষ্টি', 'ShishuDrishti')
    t = t.replace('–', '-').replace('—', ' - ')
    t = t.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    t = t.replace('➔', '->').replace('•', '*').replace('✓', '[X]')

    # LaTeX Math Cleanup
    t = re.sub(r'\\left\s*\(', '(', t)
    t = re.sub(r'\\right\s*\)', ')', t)
    t = re.sub(r'\\text\{([^}]+)\}', r'\1', t)
    t = t.replace(r'\%', '%').replace(r'\_', '_').replace(r'\&', '&')
    t = t.replace(r'\times', '&times;').replace(r'\approx', '≈')
    t = re.sub(r'\$([^\$]+)\$', r'<b>\1</b>', t)
    t = t.replace('$', '')

    # Bold & Italic markdown
    t = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'(?<!\*)\*([a-zA-Z0-9][^\*]*?)\*(?!\*)', r'<i>\1</i>', t)

    # Restore code blocks
    for idx, cb in enumerate(code_matches):
        t = t.replace(f"__CODE_PH_{idx}__", f"<b>{escape(cb)}</b>")

    return t

def safe_paragraph(text, style):
    clean = clean_inline_markdown(text)
    try:
        return Paragraph(clean, style)
    except Exception:
        clean = escape(re.sub(r'<[^>]+>', '', clean))
        return Paragraph(clean, style)

def create_styled_table(data_rows, col_widths=None, available_width=490):
    if not data_rows:
        return None
    num_cols = len(data_rows[0])
    if not col_widths:
        w = available_width / float(num_cols)
        col_widths = [w] * num_cols

    styles = getSampleStyleSheet()
    th_style = ParagraphStyle(
        'THStyle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7.5, leading=10,
        textColor=colors.HexColor('#ffffff')
    )
    td_style = ParagraphStyle(
        'TDStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=7.2, leading=9.5,
        textColor=colors.HexColor('#1e293b')
    )

    formatted_data = []
    for r_idx, row in enumerate(data_rows):
        formatted_row = []
        is_header = (r_idx == 0)
        curr_style = th_style if is_header else td_style
        for c_idx, cell in enumerate(row):
            formatted_row.append(safe_paragraph(cell, curr_style))
        formatted_data.append(formatted_row)

    t = Table(formatted_data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#065f46')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#ffffff'), colors.HexColor('#f8fafc')])
    ]))
    return t

def parse_markdown_content(lines, available_width=490):
    styles = getSampleStyleSheet()
    
    h3_style = ParagraphStyle(
        'H3Style', parent=styles['Heading3'], fontName='Helvetica-Bold', fontSize=9, leading=12,
        textColor=colors.HexColor('#0f766e'), spaceBefore=6, spaceAfter=2, keepWithNext=True
    )
    body_style = ParagraphStyle(
        'BodyDark', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11,
        textColor=colors.HexColor('#1e293b'), spaceAfter=4
    )
    bullet_style = ParagraphStyle(
        'BulletText', parent=styles['Normal'], fontName='Helvetica', fontSize=7.8, leading=10.5,
        textColor=colors.HexColor('#1e293b'), leftIndent=12, firstLineIndent=-8, spaceAfter=2
    )
    code_style = ParagraphStyle(
        'CodeStyle', parent=styles['Code'], fontName='Courier', fontSize=6.8, leading=8.5,
        textColor=colors.HexColor('#0f172a')
    )
    quote_style = ParagraphStyle(
        'QuoteStyle', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=7.8, leading=10.5,
        textColor=colors.HexColor('#065f46'), leftIndent=12, spaceBefore=4, spaceAfter=4
    )

    flowables = []
    in_code_block = False
    code_buffer = []
    table_buffer = []

    def flush_code():
        if code_buffer:
            code_text = escape('\n'.join(code_buffer))
            code_p = Paragraph(f"<font color='#0f172a'>{code_text.replace(chr(10), '<br/>')}</font>", code_style)
            t = Table([[code_p]], colWidths=[available_width])
            t.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f1f5f9')),
                ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
                ('PADDING', (0,0), (-1,-1), 5),
            ]))
            flowables.append(t)
            flowables.append(Spacer(1, 4))
            code_buffer.clear()

    def flush_table():
        if table_buffer:
            raw_rows = []
            for tline in table_buffer:
                if re.match(r'^\|?[\s\-:|]+\|?$', tline.strip()):
                    continue
                cells = [c.strip() for c in tline.strip().strip('|').split('|')]
                raw_rows.append(cells)
            
            if raw_rows:
                num_cols = len(raw_rows[0])
                t_obj = create_styled_table(raw_rows, available_width=available_width)
                if t_obj:
                    flowables.append(t_obj)
                    flowables.append(Spacer(1, 4))
            table_buffer.clear()

    for line in lines:
        line_str = line.strip()

        if line_str.startswith('```'):
            if in_code_block:
                in_code_block = False
                flush_code()
            else:
                if table_buffer:
                    flush_table()
                in_code_block = True
            continue

        if in_code_block:
            code_buffer.append(line)
            continue

        if line_str.startswith('|') and line_str.endswith('|'):
            table_buffer.append(line_str)
            continue
        elif table_buffer:
            flush_table()

        if not line_str:
            continue

        if line_str.startswith('### '):
            flowables.append(safe_paragraph(line_str[4:], h3_style))
        elif line_str.startswith('#### '):
            flowables.append(safe_paragraph(line_str[5:], h3_style))
        elif line_str.startswith('> '):
            flowables.append(safe_paragraph(line_str[2:], quote_style))
        elif line_str.startswith('• ') or line_str.startswith('* ') or line_str.startswith('- '):
            flowables.append(safe_paragraph("&bull; " + line_str[2:], bullet_style))
        elif re.match(r'^\d+\.\s+', line_str):
            m = re.match(r'^(\d+\.\s+)(.*)$', line_str)
            flowables.append(safe_paragraph(f"<b>{m.group(1)}</b>{m.group(2)}", bullet_style))
        else:
            flowables.append(safe_paragraph(line_str, body_style))

    if table_buffer:
        flush_table()

    return flowables

def build_proposal_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=15, leading=19,
        textColor=colors.HexColor('#065f46'), alignment=0, spaceAfter=2
    )
    subtitle_style = ParagraphStyle(
        'DocSub', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=12.5,
        textColor=colors.HexColor('#0f766e'), spaceAfter=4
    )
    meta_style = ParagraphStyle(
        'MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155')
    )
    h2_style = ParagraphStyle(
        'H2Style', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=14,
        textColor=colors.HexColor('#065f46'), spaceBefore=8, spaceAfter=4, keepWithNext=True
    )

    story = []
    story.append(safe_paragraph("NORTH EAST SEVA FIRST INNOVATION CHALLENGE (NESFIC 2026)", subtitle_style))
    story.append(safe_paragraph("STREAM 1 — GOVERNMENT TRACK • OFFICIAL SOLUTION PROPOSAL", title_style))
    story.append(safe_paragraph("<b>ShishuDrishti (Assam Congenital Sentinel)</b> — AI Congenital Deformity Screening & DEIC Care Network", subtitle_style))

    meta_data = [
        [safe_paragraph("<b>Challenge ID:</b> NESFIC-D-27 (Govt Track)", meta_style), safe_paragraph("<b>Department:</b> NHM & Health & Family Welfare Dept, Govt of Assam", meta_style)],
        [safe_paragraph("<b>Lead Applicant:</b> Ron Hatibaruah", meta_style), safe_paragraph("<b>Application Format:</b> USPR Standard Proposal (PDF)", meta_style)],
        [safe_paragraph("<b>Live Prototype:</b> https://shishu-drishti.pages.dev/", meta_style), safe_paragraph("<b>GitHub:</b> github.com/RonHatibaruah/shishu-drishti-assam", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[240, 264])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdf4')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#86efac')),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 8))

    prop_md = os.path.join(base_dir, 'proposal_contents.md')
    with open(prop_md) as f:
        content = f.read()

    sections = content.split('## ')
    if sections[0].strip():
        story.extend(parse_markdown_content(sections[0].strip().split('\n'), available_width=490))

    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        sec_title = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0f766e'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(sec_title, h2_style))

        if 'Field 1:' in sec_title:
            img = os.path.join(img_dir, 'diagram_1_before_after_workflow.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 2:' in sec_title:
            img = os.path.join(img_dir, 'diagram_3_cadastral_anomaly_catalog.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 3:' in sec_title:
            img = os.path.join(img_dir, 'diagram_5_lat_mandal_mobile_app.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 4:' in sec_title:
            img = os.path.join(img_dir, 'diagram_7_enterprise_system_architecture.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 6:' in sec_title:
            img = os.path.join(img_dir, 'diagram_4_land_health_score_hierarchy.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 10:' in sec_title:
            img = os.path.join(img_dir, 'diagram_2_dual_system_reconciliation.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 11:' in sec_title:
            img = os.path.join(img_dir, 'diagram_6_citizen_land_health_certificate.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated {output_path}")

def build_proof_of_work_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=15, leading=19,
        textColor=colors.HexColor('#065f46'), alignment=0, spaceAfter=2
    )
    subtitle_style = ParagraphStyle(
        'DocSub', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=12.5,
        textColor=colors.HexColor('#0f766e'), spaceAfter=4
    )
    meta_style = ParagraphStyle(
        'MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155')
    )
    h2_style = ParagraphStyle(
        'H2Style', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=14,
        textColor=colors.HexColor('#065f46'), spaceBefore=8, spaceAfter=4, keepWithNext=True
    )

    story = []
    story.append(safe_paragraph("PROOF OF WORK & SOLUTION EVIDENCE DOSSIER", title_style))
    story.append(safe_paragraph("ShishuDrishti (Assam Congenital Sentinel) — AI Early Care Network", subtitle_style))
    story.append(safe_paragraph("<b>Empirical Edge Vision Benchmarks, CCHD Validation & Prototype Architecture</b>", subtitle_style))

    meta_data = [
        [safe_paragraph("<b>Challenge ID:</b> NESFIC-D-27 (Govt Track)", meta_style), safe_paragraph("<b>Department:</b> NHM & Health & Family Welfare Dept, Govt of Assam", meta_style)],
        [safe_paragraph("<b>Lead Applicant:</b> Ron Hatibaruah", meta_style), safe_paragraph("<b>Format:</b> Solution Evidence (PDF < 10 MB)", meta_style)],
        [safe_paragraph("<b>Live Prototype:</b> https://shishu-drishti.pages.dev/", meta_style), safe_paragraph("<b>Verification Status:</b> Fully Built & Benchmarked", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[240, 264])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdf4')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#86efac')),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 8))

    pow_md = os.path.join(base_dir, 'proof_of_work_dossier.md')
    with open(pow_md) as f:
        content = f.read()

    sections = content.split('## ')
    if sections[0].strip():
        story.extend(parse_markdown_content(sections[0].strip().split('\n'), available_width=490))

    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        sec_title = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0f766e'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(sec_title, h2_style))

        if '1. Executive Summary' in sec_title:
            img = os.path.join(img_dir, 'diagram_1_before_after_workflow.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif '2. Machine Learning Model Architecture' in sec_title:
            img = os.path.join(img_dir, 'diagram_3_cadastral_anomaly_catalog.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif '3. Critical Congenital Heart Disease' in sec_title:
            img = os.path.join(img_dir, 'diagram_2_dual_system_reconciliation.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif '4. Closed-Loop DEIC Referral' in sec_title:
            img = os.path.join(img_dir, 'diagram_5_lat_mandal_mobile_app.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif '5. System Latency' in sec_title:
            img = os.path.join(img_dir, 'diagram_6_citizen_land_health_certificate.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif '6. Security, ABDM' in sec_title:
            img = os.path.join(img_dir, 'diagram_7_enterprise_system_architecture.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated {output_path}")

if __name__ == '__main__':
    proposal_pdf = os.path.join(base_dir, 'NESFIC_D27_Proposal_Ron_Hatibaruah.pdf')
    pow_pdf = os.path.join(base_dir, 'NESFIC_D27_Proof_of_Work_Ron_Hatibaruah.pdf')
    
    build_proposal_pdf(proposal_pdf)
    build_proof_of_work_pdf(pow_pdf)
