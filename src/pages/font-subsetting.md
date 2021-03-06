---
title: "Font subsetting"
date: "2020-04-19"
tags: ["fonts"]
description: "Subset web fonts to decrease file size"
---

### Introduction

Just some notes on font subsetting - for now this is just some snippets and links rather than a full article.

### Setup

The following script can be run in [FontForge](https://fontforge.org/) (using `File->Execute Script...`), and will display a dialog box with a list of unicode code points:
```python
# Open a font with absolute path - substitute with your own font
font = fontforge.open("/Users/rebeam/Inter-3.13/lato-v16-latin-regular.ttf", 4)

# Build list of unicode code points as a string
unicode = ""
for (i,g) in enumerate(font.glyphs()):
  unicode += str(g.unicode) + ", "

# Display as a question, so we can copy the contents.
fontforge.askString("Unicode code points", "Here they are:", unicode)
```

The results should be something like:

```text
-1, -1, 13, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 305, 338, 339, 710, 730, 732, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8226, 8230, 8249, 8250, 8260, 8364, 8482, 8722, -1, -1, -1, -1, -1, -1, -1, -1,
```
