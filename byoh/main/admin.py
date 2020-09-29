from django.contrib import admin
from main.models import exercise_item


class ExerciseItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'equipment_category', 'primary_focus', 'secondary_focus', 'date_added')


admin.site.register(exercise_item, ExerciseItemAdmin)
