import { useEffect, useState } from "react";

type Categorie = {
  id: number;
  nom: string;
};

type Props = {
  onClose: () => void;
  produit?: any;
};

export default function ProduitModal({ onClose, produit }: Props) {
  const [nom, setNom] = useState(produit?.nom || "");
  const [prix, setPrix] = useState(produit?.prix || "");
  const [image, setImage] = useState<File | null>(null);
  const [categorie, setCategorie] = useState("");
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
fetch("http://192.168.49.2:30007/api/categories/")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prix", prix);
    formData.append("categorie", categorie);
    if (image) formData.append("image", image);

    await fetch(
      produit
        ? `http://192.168.49.2:30007/api/produits/${produit.id}/`
        : "http://192.168.49.2:30007/api/produits/",
      {
        method: produit ? "PUT" : "POST",
        body: formData,
      }
    );

    onClose();
    window.location.reload();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{produit ? "Modifier" : "Ajouter"} un produit</h2>

        <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" />
        <input value={prix} onChange={e => setPrix(e.target.value)} placeholder="Prix" />

        <select onChange={e => setCategorie(e.target.value)}>
          <option value="">Catégorie</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.nom}</option>
          ))}
        </select>

        <input type="file" onChange={e => setImage(e.target.files?.[0] || null)} />

        <div className="modal-actions">
          <button onClick={handleSubmit}> Enregistrer</button>
          <button onClick={onClose}> Annuler</button>
        </div>
      </div>
    </div>
  );
}
