# Generated by Django 3.1 on 2020-09-18 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20200918_2020'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='dob',
            field=models.DateField(null=True, verbose_name='date of birth'),
        ),
    ]
