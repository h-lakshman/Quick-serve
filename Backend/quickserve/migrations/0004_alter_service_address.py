# Generated by Django 5.1.2 on 2024-11-09 10:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickserve', '0003_merge_20241109_1524'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='address',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='quickserve.address'),
        ),
    ]