# Generated by Django 3.1 on 2020-09-18 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('email', models.EmailField(max_length=60, unique=True, verbose_name='email')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(auto_now=True, verbose_name='last login')),
                ('is_admin', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('weight', models.PositiveSmallIntegerField()),
                ('dob', models.DateField(verbose_name='date of birth')),
                ('city', models.CharField(max_length=40)),
                ('chest', models.FloatField(default=1)),
                ('back', models.FloatField(default=1)),
                ('arms', models.FloatField(default=1)),
                ('core', models.FloatField(default=1)),
                ('legs', models.FloatField(default=1)),
                ('stamina', models.FloatField(default=1)),
                ('agility', models.FloatField(default=1)),
                ('speed', models.FloatField(default=1)),
                ('sort_by', models.BooleanField(default=True)),
                ('measurement', models.BooleanField(default=True)),
                ('privacy1', models.PositiveSmallIntegerField()),
                ('privacy2', models.PositiveSmallIntegerField()),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
