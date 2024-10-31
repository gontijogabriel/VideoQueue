from django.db import models
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.images import ImageFile

from moviepy.editor import VideoFileClip

import os
import uuid


class Video(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    video_file = models.FileField(upload_to='videos/')
    thumbnail = models.ImageField(upload_to='thumbnails/')
    status = models.CharField(max_length=50, choices=[('pending', 'Pending'), ('completed', 'Completed')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        super(Video, self).save(*args, **kwargs)

        if self.video_file:
            video_path = self.video_file.path
            thumbnail_path = os.path.join(settings.MEDIA_ROOT, 'thumbnails', f'thumbnail_{self.id}.jpg')

            if os.path.exists(video_path):
                with VideoFileClip(video_path) as video:
                    video.save_frame(thumbnail_path, t=1)

                with open(thumbnail_path, 'rb') as f:
                    image_content = ContentFile(f.read())
                    self.thumbnail.save(f'thumbnail_{self.id}.jpg', image_content, save=False)

            super(Video, self).save(update_fields=['thumbnail'])