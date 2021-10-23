# Generated by Django 3.2.8 on 2021-10-21 10:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_remove_order_conversations'),
        ('conversations', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conversation',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='conversations', to='orders.order'),
        ),
    ]
