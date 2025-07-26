import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product Created Successfully." };
  },

  fetchProducts: async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`http://localhost:5000/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    if (!data.success) return { success: false, message: "Unable to Delete" };
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid), //Update UI Immediately without refreshing the page
    }));
    return { success: true, message: data.message };
  },

  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`http://localhost:5000/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success)
      return { success: false, message: "Unable to Update Data !" };
    set((state) => ({
      //Update UI Immediately without Refresh.
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return { success: true, message: "Product Updated Successfully." };
  },
}));
