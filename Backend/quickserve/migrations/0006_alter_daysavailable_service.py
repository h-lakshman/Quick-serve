# Generated by Django 5.1.1 on 2024-11-11 20:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickserve', '0005_service_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='daysavailable',
            name='service',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='daysavailable', serialize=False, to='quickserve.service'),
        ),
    ]
