# backend/api/migrations/0004_add_default_categories.py
# Generated manually to add default categories

from django.db import migrations

def add_default_categories(apps, schema_editor):
    Categorie = apps.get_model('api', 'Categorie')
    categories = [
        'Électronique',
        'Vêtements',
        'Alimentation',
        'Maison',
        'Sports',
        'Livres',
        'Informatique',
        'Téléphonie',
        'Audio',
        'Photo'
    ]
    for nom in categories:
        Categorie.objects.get_or_create(nom=nom)

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_categorie_produit_categorie'),  # Dépend de la migration qui crée le modèle Categorie
    ]

    operations = [
        migrations.RunPython(add_default_categories),
    ]