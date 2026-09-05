import os
import glob
import re

files = glob.glob('c:/Users/Administrator/Downloads/RS_sir_Website_version_2/*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    
    new_lines = []
    for line in lines:
        if 'Thesis.html' in line and 'Thesis Supervised' in line:
            # We skip lines containing this link in nav and footer
            if '<a ' in line and 'Thesis Supervised' in line:
                continue
        new_lines.append(line)
        
    with open(f, 'w', encoding='utf-8') as file:
        file.writelines(new_lines)

print('Done replacing in HTML files.')
