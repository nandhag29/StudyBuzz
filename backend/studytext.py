import os
import whisper
import torch
from transformers import pipeline

hf_name = 'pszemraj/led-large-book-summary'

summarizedtext = ""


summarizer = pipeline(
    "summarization",
    hf_name,
    device=0 if torch.cuda.is_available() else -1,
)

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

wall_of_text = result["text"]


summarizedtext = summarizer(
    wall_of_text,
    min_length=16,
    max_length=256,
    no_repeat_ngram_size=3,
    encoder_no_repeat_ngram_size=3,
    repetition_penalty=3.5,
    num_beams=4,
    early_stopping=True,
)

print(summarizedtext)
