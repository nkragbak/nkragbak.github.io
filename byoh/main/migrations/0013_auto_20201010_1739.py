# Generated by Django 3.1 on 2020-10-10 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_auto_20201005_1220'),
    ]

    operations = [
        migrations.AddField(
            model_name='userexercises',
            name='lvl_10_achieved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userexercises',
            name='lvl_1_achieved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userexercises',
            name='lvl_2_achieved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userexercises',
            name='lvl_3_achieved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userexercises',
            name='lvl_4_achieved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userexercises',
            name='lvl_5_achieved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userexercises',
            name='lvl_6_achieved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userexercises',
            name='lvl_7_achieved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userexercises',
            name='lvl_8_achieved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userexercises',
            name='lvl_9_achieved',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='exercise_item',
            name='tooltip_illustration',
            field=models.FilePathField(default='missing.gif', path='static/main/images/tooltip illustrations/'),
        ),
    ]