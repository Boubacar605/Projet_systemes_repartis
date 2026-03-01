import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ProduitCard from "../components/ProduitCard";
import ProduitModal from "../components/ProduitModal";

type Produit = {
  id: number;
  nom: string;
  prix: number;
  image: string | null;
  categorie_nom?: string;
};

type Props = {
  sidebarOpen: boolean;
  closeSidebar: () => void;
};

export default function ProduitsPage({ sidebarOpen, closeSidebar }: Props) {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduit, setEditProduit] = useState<Produit | null>(null);

  const chargerProduits = () => {
    const API_BASE_URL = 'http://192.168.49.2:30007/api';
    fetch(`${API_BASE_URL}/produits/`)
      .then(res => res.json())
      .then(data => setProduits(data));
  };

  useEffect(() => {
    chargerProduits();
  }, []);

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <Sidebar
          onAdd={() => {
            closeSidebar();
            setEditProduit(null);
            setShowModal(true);
          }}
        />
      )}

      <main className="content">
        <h1>Catalogue des produits</h1>
        <div className="produits-grid">
          {produits.map(p => (
            <ProduitCard
              key={p.id}
              produit={p}
              onEdit={() => {
                setEditProduit(p);
                setShowModal(true);
              }}
            />
          ))}
        </div>
      </main>

      {showModal && (
        <ProduitModal
          produit={editProduit}
          onClose={() => {
            setShowModal(false);
            chargerProduits();
          }}
        />
      )}
    </div>
  );
}