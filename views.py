# views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import whisper

@csrf_exempt
def transcribe_view(request):
    if request.method == 'POST':
        audio_file = request.FILES.get('audio_file')

        if audio_file and audio_file.name.endswith(('.mp3', '.wav', 'mp4', '.m4a')):
            model = whisper.load_model("base")
            result = model.transcribe(audio_file.temporary_file_path())
            return JsonResponse({'text': result["text"]})
        else:
            return JsonResponse({'error': 'Invalid audio file format.'}, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)