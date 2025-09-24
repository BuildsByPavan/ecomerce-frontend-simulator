import { useState } from "react";
import useProductStore from "../store/productStore";
import useAuthStore from "../store/authStore";
import ProductCard from "../components/ProductCard";
import "../styles/AdminDashboard.css"

function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [category, setCategory] = useState("");

  const { products, addProduct, deleteProduct, updateProduct } = useProductStore();
  const users = useAuthStore((state) => state.users);

  // File upload → Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  // Add or Update product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return alert("Name and price required");

    const newProduct = {
      id: editingId || Date.now(),
      name,
      price: parseFloat(price),
      image,
      category,
      description,
    };

    if (editingId) {
      updateProduct(newProduct);
      alert("Product updated!");
    } else {
      addProduct(newProduct);
      alert("Product added!");
    }

    // reset form
    setName("");
    setPrice("");
    setImage("");
    setDescription("");
    setEditingId(null);
    setCategory("");
  };

  // Load product into form for editing
  const handleEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
    setDescription(product.description);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Add / Update Product */}
      <section>
        <h3>{editingId ? "Edit Product" : "Add Product"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            type="text"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
          />
         
          <input type="file" accept="image/*" onChange={handleImageUpload} />
           <div className="center-or">OR</div>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="url"
            placeholder="Enter image URL"
          />
           
          {image && (
            <div style={{ marginTop: "10px" }}>
              <img src={image} alt="preview" width="100" />
            </div>
          )}

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            type="text"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            type="text"
          />

          <button type="submit">
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button type="button" onClick={() => setEditingId(null)}>
              Cancel
            </button>
          )}
        </form>
      </section>

      {/* Manage Products */}
      <section>
        <h3>Manage Products</h3>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ul>
            {products.map((p) => (
              <li key={p.id}>
                <ProductCard
                  product={p}
                  onEdit={handleEdit}
                  onDelete={deleteProduct}
                  showActions
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Registered Users */}
      <section>
        <h3>Registered Users</h3>
        {users.length === 0 ? (
          <p>No users registered yet.</p>
        ) : (
          <ul>
            <p>Registered Users :</p>
            {users.map((u) => (
              <>
              <li key={u.email}>
                {u.name} ({u.email})
              </li>
              </>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
