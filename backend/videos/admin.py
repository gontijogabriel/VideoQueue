from django.contrib import admin

from videos.models import Video


class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'video_file', 'thumbnail', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('title',)
    readonly_fields = ('created_at', 'status')
    fieldsets = (
        (None, {
            'fields': ('title', 'video_file', 'status')
        }),
    )

    def save_model(self, request, obj, form, change):
        if not change:
            obj.status = 'pending'
        obj.save()

admin.site.register(Video, VideoAdmin)
