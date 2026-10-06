"""
Strip the fake 'transparent' checkerboard baked into public/logo.png
and produce a real transparent PNG.

Strategy (pattern-aware):
- Gray checker squares (~236,238,238) are unambiguous background.
- Near-white pixels are ambiguous (checker white squares vs real artwork
  whites like book pages / text outline / eye highlights).
  => erode the white mask by 2px to break anti-alias bridges,
  => label 4-connected components,
  => SMALL components (<= 1200 px, i.e. single checker cells ~360px)
     that lie within 8px of a gray square = checker cells -> remove,
  => large components (book pages, outlines) and small artwork details
     (eye highlights far from background) stay.
- Fill pinholes, feather alpha by 1px to kill the blend fringe.
"""
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = 'public/logo.png'
DST = 'public/logo.png'
DEBUG = 'public/.logo-debug'

img = np.array(Image.open(SRC).convert('RGB')).astype(np.int16)
H, W, _ = img.shape
r, g, b = img[:, :, 0], img[:, :, 1], img[:, :, 2]
mx = np.maximum(np.maximum(r, g), b)
mn = np.minimum(np.minimum(r, g), b)
spread = mx - mn

# --- masks ---
gray = (abs(r - 236) <= 6) & (abs(g - 238) <= 6) & (abs(b - 238) <= 6) & (spread <= 5)
white = (mn >= 248) & (spread <= 7)
print('gray px:', gray.sum(), ' white px:', white.sum())

# --- break anti-alias bridges: erode white mask by 2 ---
w_er = np.array(Image.fromarray((white * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(5))) > 127

# --- components of eroded white ---
lab, n = ndimage.label(w_er, structure=np.array([[0, 1, 0], [1, 1, 1], [0, 1, 0]]))
counts = np.bincount(lab.ravel())
sizes = counts[1:]
print('white components:', n)

# distance from any gray square
dist_to_gray = ndimage.distance_transform_edt(~gray)

checker = np.zeros_like(w_er)
removed = kept = 0
for i in range(1, n + 1):
    s = int(counts[i])
    if s <= 1200:
        ys, xs = np.where(lab == i)
        if dist_to_gray[ys, xs].min() <= 8.0:
            checker[ys, xs] = True
            removed += 1
            continue
    kept += 1
print(f'small white comps removed as checker cells: {removed}, kept: {kept}')

# dilate checker cells back 3px to recover full cell area (also trims fringe)
chk_full = np.array(Image.fromarray((checker * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7))) > 127

removal = gray | chk_full

# consume leftover checker-cell SEAM blend pixels (neutral 238-252 low-sat)
# by growing removal into neutral pixels only, a few 1px iterations
neutral = (spread <= 10) & (mn >= 238) & (mn <= 252)
rem_d = Image.fromarray((removal * 255).astype(np.uint8))
for _ in range(5):
    grown = np.array(rem_d.filter(ImageFilter.MaxFilter(3))) > 127
    add = grown & neutral & ~removal
    if not add.any():
        break
    removal |= add
    rem_d = Image.fromarray((removal * 255).astype(np.uint8))
print('seam pixels consumed:', int(add.sum()) if add.any() else 0)

# fill pinholes (closing 5px) without expanding the boundary
dil = rem_d.filter(ImageFilter.MaxFilter(5))
ero = dil.filter(ImageFilter.MinFilter(5))
removal = np.array(ero) > 127

alpha = np.where(removal, 0, 255).astype(np.uint8)
# feather: shave 1px off the opaque region to kill blend fringe,
# then soften the edge for smooth anti-aliased rendering
a_img = Image.fromarray(alpha).filter(ImageFilter.MinFilter(3))
alpha = np.array(a_img.filter(ImageFilter.GaussianBlur(0.8)))

out = np.dstack([img.astype(np.uint8), alpha])
Image.fromarray(out).save(DST, optimize=True)
print('saved', DST)

# debug composites
for name, col in {'cream': (253, 248, 236), 'dark': (30, 30, 40), 'magenta': (255, 0, 255)}.items():
    bgc = np.array(col, dtype=np.float64)
    a = alpha[:, :, None] / 255.0
    comp = (img * a + bgc * (1 - a)).astype(np.uint8)
    Image.fromarray(comp).save(f'{DEBUG}-{name}.png')
print('debug composites saved')
