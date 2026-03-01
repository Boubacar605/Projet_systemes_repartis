// Supprimer l'import de config
// import { API_BASE_URL } from '../config';

type Props = {
  produit: any;
  onEdit: () => void;
};

export default function ProduitCard({ produit, onEdit }: Props) {
  const API_BASE_URL = 'http://192.168.49.2:30007/api'; // URL en dur

  const supprimer = async () => {
    if (!confirm("Supprimer ce produit ?")) return;
    await fetch(`${API_BASE_URL}/produits/${produit.id}/`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  const imageUrl = produit.image
    ? produit.image.startsWith("http")
      ? produit.image
      : `http://192.168.49.2:30007${produit.image}`
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