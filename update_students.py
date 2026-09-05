import re

with open('Thesis.html', 'r', encoding='utf-8') as f:
    thesis_text = f.read()

phd_str = re.search(r'var PHD = \[(.*?)\];', thesis_text, re.DOTALL).group(1)
mtech_str = re.search(r'var MTECH = \[(.*?)\];', thesis_text, re.DOTALL).group(1)

def parse_js_array(js_str):
    matches = re.findall(r'\{y:([^,]+),n:"([^"]+)",t:"[^"]+"\}', js_str)
    res = {}
    for y, n in matches:
        year = y.strip().strip('\"')
        if year == 'null': year = 'Ongoing'
        res[n.lower().strip()] = year
    return res

phd_dict = parse_js_array(phd_str)
mtech_dict = parse_js_array(mtech_str)

def normalize(name):
    return re.sub(r'[^a-z]', '', name.lower())

phd_norm = {normalize(k): v for k, v in phd_dict.items()}
mtech_norm = {normalize(k): v for k, v in mtech_dict.items()}

with open('students.html', 'r', encoding='utf-8') as f:
    students_html = f.read()

cards = re.split(r'(<div class=\"student-card\">)', students_html)

out = [cards[0]]
for i in range(1, len(cards), 2):
    card_start = cards[i]
    card_content = cards[i+1]
    
    name_match = re.search(r'<h4 class=\"student-name\">([^<]+)</h4>', card_content)
    if name_match:
        name = name_match.group(1).strip()
        norm_name = normalize(name)
        
        years = []
        if norm_name in phd_norm:
            years.append(phd_norm[norm_name])
        if norm_name in mtech_norm:
            years.append(mtech_norm[norm_name])
            
        if not years:
            years_str = ""
        else:
            years_str = ", ".join(years)
            
        role_match = re.search(r'(<div class=\"student-role\">.*?</div>)', card_content, re.DOTALL)
        if role_match and years_str:
            role_tag = role_match.group(1)
            new_year_div = f'<div class=\"student-year\" style=\"font-size: 0.9rem; color: #64748b; margin-bottom: 8px; font-weight: 600;\">{years_str}</div>'
            
            if re.search(r'<div class=\"student-year\".*?</div>', card_content, re.DOTALL):
                card_content = re.sub(r'<div class=\"student-year\".*?</div>', new_year_div, card_content, flags=re.DOTALL)
            else:
                card_content = card_content.replace(role_tag, role_tag + '\n        ' + new_year_div)
                
    out.append(card_start)
    out.append(card_content)

with open('students_updated.html', 'w', encoding='utf-8') as f:
    f.write("".join(out))
print("Done")
