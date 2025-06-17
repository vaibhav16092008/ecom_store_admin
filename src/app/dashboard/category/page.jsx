"use client";
import React, { useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import { getCall, postCall } from '@/utils/apiCall';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState({
        all: false,
        page: 1,
        limit: 2,
        search: "",
    });
    const [totalPages, setTotalPages] = useState(1);

    const [newCategory, setNewCategory] = useState({
        name: '',
        slug: '',
        description: '',
        imageUrl: '',
        isActive: true
    });

    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, [query.page, query.search]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await postCall('category', {
                all: query.all,
                page: query.page,
                limit: query.limit,
                search: query.search
            });

            if (response.data.status === 200) {
                setCategories(response.data.data.category || []);
                // Calculate total pages based on total count and limit
                const total = response.data.data.total || 0;


                setTotalPages(Math.ceil(total / query.limit));
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch categories');
            console.error('Error fetching categories:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewCategory(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...newCategory,
            image: newCategory.imageUrl
        }
        try {
            const response = await postCall('category/add', payload);
            console.log(response);

            setNewCategory({
                name: '',
                slug: '',
                description: '',
                imageUrl: '',
                isActive: true
            });
            setIsAdding(false);
            // Refresh the categories after adding
            await fetchCategories();
        } catch (err) {
            console.error('Error creating category:', err);
        }
    };

    const generateSlug = (name) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const handleDelete = async (id) => {
        try {
            // Here you would typically make a DELETE API call
            // For now, we'll just remove it locally and refresh the list
            setCategories(categories.filter(category => category.id !== id));
            // Refresh the categories after deletion
            await fetchCategories();
        } catch (err) {
            console.error('Error deleting category:', err);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(prev => ({
            ...prev,
            search: value,
            page: 1 // Reset to first page when searching
        }));
    };

    const handlePageChange = (page) => {
        setQuery(prev => ({
            ...prev,
            page
        }));
    };

    if (loading && categories.length === 0) {
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
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
                    <p className="text-gray-600 mt-1">Organize your products with categories</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow transition-all duration-200 text-sm"
                >
                    {isAdding ? "" : <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>}
                    {isAdding ? 'Cancel' : 'Add Category'}
                </button>
            </div>

            {/* Add Category Form */}
            {isAdding && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                    <div className="p-5">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Category</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newCategory.name}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            setNewCategory(prev => ({
                                                ...prev,
                                                slug: generateSlug(e.target.value)
                                            }));
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={newCategory.slug}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50"
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={newCategory.description}
                                        onChange={handleInputChange}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input
                                        type="url"
                                        name="imageUrl"
                                        value={newCategory.imageUrl}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {newCategory.imageUrl && (
                                        <div className="mt-2">
                                            <div className="h-20 w-20 rounded-md overflow-hidden border border-gray-200">
                                                <img src={newCategory.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <label className="flex items-center cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                name="isActive"
                                                checked={newCategory.isActive}
                                                onChange={handleInputChange}
                                                className="sr-only"
                                            />
                                            <div className={`block w-12 h-6 rounded-full ${newCategory.isActive ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${newCategory.isActive ? 'transform translate-x-6' : ''}`}></div>
                                        </div>
                                        <div className="ml-2 text-sm text-gray-700">
                                            Active
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm text-sm font-medium"
                                >
                                    Save Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-md font-semibold text-gray-800">All Categories</h2>
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={query.search}
                            onChange={handleSearch}
                            className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                        <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr key={category._id || category.id} className="hover:bg-gray-50">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                                                <img className="h-full w-full object-cover" src={category.image} alt={category.name} />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                                <div className="text-xs text-gray-500">/{category.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {category.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="text-sm text-gray-500 max-w-xs line-clamp-2">{category.description}</div>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                                title="Edit"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category._id || category.id)}
                                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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

export default CategoryPage;