import os
import whisper


data_folder = 'backend/data'  # Assuming your videos are stored in a folder named 'data'

# Get a list of all files in the data folder
files = [os.path.join(data_folder, f) for f in os.listdir(data_folder) if os.path.isfile(os.path.join(data_folder, f))]

# Sort files by modification time (newest first)
files.sort(key=lambda x: os.path.getmtime(x), reverse=True)

# Take the most recent file
if files:
    latest_video_path = files[0]
else:
    print("No video files found in the data folder.")
    exit(1)

# Use Whisper to transcribe the audio from the video
model = whisper.load_model("base")

result = model.transcribe(latest_video_path)
print(result["text"])