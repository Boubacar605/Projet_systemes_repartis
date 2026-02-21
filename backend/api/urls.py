from rest_framework.routers import DefaultRouter
from .views import ProduitViewSet, CategorieViewSet

router = DefaultRouter()
router.register("produits", ProduitViewSet)
router.register("categories", CategorieViewSet)

urlpatterns = router.urls
