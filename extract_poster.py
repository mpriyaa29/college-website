import cv2

video_path = r"c:\Users\RIYA\Desktop\college\public\videos\skcet-campus.mp4"
poster_path = r"c:\Users\RIYA\Desktop\college\public\images\hero-poster.webp"

vidcap = cv2.VideoCapture(video_path)
success, image = vidcap.read()

if success:
    cv2.imwrite(poster_path, image, [cv2.IMWRITE_WEBP_QUALITY, 80])
    print("Poster saved successfully to", poster_path)
else:
    print("Failed to read video")
