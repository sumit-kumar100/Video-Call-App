from voximplant.apiclient import VoximplantAPI, VoximplantException
from .models import PandaCallUser
from django.http import JsonResponse
import os

# Voxin API
voxapi = VoximplantAPI(os.path.join(
    os.path.dirname(__file__), 'credentials.json'))

APPLICATION_ID = '10420682'


def AddUser(request):
    first_name = request.GET.get('first_name')
    last_name = request.GET.get('last_name')
    username = request.GET.get('username')
    password = request.GET.get('password')
    notificationToken = request.GET.get('notificationToken')

    USER_NAME = f'{username}'
    USER_DISPLAY_NAME = f'{first_name} {last_name}'
    USER_PASSWORD = f'{password}'

    try:
        res = voxapi.add_user(
            USER_NAME,
            USER_DISPLAY_NAME,
            USER_PASSWORD,
            application_id=APPLICATION_ID
        )
        # Creating User in  Our Backend
        user = PandaCallUser.objects.create(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password,
            account_id=res.get('user_id'),
            notificationToken=notificationToken
        )
        user.save()
        return JsonResponse({'result': 1}, status=200)

    except VoximplantException as e:
        return JsonResponse({
            'result': 0,
            'error': f'{e.message}'
        }, status=200)


def GetUser(request):
    try:
        users = list(PandaCallUser.objects.values())
        return JsonResponse(users, safe=False, status=200)
    except VoximplantException as e:
        return JsonResponse({
            "error": e
        }, status=404)
