# Generated by Django 5.1.4 on 2024-12-26 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='country',
            options={'ordering': ['full_name'], 'verbose_name_plural': 'Countries'},
        ),
        migrations.AlterField(
            model_name='country',
            name='img',
            field=models.CharField(max_length=16, null=True),
        ),
    ]
