# Generated by Django 3.1 on 2020-10-05 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_auto_20201004_2053'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise_item',
            name='tooltip_illustration',
            field=models.FilePathField(default='missing.gif', path='main/images/tooltip illustrations'),
        ),
    ]