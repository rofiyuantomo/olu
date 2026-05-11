from PIL import Image
import os
import math

files = ['assets/weapon-images/ar/akm.png','assets/weapon-images/ar/ar-57.png','assets/weapon-images/ar/ak-12.png']
base = os.path.dirname(__file__)

def rgb_to_hsv(r,g,b):
    r, g, b = r/255.0, g/255.0, b/255.0
    mx = max(r,g,b); mn = min(r,g,b)
    d = mx - mn
    if mx == mn:
        h = 0
    elif mx == r:
        h = (60 * ((g-b)/d) + 360) % 360
    elif mx == g:
        h = (60 * ((b-r)/d) + 120) % 360
    else:
        h = (60 * ((r-g)/d) + 240) % 360
    s = 0 if mx == 0 else d/mx
    v = mx
    return h,s,v

for fname in files:
    path = os.path.join(base, fname)
    img = Image.open(path).convert('RGBA')
    w,h = img.size
    data = img.load()
    corners = [data[0,0], data[w-1,0], data[0,h-1], data[w-1,h-1]]
    avg = tuple(sum(c[i] for c in corners)//len(corners) for i in range(4))
    print('processing', fname, 'avg corner', avg)
    out = Image.new('RGBA', (w,h))
    out_data = out.load()
    for y in range(h):
        for x in range(w):
            r,g,b,a = data[x,y]
            dr = r - avg[0]
            dg = g - avg[1]
            db = b - avg[2]
            dist = math.sqrt(dr*dr + dg*dg + db*db)
            hsv = rgb_to_hsv(r,g,b)
            sat = hsv[1]
            if dist < 35 and sat < 0.20 and a > 240:
                out_data[x,y] = (r,g,b,0)
            else:
                out_data[x,y] = (r,g,b,a)
    out_path = os.path.join(base, 'assets/weapon-images/ar', os.path.splitext(os.path.basename(fname))[0] + '_trans.png')
    out.save(out_path)
    print('saved', out_path)
