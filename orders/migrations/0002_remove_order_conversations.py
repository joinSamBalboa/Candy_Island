# Generated by Django 3.2.8 on 2021-10-21 09:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='conversations',
        ),
    ]
