from PIL import Image
import os
files = ['assets/weapon-images/ar/akm.png','assets/weapon-images/ar/ar-57.png','assets/weapon-images/ar/ak-12.png']
for fname in files:
    p = os.path.join(os.path.dirname(__file__), fname)
    img = Image.open(p)
    print(fname, img.mode, img.size)
    pix = img.convert('RGBA').load()
    w,h = img.size
    samples=[]
    for x,y in [(0,0),(w-1,0),(0,h-1),(w-1,h-1),(w//2,0),(0,h//2),(w-1,h//2),(w//2,h-1)]:
        samples.append((x,y,pix[x,y]))
    print('corner samples', samples)
