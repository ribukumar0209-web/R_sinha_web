import re

# Read Thesis.html to get the names and years
with open('Thesis.html', 'r', encoding='utf-8') as f:
    thesis_data = f.read()

# Extract {y:"2020",n:"Somil Swarnkar"...}
pattern = r'{y:\"(.*?)\",n:\"(.*?)\"'
matches = re.findall(pattern, thesis_data)

years = {}
for y, n in matches:
    n_clean = n.strip()
    if n_clean not in years:
        years[n_clean] = y
    else:
        # Keep the latest or combine?
        # A person might do MTech then PhD.
        if y not in years[n_clean]:
            years[n_clean] += ', ' + y

# Add matches for null years just in case we want to show 'Present'
pattern_null = r'{y:null,n:\"(.*?)\"'
matches_null = re.findall(pattern_null, thesis_data)
for n in matches_null:
    n_clean = n.strip()
    if n_clean not in years:
        years[n_clean] = 'Ongoing'

print("Extracted years:")
for k,v in list(years.items())[:5]:
    print(k, v)

with open('students.html', 'r', encoding='utf-8') as f:
    html = f.read()

def replacer(m):
    name_html = m.group(1)
    name_clean = re.sub('<.*?>', '', name_html).strip()
    role_html = m.group(2)
    
    year = None
    for k, v in years.items():
        if k.lower() == name_clean.lower() or name_clean.lower() in k.lower():
            year = v
            break
            
    if year:
        addition = f'\n        <div class="student-year" style="font-size: 0.9rem; color: #64748b; margin-bottom: 8px;"><strong>Year of Passing:</strong> {year}</div>'
        return name_html + '\n        ' + role_html.strip() + addition
    else:
        return name_html + '\n        ' + role_html.strip()

html_replaced = re.sub(r'(<h4 class="student-name">.*?</h4>)\s*(<div class="student-role">.*?</div>)', replacer, html)

with open('students.html', 'w', encoding='utf-8') as f:
    f.write(html_replaced)
print('Done writing students.html')
