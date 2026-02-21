from django.db import models

class Categorie(models.Model):
    nom = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nom

class Produit(models.Model):
    nom = models.CharField(max_length=100)
    prix = models.FloatField()
    image = models.ImageField(upload_to="produits/", null=True, blank=True)
    categorie = models.ForeignKey(
        Categorie,
        on_delete=models.SET_NULL,
        null=True,
        related_name="produits"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom




