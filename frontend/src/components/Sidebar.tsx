type Props = {
  onAdd: () => void;
};

export default function Sidebar({ onAdd }: Props) {
  return (
    <aside className="sidebar">
      <h2>Menu</h2>
      <button onClick={onAdd}>➕ Ajouter produit</button>
    </aside>
  );
}
