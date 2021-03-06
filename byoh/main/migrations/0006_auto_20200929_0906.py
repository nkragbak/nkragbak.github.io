# Generated by Django 3.1 on 2020-09-29 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20200924_1819'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise_item',
            name='description',
            field=models.TextField(max_length=500),
        ),
        migrations.AlterField(
            model_name='exercise_item',
            name='friend_verified',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='exercise_item',
            name='tooltip_illustration',
            field=models.FilePathField(default='arms.png', path='main/static/main/images/tooltip illustrations'),
        ),
        migrations.AlterField(
            model_name='exercise_item',
            name='video_verified',
            field=models.BooleanField(default=False),
        ),
    ]
