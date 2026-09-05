import os
import glob

# This script only edits the HTML files to remove the link to Thesis.html from the navigation bar.
# It DOES NOT delete any files.

files = glob.glob('c:/Users/Administrator/Downloads/RS_sir_Website_version_2/*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    
    new_lines = []
    for line in lines:
        # If this line is the link to the Thesis page in the navigation bar or footer, skip it
        if 'Thesis.html' in line and 'Thesis Supervised' in line:
            continue
        new_lines.append(line)
        
    with open(f, 'w', encoding='utf-8') as file:
        file.writelines(new_lines)

print('Successfully removed the Thesis Supervised link from all navigation bars.')
