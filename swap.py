import re

with open("app/page.tsx", "r") as f:
    content = f.read()

# Extract chunk 1 (carousel)
chunk1_start = content.find("{/* \n        ========================================\n        FOUNDING COMMUNITIES SECTION (OPTION E)")
chunk1_end = content.find("</section>", chunk1_start) + len("</section>\n")
chunk1 = content[chunk1_start:chunk1_end]

# Extract chunk 2 (network)
chunk2_start = content.find("{/* \n        ========================================\n        GLOBAL NETWORK STATS SECTION")
chunk2_end = content.find("</section>", chunk2_start) + len("</section>\n")
chunk2 = content[chunk2_start:chunk2_end]

# Replace in content
content = content.replace(chunk1, "___PLACEHOLDER_1___")
content = content.replace(chunk2, chunk1)
content = content.replace("___PLACEHOLDER_1___", chunk2)

with open("app/page.tsx", "w") as f:
    f.write(content)

print("Swapped sections successfully!")
