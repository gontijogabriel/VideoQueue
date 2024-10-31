from django.db import models
from django.core.files.base import ContentFile

from moviepy.editor import VideoFileClip

from PIL import Image

from io import BytesIO

import uuid
import os


class Video(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    video_file = models.FileField(upload_to='videos/')
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if not self.thumbnail:
            thumbnail_data = self.generate_thumbnail()
            self.thumbnail.save(f"{self.id}_thumbnail.png", ContentFile(thumbnail_data), save=False)
            super().save(update_fields=['thumbnail'])

    def generate_thumbnail(self):
        video_path = self.video_file.path
        thumbnail_path = f'thumbnails/{self.id}_thumbnail.png'
        thumbnail_full_path = os.path.join('media', thumbnail_path)

        os.makedirs(os.path.dirname(thumbnail_full_path), exist_ok=True)

        with VideoFileClip(video_path) as video:
            frame = video.get_frame(0)
            image = Image.fromarray(frame)

            buffer = BytesIO()
            image.save(buffer, format='PNG')
            buffer.seek(0)

        return buffer.getvalue()