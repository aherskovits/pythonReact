# Generated by Django 4.2.7 on 2023-11-20 16:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('EmployeeApp', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Department',
            new_name='Departments',
        ),
        migrations.RenameModel(
            old_name='Employee',
            new_name='Employees',
        ),
    ]