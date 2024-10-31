from rest_framework import serializers

from videos.models import Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'
    
    def create(self, validated_data):
        return super().create(validated_data)