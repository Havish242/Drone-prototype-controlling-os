from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


def index(request):
    """Render the index template from contact_app/templates/index.html"""
    return render(request, 'index.html')


@csrf_exempt
def contact(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST required'}, status=405)
    try:
        data = json.loads(request.body.decode('utf-8'))
    except Exception:
        return JsonResponse({'error': 'invalid JSON'}, status=400)

    # Echo back received data for the prototype
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    return JsonResponse({'status': 'ok', 'received': {'name': name, 'email': email, 'message': message}})

