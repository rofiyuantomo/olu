from PIL import Image
import os
files = ['assets/weapon-images/ar/akm_trans.png','assets/weapon-images/ar/ar-57_trans.png','assets/weapon-images/ar/ak-12_trans.png']
for fname in files:
    path = os.path.join(os.getcwd(), fname)
    img = Image.open(path).convert('RGBA')
    data = img.getdata()
    total = img.width * img.height
    alpha_count = sum(1 for px in data if px[3] < 255)
    print(fname, 'alpha pixels', alpha_count, '/', total)
    if alpha_count > 0:
        pts = [i for i, px in enumerate(data) if px[3] < 255][:20]
        print('sample transparent indices', pts)
