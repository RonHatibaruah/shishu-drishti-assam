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

def convert_latex_math(text):
    """
    Transforms LaTeX mathematical expressions and formulas into ReportLab-supported
    HTML markup and Unicode typography (subscripts, superscripts, Greek characters, operators).
    """
    if not text:
        return ""
    t = text
    
    # Greek letters
    greek = {
        r'\alpha': '&alpha;', r'\beta': '&beta;', r'\gamma': '&gamma;',
        r'\delta': '&delta;', r'\epsilon': '&epsilon;', r'\theta': '&theta;',
        r'\lambda': '&lambda;', r'\mu': '&mu;', r'\sigma': '&sigma;',
        r'\Delta': '&Delta;', r'\Sigma': '&Sigma;', r'\pi': '&pi;'
    }
    for k, v in greek.items():
        t = t.replace(k, v)
        
    # Math operators and sets
    t = t.replace(r'\in', '&isin;')
    t = t.replace(r'\times', '&times;')
    t = t.replace(r'\approx', '&asymp;')
    t = t.replace(r'\leq', '&le;').replace(r'\le', '&le;')
    t = t.replace(r'\geq', '&ge;').replace(r'\ge', '&ge;')
    t = t.replace(r'\neq', '&ne;')
    t = t.replace(r'\pm', '&plusmn;')
    t = t.replace(r'\mathbb{R}', '<b>R</b>')
    t = t.replace(r'\cdot', '&middot;')
    t = t.replace(r'\infty', '&infin;')
    
    # LaTeX wrappers
    t = re.sub(r'\\text\{([^}]+)\}', r'\1', t)
    t = re.sub(r'\\mathbf\{([^}]+)\}', r'<b>\1</b>', t)
    t = re.sub(r'\\mathit\{([^}]+)\}', r'<i>\1</i>', t)
    t = re.sub(r'\\hat\{([a-zA-Z])\}', r'<i>\1</i>', t)
    
    # Subscripts & Superscripts
    t = re.sub(r'_\{([^}]+)\}', r'<sub>\1</sub>', t)
    t = re.sub(r'_([a-zA-Z0-9]+)', r'<sub>\1</sub>', t)
    t = re.sub(r'\^\{([^}]+)\}', r'<sup>\1</sup>', t)
    t = re.sub(r'\^([a-zA-Z0-9]+)', r'<sup>\1</sup>', t)
    
    # Strip delimiters
    t = t.replace('$$', '')
    t = t.replace('$', '')
    return t.strip()

def clean_inline_markdown(text):
    """
    Cleans markdown syntax to produce well-formed ReportLab Paragraph XML.
    """
    if not text:
        return ""
    t = text.strip()
    
    # Filter out portal character guidance
    if re.match(r'^\*\(Target:\s*0\s*to\s*500\s*words\)\*$', t, flags=re.IGNORECASE):
        return ""
    if re.match(r'^\*\(Word Count:.*?\)\*$', t, flags=re.IGNORECASE):
        return ""

    # Replace asterisks around captions like *(Refer to Figure X: ...)* with styled italic text
    t = re.sub(r'^\*\((Refer to Figure [^)]+)\)\*$', r'<font color="#0f766e"><i>(\1)</i></font>', t)
    t = re.sub(r'\*\((Refer to Figure [^)]+)\)\*', r'<font color="#0f766e"><i>(\1)</i></font>', t)

    # Protect inline code spans
    code_matches = []
    def save_code(m):
        code_matches.append(m.group(1))
        return f"__CODE_PH_{len(code_matches)-1}__"
    t = re.sub(r'`([^`]+)`', save_code, t)

    # Convert inline LaTeX math ($...$)
    def save_math(m):
        return convert_latex_math(m.group(1))
    t = re.sub(r'\$([^\$]+)\$', save_math, t)

    # Unicode & typography cleanup for Helvetica
    t = t.replace('₹', 'Rs. ')
    t = t.replace('শিশু দৃষ্টি', 'ShishuDrishti').replace('নিশ্চয় দৃষ্টি', 'ShishuDrishti')
    t = t.replace('–', '-').replace('—', ' - ')
    t = t.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    t = t.replace('➔', '->').replace('✓', '[X]')

    # Clean markdown bold & italic
    t = re.sub(r'\*\*\*(.*?)\*\*\*', r'<b><i>\1</i></b>', t)
    t = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'(?<!\*)\*([^\*]+?)\*(?!\*)', r'<i>\1</i>', t)
    t = re.sub(r'(?<!_)_([^_]+?)_(?!_)', r'<i>\1</i>', t)

    # Convert markdown links [Label](url)
    t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<font color="#0284c7"><u>\1</u></font>', t)

    # Restore code blocks
    for idx, cb in enumerate(code_matches):
        t = t.replace(f"__CODE_PH_{idx}__", f"<font name='Courier' color='#0f766e'><b>{escape(cb)}</b></font>")

    return t

