from jinja2 import Template
from pathlib import Path

def build_html(ascii_text: str, title="Fragmenta", output_path: Path = Path("output.html")):
    template_path = Path("templates/fragment.html.j2")
    if not template_path.exists():
        raise FileNotFoundError("HTML template not found.")
    template = template_path.read_text()
    html = Template(template).render(title=title, ascii_art=ascii_text)
    output_path.write_text(html)
    return output_path

