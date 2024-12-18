# Generated by Django 5.1.2 on 2024-11-09 04:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickserve', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='available_all_hours',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='service',
            name='id',
            field=models.BigAutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='service',
            name='address',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='quickserve.address'),
        ),
    ]
