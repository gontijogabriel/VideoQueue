from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from videos.models import Video
from videos.serializers import VideoSerializer


import subprocess


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    @action(detail=True, methods=['post'])
    def download(self, request, pk=None):
        video = self.get_object()
        subprocess.run(['echo', 'Downloading', video.video_file.path])
        video.status = 'completed'
        video.save()
        return Response({'status': 'Download completed'})

    @action(detail=False, methods=['post'])
    def upload(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(status='pending')
        return Response(serializer.data)
