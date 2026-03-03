from rest_framework import serializers
from .models import Produit, Categorie

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = "__all__"

class ProduitSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    categorie_nom = serializers.CharField(source='categorie.nom', read_only=True)
    class Meta:
        model = Produit
        fields = "__all__"

