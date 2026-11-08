import cv2
import numpy as np
from PIL import Image

def generate_portrait_from_clean_png():
    img = cv2.imread('user_clean_profile.png', cv2.IMREAD_UNCHANGED)
    if img is None:
        raise FileNotFoundError("user_clean_profile.png not found")
        
    b, g, r, a = cv2.split(img)

    # Crop vertically from hair top (y=60) to bottom (y=648)
    y1 = 60
    y2 = 648
    x1 = 0
    x2 = 365

    cropped_bgr = cv2.merge([b[y1:y2, x1:x2], g[y1:y2, x1:x2], r[y1:y2, x1:x2]])
    cropped_alpha = a[y1:y2, x1:x2]

    ch, cw = cropped_bgr.shape[:2]
    target_ratio = 290 / 328

    # Pad width to match target_ratio (290 / 328 = 0.8841)
    target_w = int(round(ch * target_ratio))
    pad_l = (target_w - cw) // 2
    pad_r = target_w - cw - pad_l

    padded_bgr = cv2.copyMakeBorder(cropped_bgr, 0, 0, pad_l, pad_r, cv2.BORDER_CONSTANT, value=(0,0,0))
    padded_alpha = cv2.copyMakeBorder(cropped_alpha, 0, 0, pad_l, pad_r, cv2.BORDER_CONSTANT, value=0)

    num_cols = 290
    num_rows = 328

    resized_bgr = cv2.resize(padded_bgr, (num_cols, num_rows), interpolation=cv2.INTER_AREA)
    resized_alpha = cv2.resize(padded_alpha, (num_cols, num_rows), interpolation=cv2.INTER_AREA)

    # Foreground is where alpha > 100
    mask_fg = resized_alpha > 100

    gray = cv2.cvtColor(resized_bgr, cv2.COLOR_BGR2GRAY)
    gray[~mask_fg] = 0

    # Highlight compression for natural dot-matrix look (no blown-out solid bars)
    processed = gray.astype(np.float32).copy()
    high_mask = processed > 165
    processed[high_mask] = 165 + (processed[high_mask] - 165) * 0.4

    # CLAHE for crisp micro-details on face, eyes, owl phone case, and hair texture
    processed_u8 = np.clip(processed, 0, 255).astype(np.uint8)
    clahe = cv2.createCLAHE(clipLimit=1.8, tileGridSize=(8, 8))
    enhanced = clahe.apply(processed_u8)
    enhanced[~mask_fg] = 0

    # Floyd-Steinberg dithering
    pil_img = Image.fromarray(enhanced)
    dithered = pil_img.convert('1', dither=Image.Dither.FLOYDSTEINBERG)
    arr = np.array(dithered, dtype=np.uint8)
    arr[~mask_fg] = 0

    # Regularize runs >= 5 dots to preserve Nothing Tech dot-matrix aesthetics
    clean_arr = arr.copy()
    h, w = clean_arr.shape
    for r_idx in range(h):
        c = 0
        while c < w:
            if clean_arr[r_idx, c] > 0:
                c_start = c
                while c < w and clean_arr[r_idx, c] > 0:
                    c += 1
                run_len = c - c_start
                if run_len >= 5:
                    for k in range(c_start + 3, c, 3):
                        clean_arr[r_idx, k] = 0
            else:
                c += 1

    cv2.imwrite('final_portrait_matrix.png', clean_arr * 255)
    print(f"Generated clean dithered portrait! Total dots: {np.sum(clean_arr)}")

    # Convert to SVG Path Segments
    x_base = 58.03
    y_base = 119.78
    dx = 1.2576
    dy = 1.2529

    path_segments = []
    for r_idx in range(num_rows):
        y = y_base + r_idx * dy
        row_pixels = clean_arr[r_idx, :]

        c = 0
        while c < num_cols:
            if row_pixels[c] > 0:
                c_start = c
                while c < num_cols and row_pixels[c] > 0:
                    c += 1
                c_end = c
                x_pos = x_base + c_start * dx
                run_w = (c_end - c_start) * dx
                path_segments.append(f"M{x_pos:.2f} {y:.2f}h{run_w:.2f}v1.10h{-run_w:.2f}z")
            else:
                c += 1

    path_d = "".join(path_segments)
    print(f"Path segments: {len(path_segments)}, length: {len(path_d)}")

    with open('gourab_portrait_path.txt', 'w', encoding='utf-8') as f:
        f.write(path_d)

    return path_d

if __name__ == '__main__':
    generate_portrait_from_clean_png()
