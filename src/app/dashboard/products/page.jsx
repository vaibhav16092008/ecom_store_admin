"use client";
import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { deleteCall, postCall, putCall, getCall } from "@/utils/apiCall";
import { toast } from "react-hot-toast";
import ConfirmBox from "@/components/ConfirmBox";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryQuery, setCategoryQuery] = useState({
    all: true,
    page: 1,
    limit: 5,
    search: "",
  });
  const [brandQuery, setBrandQuery] = useState({
    all: true,
    page: 1,
    limit: 5,
    search: "",
  });
  const [query, setQuery] = useState({
    all: false,
    page: 1,
    limit: 5,
    search: "",
  });
  const [totalPages, setTotalPages] = useState(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState({
    isOpen: false,
    data: null,
  });
  const [newProduct, setnewProduct] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
    discount: 0,
    discountedPrice: 0,
    rating: 0,
    reviewCount: 0,
    isNew: true,
    images: [],
    colors: [],
    stock: 0,
    features: [],
    currentImageInput: "",
  });

  const [editingProduct, seteditingProduct] = useState({
    id: "",
    name: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
    discount: 0,
    discountedPrice: 0,
    rating: 0,
    reviewCount: 0,
    isNew: true,
    images: [],
    colors: [],
    stock: 0,
    features: [],
    currentImageInput: "",
    currentColorInput: "",
    currentFeatureInput: "",
  });

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, [query.page, query.search]);

  const fetchProducts = async () => {
    try {
      const response = await postCall("products", {
        all: query.all,
        page: query.page,
        limit: query.limit,
        search: query.search,
      });

      if (response.data?.status === 200) {
        setProducts(response.data.data.products || []);
        const total = response.data.data.total || 0;
        setTotalPages(Math.ceil(total / query.limit));
      }
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await postCall("category", categoryQuery);
      if (response.data?.status === 200) {
        setCategories(response.data.data.category || []);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await postCall("brand", brandQuery);
      if (response.data?.status === 200) {
        setBrands(response.data.data.brands || []);
      }
    } catch (err) {
      console.error("Error fetching brands:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setnewProduct((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    seteditingProduct((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleAddImage = () => {
    if (newProduct?.currentImageInput.trim() === "") return;
    setnewProduct((prev) => ({
      ...prev,
      images: [...prev.images, prev.currentImageInput],
      currentImageInput: "",
    }));
  };

  const handleRemoveImage = (index) => {
    setnewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddColor = () => {
    if (newProduct?.currentColorInput.trim() === "") return;
    setnewProduct((prev) => ({
      ...prev,
      colors: [...prev.colors, prev.currentColorInput],
      currentColorInput: "",
    }));
  };

  const handleRemoveColor = (index) => {
    setnewProduct((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleAddFeature = () => {
    if (newProduct?.currentFeatureInput.trim() === "") return;
    setnewProduct((prev) => ({
      ...prev,
      features: [...prev.features, prev.currentFeatureInput],
      currentFeatureInput: "",
    }));
  };

  const handleRemoveFeature = (index) => {
    setnewProduct((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleEditAddImage = () => {
    if (editingProduct?.currentImageInput.trim() === "") return;
    seteditingProduct((prev) => ({
      ...prev,
      images: [...prev.images, prev.currentImageInput],
      currentImageInput: "",
    }));
  };

  const handleEditRemoveImage = (index) => {
    seteditingProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleEditAddColor = () => {
    if (editingProduct?.currentColorInput.trim() === "") return;
    seteditingProduct((prev) => ({
      ...prev,
      colors: [...prev.colors, prev.currentColorInput],
      currentColorInput: "",
    }));
  };

  const handleEditRemoveColor = (index) => {
    seteditingProduct((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleEditAddFeature = () => {
    if (editingProduct?.currentFeatureInput.trim() === "") return;
    seteditingProduct((prev) => ({
      ...prev,
      features: [...prev.features, prev.currentFeatureInput],
      currentFeatureInput: "",
    }));
  };

  const handleEditRemoveFeature = (index) => {
    seteditingProduct((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...newProduct,
      discountedPrice: newProduct?.price * (1 - newProduct?.discount / 100),
    };

    try {
      const response = await postCall("products/add", payload);
      console.log(response);

      setnewProduct({
        name: "",
        brand: "",
        category: "",
        description: "",
        price: 0,
        discount: 0,
        discountedPrice: 0,
        rating: 0,
        reviewCount: 0,
        isNew: true,
        images: [],
        colors: [],
        stock: 0,
        features: [],
        currentImageInput: "",
        currentColorInput: "",
        currentFeatureInput: "",
      });
      setIsAdding(false);
      toast.success(response.data.message);
      await fetchProducts();
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error(err.response?.data?.message || "Failed to create product");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      ...editingProduct,
      discountedPrice:
        editingProduct?.price * (1 - editingProduct?.discount / 100),
    };

    try {
      const response = await putCall("product/edit", payload);

      setIsEditing(false);
      seteditingProduct({
        id: "",
        name: "",
        brand: "",
        category: "",
        description: "",
        price: 0,
        discount: 0,
        discountedPrice: 0,
        rating: 0,
        reviewCount: 0,
        isNew: true,
        images: [],
        colors: [],
        stock: 0,
        features: [],
        currentImageInput: "",
        currentColorInput: "",
        currentFeatureInput: "",
      });
      toast.success(response?.data?.message);
      await fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error(err.response?.data?.message || "Failed to update product");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteCall(`product/${id}`);
      toast.success(response.data.message);
      await fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  const handleConfirmAction = (confirmed) => {
    if (confirmed) {
      handleDelete(isConfirmOpen.data);
    }
    setIsConfirmOpen({
      isOpen: false,
      data: null,
    });
  };

  const handleEdit = (product) => {
    seteditingProduct({
      id: product?._id || product?.id,
      name: product?.name,
      brand: product?.brand,
      category: product?.category,
      description: product?.description,
      price: product?.price,
      discount: product?.discount,
      discountedPrice: product?.discountedPrice,
      rating: product?.rating,
      reviewCount: product?.reviewCount,
      isNew: product?.isNew,
      images: product?.images || [],
      colors: product?.colors || [],
      stock: product?.stock,
      features: product?.features || [],
      currentImageInput: "",
      currentColorInput: "",
      currentFeatureInput: "",
    });
    setIsEditing(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery((prev) => ({
      ...prev,
      search: value,
    }));
  };

  const handlePageChange = (page) => {
    setQuery((prev) => ({
      ...prev,
      page,
    }));
  };

  if (loading && products?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Edit Product Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Edit Product
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editingProduct?.name}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand *
                    </label>
                    <select
                      name="brand"
                      value={editingProduct?.brand}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      required
                    >
                      <option value="">Select Brand</option>
                      {brands.map((brand) => (
                        <option
                          key={brand._id || brand.id}
                          value={brand._id || brand.id}
                        >
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={editingProduct?.category}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option
                          key={category._id || category.id}
                          value={category._id || category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      min="0"
                      step="0.01"
                      value={editingProduct?.price}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      min="0"
                      max="100"
                      value={editingProduct?.discount}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discounted Price
                    </label>
                    <input
                      type="number"
                      name="discountedPrice"
                      min="0"
                      step="0.01"
                      value={
                        editingProduct?.price *
                        (1 - editingProduct?.discount / 100)
                      }
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <input
                      type="number"
                      name="rating"
                      min="0"
                      max="5"
                      step="0.1"
                      value={editingProduct?.rating}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Review Count
                    </label>
                    <input
                      type="number"
                      name="reviewCount"
                      min="0"
                      value={editingProduct?.reviewCount}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      min="0"
                      value={editingProduct?.stock}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="isNew"
                          checked={editingProduct?.isNew}
                          onChange={handleEditInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`block w-12 h-6 rounded-full ${
                            editingProduct?.isNew
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <div
                          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                            editingProduct?.isNew
                              ? "transform translate-x-6"
                              : ""
                          }`}
                        ></div>
                      </div>
                      <div className="ml-2 text-sm text-gray-700">
                        New Product
                      </div>
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={editingProduct?.description}
                      onChange={handleEditInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Images
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="url"
                        value={editingProduct?.currentImageInput}
                        onChange={(e) =>
                          seteditingProduct((prev) => ({
                            ...prev,
                            currentImageInput: e.target.value,
                          }))
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                      <button
                        type="button"
                        onClick={handleEditAddImage}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                      >
                        Add
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {editingProduct?.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Product ${index}`}
                            className="h-20 w-full object-cover rounded-md border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => handleEditRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Colors
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={editingProduct?.currentColorInput}
                        onChange={(e) =>
                          seteditingProduct((prev) => ({
                            ...prev,
                            currentColorInput: e.target.value,
                          }))
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Enter color name"
                      />
                      <button
                        type="button"
                        onClick={handleEditAddColor}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {editingProduct?.colors.map((color, index) => (
                        <div key={index} className="relative group">
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
                            {color}
                            <button
                              type="button"
                              onClick={() => handleEditRemoveColor(index)}
                              className="ml-1 text-gray-500 hover:text-red-500"
                            >
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Features
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={editingProduct?.currentFeatureInput}
                        onChange={(e) =>
                          seteditingProduct((prev) => ({
                            ...prev,
                            currentFeatureInput: e.target.value,
                          }))
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Enter feature"
                      />
                      <button
                        type="button"
                        onClick={handleEditAddFeature}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                      >
                        Add
                      </button>
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                      {editingProduct?.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span>{feature}</span>
                          <button
                            type="button"
                            onClick={() => handleEditRemoveFeature(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm text-sm font-medium"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Product Management
          </h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow transition-all duration-200 text-sm"
        >
          {isAdding ? (
            ""
          ) : (
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          )}
          {isAdding ? "Cancel" : "Add Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Create New Product
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct?.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand *
                  </label>
                  <select
                    name="brand"
                    value={newProduct?.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option
                        key={brand._id || brand.id}
                        value={brand._id || brand.id}
                      >
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={newProduct?.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option
                        key={category._id || category.id}
                        value={category._id || category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={newProduct?.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    min="0"
                    max="100"
                    value={newProduct?.discount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discounted Price
                  </label>
                  <input
                    type="number"
                    name="discountedPrice"
                    min="0"
                    step="0.01"
                    value={newProduct?.price * (1 - newProduct?.discount / 100)}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={newProduct?.rating}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Review Count
                  </label>
                  <input
                    type="number"
                    name="reviewCount"
                    min="0"
                    value={newProduct?.reviewCount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    min="0"
                    value={newProduct?.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="isNew"
                        checked={newProduct?.isNew}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`block w-12 h-6 rounded-full ${
                          newProduct?.isNew ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      ></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                          newProduct?.isNew ? "transform translate-x-6" : ""
                        }`}
                      ></div>
                    </div>
                    <div className="ml-2 text-sm text-gray-700">
                      New Product
                    </div>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newProduct?.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Images
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={newProduct?.currentImageInput}
                      onChange={(e) =>
                        setnewProduct((prev) => ({
                          ...prev,
                          currentImageInput: e.target.value,
                        }))
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                    >
                      Add
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {newProduct?.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product ${index}`}
                          className="h-20 w-full object-cover rounded-md border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Colors
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newProduct?.currentColorInput}
                      onChange={(e) =>
                        setnewProduct((prev) => ({
                          ...prev,
                          currentColorInput: e.target.value,
                        }))
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter color name"
                    />
                    <button
                      type="button"
                      onClick={handleAddColor}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newProduct?.colors.map((color, index) => (
                      <div key={index} className="relative group">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
                          {color}
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(index)}
                            className="ml-1 text-gray-500 hover:text-red-500"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newProduct?.currentFeatureInput}
                      onChange={(e) =>
                        setnewProduct((prev) => ({
                          ...prev,
                          currentFeatureInput: e.target.value,
                        }))
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter feature"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {newProduct?.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm text-sm font-medium"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-md font-semibold text-gray-800">All Products</h2>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search products?..."
              value={query.search}
              onChange={handleSearch}
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.length !== 0 ? (
                products?.map((product) => (
                  <tr
                    key={product?._id || product?.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                          {product?.images && product?.images.length > 0 ? (
                            <img
                              className="h-full w-full object-cover"
                              src={product?.images[0]}
                              alt={product?.name}
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {product?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {categories.find((c) => c._id === product?.category)
                              ?.name || "No category"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${product?.discountedPrice || product?.price}
                        {product?.discount > 0 && (
                          <span className="ml-2 text-xs text-gray-500 line-through">
                            ${product?.price}
                          </span>
                        )}
                      </div>
                      {product?.discount > 0 && (
                        <div className="text-xs text-red-500">
                          {product?.discount}% off
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product?.stock}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                          product?.isNew
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product?.isNew ? "New" : "Regular"}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="cursor-pointer text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                          title="Edit"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <ConfirmBox
                          isOpen={isConfirmOpen.isOpen}
                          title="Confirm Deletion"
                          message="Are you sure you want to delete this product?"
                          onConfirm={handleConfirmAction}
                          onCancel={handleConfirmAction}
                          confirmText="Delete"
                        />
                        <button
                          onClick={() =>
                            setIsConfirmOpen({
                              isOpen: true,
                              data: product?._id || product?.id,
                            })
                          }
                          className="cursor-pointer text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-center">
          <ResponsivePagination
            current={query.page}
            total={totalPages}
            onPageChange={handlePageChange}
            maxWidth={300}
            className="pagination"
            pageLinkClassName="page-link"
            activeLinkClassName="active-page"
            previousLabel="«"
            nextLabel="»"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