def safe_paragraph(text, style):
    clean = clean_inline_markdown(text)
    if not clean:
        return None
    try:
        return Paragraph(clean, style)
    except Exception:
        # Fallback XML escape
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
            p = safe_paragraph(cell, curr_style)
            formatted_row.append(p if p else Paragraph("", curr_style))
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
    
    h2_style = ParagraphStyle(
        'H2SubStyle', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=14,
        textColor=colors.HexColor('#065f46'), spaceBefore=8, spaceAfter=4, keepWithNext=True
    )
    h3_style = ParagraphStyle(
        'H3Style', parent=styles['Heading3'], fontName='Helvetica-Bold', fontSize=9, leading=12,
        textColor=colors.HexColor('#0f766e'), spaceBefore=6, spaceAfter=2, keepWithNext=True
    )
    h4_style = ParagraphStyle(
        'H4Style', parent=styles['Heading4'], fontName='Helvetica-Bold', fontSize=8.2, leading=11,
        textColor=colors.HexColor('#0f172a'), spaceBefore=4, spaceAfter=2, keepWithNext=True
    )
    body_style = ParagraphStyle(
        'BodyDark', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11,
        textColor=colors.HexColor('#1e293b'), spaceAfter=4
    )
    bullet_style = ParagraphStyle(
        'BulletText', parent=styles['Normal'], fontName='Helvetica', fontSize=7.8, leading=10.5,
        textColor=colors.HexColor('#1e293b'), leftIndent=12, firstLineIndent=-8, spaceAfter=2
    )
    caption_style = ParagraphStyle(
        'CaptionStyle', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=7.8, leading=10.5,
        textColor=colors.HexColor('#0f766e'), alignment=1, spaceBefore=2, spaceAfter=6
    )
    math_style = ParagraphStyle(
        'MathStyle', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=9.5, leading=13,
        textColor=colors.HexColor('#0f172a'), alignment=1
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
                t_obj = create_styled_table(raw_rows, available_width=available_width)
                if t_obj:
                    flowables.append(t_obj)
                    flowables.append(Spacer(1, 4))
            table_buffer.clear()

    for line in lines:
        line_str = line.strip()

        # Handle code blocks
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

        # Handle tables
        if line_str.startswith('|') and line_str.endswith('|'):
            table_buffer.append(line_str)
            continue
        elif table_buffer:
            flush_table()

        if not line_str:
            continue

        # Mathematical Formula Block ($$...$$)
        if line_str.startswith('$$') and line_str.endswith('$$') and len(line_str) > 4:
            math_content = convert_latex_math(line_str[2:-2])
            math_p = Paragraph(f"<b>{math_content}</b>", math_style)
            t_math = Table([[math_p]], colWidths=[available_width])
            t_math.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
                ('BOX', (0,0), (-1,-1), 0.8, colors.HexColor('#cbd5e1')),
                ('TOPPADDING', (0,0), (-1,-1), 6),
                ('BOTTOMPADDING', (0,0), (-1,-1), 6),
                ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ]))
            flowables.append(Spacer(1, 3))
            flowables.append(t_math)
            flowables.append(Spacer(1, 4))
            continue

        # Horizontal rule
        if line_str in ['---', '***', '___']:
            flowables.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#cbd5e1'), spaceBefore=5, spaceAfter=5))
            continue

        # Figure Caption
        if line_str.startswith('*(Refer to Figure') or line_str.startswith('(Refer to Figure'):
            clean_cap = re.sub(r'[\*]', '', line_str)
            p = safe_paragraph(clean_cap, caption_style)
            if p:
                flowables.append(p)
            continue

        # Headings
        if line_str.startswith('#### '):
            p = safe_paragraph(line_str[5:], h4_style)
            if p: flowables.append(p)
        elif line_str.startswith('### '):
            p = safe_paragraph(line_str[4:], h3_style)
            if p: flowables.append(p)
        elif line_str.startswith('## '):
            p = safe_paragraph(line_str[3:], h3_style)
            if p: flowables.append(p)
        elif line_str.startswith('# '):
            p = safe_paragraph(line_str[2:], h2_style)
            if p: flowables.append(p)
        elif line_str.startswith('> '):
            p = safe_paragraph(line_str[2:], quote_style)
            if p: flowables.append(p)
        elif line_str.startswith('• ') or line_str.startswith('* ') or line_str.startswith('- '):
            clean_item = re.sub(r'^[•\*\-]\s+', '', line_str)
            p = safe_paragraph("&bull; " + clean_item, bullet_style)
            if p: flowables.append(p)
        elif re.match(r'^\d+\.\s+', line_str):
            m = re.match(r'^(\d+\.\s+)(.*)$', line_str)
            p = safe_paragraph(f"<b>{m.group(1)}</b>{m.group(2)}", bullet_style)
            if p: flowables.append(p)
        else:
            p = safe_paragraph(line_str, body_style)
            if p: flowables.append(p)

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

    # Split only on level-2 headers (## ), not sub-headers (### or ####)
    sections = re.split(r'\n##\s+(?!#)', content)
    if sections[0].strip():
        story.extend(parse_markdown_content(sections[0].strip().split('\n'), available_width=490))

    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        sec_title = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0f766e'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(sec_title, h2_style))

        # Map new professional 16:9 figures to proposal fields
        fig_map = {
            'Field 1:': 'fig1_assam_burden_map.jpg',
            'Field 2:': 'fig2_anomaly_detection_matrix.jpg',
            'Field 3:': 'fig3_frontline_mobile_ux.jpg',
            'Field 4:': 'fig4_zero_trust_architecture.jpg',
            'Field 5:': 'fig5_six_phase_development.jpg',
            'Field 6:': 'fig6_implementation_roadmap_gantt.jpg',
            'Field 8:': 'fig7_team_governance_matrix.jpg',
            'Field 10:': 'fig8_security_dpdp_enclave.jpg',
            'Field 11:': 'fig9_clinical_transformation_curve.jpg',
            'Field 12:': 'fig10_grant_budget_breakdown.jpg',
        }
        for prefix, img_name in fig_map.items():
            if prefix in sec_title:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=275.6))
                    story.append(Spacer(1, 6))
                break

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

    # Split only on level-2 headers (## ), not sub-headers (### or ####)
    sections = re.split(r'\n##\s+(?!#)', content)
    if sections[0].strip():
        story.extend(parse_markdown_content(sections[0].strip().split('\n'), available_width=490))

    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        sec_title = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0f766e'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(sec_title, h2_style))

        pow_fig_map = {
            '1. Executive Summary': 'fig1_assam_burden_map.jpg',
            '2. Machine Learning Model Architecture': 'fig2_anomaly_detection_matrix.jpg',
            '3. Critical Congenital Heart Disease': 'fig11_cchd_clinical_protocol.jpg',
            '4. Closed-Loop DEIC Referral': 'fig12_closed_loop_cascade.jpg',
            '5. System Latency': 'fig3_frontline_mobile_ux.jpg',
            '6. Security, ABDM': 'fig8_security_dpdp_enclave.jpg',
        }
        for prefix, img_name in pow_fig_map.items():
            if prefix in sec_title:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=275.6))
                    story.append(Spacer(1, 6))
                break

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated {output_path}")

if __name__ == '__main__':
    proposal_pdf = os.path.join(base_dir, 'NESFIC_D27_Proposal_Ron_Hatibaruah.pdf')
    pow_pdf = os.path.join(base_dir, 'NESFIC_D27_Proof_of_Work_Ron_Hatibaruah.pdf')
    
    build_proposal_pdf(proposal_pdf)
    build_proof_of_work_pdf(pow_pdf)
