type Props = {
  produit: any;
  onEdit: () => void;
};

export default function ProduitCard({ produit, onEdit }: Props) {
  const supprimer = async () => {
    if (!confirm("Supprimer ce produit ?")) return;

    await fetch(`http://127.0.0.1:8000/api/produits/${produit.id}/`, {
      method: "DELETE",
    });

    window.location.reload();
  };

  // Construire correctement l'URL de l'image
  const imageUrl = produit.image
    ? produit.image.startsWith("http")
      ? produit.image // URL complète fournie par DRF
      : `http://127.0.0.1:8000${produit.image}` // chemin relatif
    : null;

  return (
    <div className="produit-card">
      {imageUrl && <img src={imageUrl} alt={produit.nom} />}
      <h3>{produit.nom}</h3>
      <p>{produit.prix} FCFA</p>
      <small>{produit.categorie_nom}</small>

      <div className="actions">
        <button onClick={onEdit}>Modifier</button>
        <button onClick={supprimer}>Supprimer</button>
      </div>
    </div>
  );
}
