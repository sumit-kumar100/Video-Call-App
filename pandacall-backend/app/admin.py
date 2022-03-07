from django.contrib import admin
from .models import PandaCallUser


class PandaCallUserAdmin(admin.ModelAdmin):
    list_display = ('first_name','last_name','username','account_id','notificationToken')


admin.site.register(PandaCallUser,PandaCallUserAdmin)
