from django.contrib import admin

from videos.models import Video


class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'video_file', 'thumbnail', 'created_at')
    search_fields = ('title',)
    readonly_fields = ('created_at',)
    fieldsets = (
        (None, {
            'fields': ('title', 'video_file')
        }),
    )
    
admin.site.register(Video, VideoAdmin)
