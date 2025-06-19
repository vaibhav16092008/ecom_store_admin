"use client";
import React, { useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import { deleteCall, postCall, putCall } from '@/utils/apiCall';
import { toast } from 'react-hot-toast';
import ConfirmBox from '@/component/ConfirmBox';

const BrandPage = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState({
        all: false,
        page: 1,
        limit: 5,
        search: "",
    });
    const [totalPages, setTotalPages] = useState(1);
    const [isConfirmOpen, setIsConfirmOpen] = useState({
        isOpen: false,
        data: null
    });
    const [newBrand, setNewBrand] = useState({
        name: '',
        logo: ''
    });

    const [editingBrand, setEditingBrand] = useState({
        id: '',
        name: '',
        slug: '',
        description: '',
        logo: '',
        isActive: true
    });

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchBrands();
    }, [query.page, query.search]);

    const fetchBrands = async () => {
        try {
            setLoading(true);
            const response = await postCall('brand', {
                all: query.all,
                page: query.page,
                limit: query.limit,
                search: query.search
            });

            if (response.data?.status === 200) {
                setBrands(response.data.data.brands || []);
                const total = response.data.data.total || 0;
                setTotalPages(Math.ceil(total / query.limit));
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch brands');
            console.error('Error fetching brands:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewBrand(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleEditInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingBrand(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await postCall('brand/add', newBrand);
            console.log(response);

            setNewBrand({
                name: '',
                slug: '',
                description: '',
                logo: '',
                isActive: true
            });
            setIsAdding(false);
            toast.success(response.data.message)
            await fetchBrands();
        } catch (err) {
            console.error('Error creating brand:', err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const payload = {
            ...editingBrand,
            image: editingBrand.logo
        }

        try {
            const response = await putCall(`brand/edit`, payload);
            console.log(response);

            setIsEditing(false);
            setEditingBrand({
                id: '',
                name: '',
                slug: '',
                description: '',
                logo: '',
                isActive: true
            })
            toast.success(response?.data?.message)
            await fetchBrands();
        } catch (err) {
            console.error('Error updating brand:', err);
        }
    };

    const generateSlug = (name) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const handleDelete = async (id) => {
        try {

            const response = await deleteCall(`brand/${id}`);
            toast.success(response.data.message);
            await fetchBrands();

        } catch (err) {
            console.error('Error deleting brand:', err);
            toast.error(err.response?.data?.message || 'Failed to delete brand');
        }
    };
    const handleConfirmAction = (confirmed) => {

        if (confirmed) {
            handleDelete(isConfirmOpen.data)
        }
        setIsConfirmOpen({
            isOpen: false,
            data: null
        });
    };
    const handleEdit = (brand) => {
        setEditingBrand({
            id: brand._id || brand.id,
            name: brand.name,
            slug: brand.slug,
            description: brand.description,
            logo: brand.image,
            isActive: brand.isActive
        });
        setIsEditing(true);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(prev => ({
            ...prev,
            search: value,
        }));
    };

    const handlePageChange = (page) => {
        setQuery(prev => ({
            ...prev,
            page
        }));
    };

    if (loading && brands.length === 0) {
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
            {/* Edit Brand Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
                        <div className="p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Edit Brand</h2>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={handleUpdate}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            disabled
                                            readOnly
                                            value={editingBrand.name}
                                            // onChange={(e) => {
                                            //     handleEditInputChange(e);
                                            //     setEditingBrand(prev => ({
                                            //         ...prev,
                                            //         slug: generateSlug(e.target.value)
                                            //     }));
                                            // }}
                                            className="cursor-not-allowed w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={editingBrand.slug}
                                            // onChange={handleEditInputChange}
                                            className="cursor-not-allowed w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50"
                                            required
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            name="description"
                                            value={editingBrand.description}
                                            onChange={handleEditInputChange}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                        <input
                                            type="url"
                                            name="logo"
                                            value={editingBrand.logo}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        {editingBrand.logo && (
                                            <div className="mt-2">
                                                <div className="h-20 w-20 rounded-md overflow-hidden border border-gray-200">
                                                    <img src={editingBrand.logo} alt="Preview" className="h-full w-full object-cover" />
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
                                                    checked={editingBrand.isActive}
                                                    onChange={handleEditInputChange}
                                                    className="sr-only"
                                                />
                                                <div className={`block w-12 h-6 rounded-full ${editingBrand.isActive ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${editingBrand.isActive ? 'transform translate-x-6' : ''}`}></div>
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
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm text-sm font-medium"
                                    >
                                        Update Brand
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Brand Management</h1>
                    <p className="text-gray-600 mt-1">Organize your products with brands</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow transition-all duration-200 text-sm"
                >
                    {isAdding ? "" : <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>}
                    {isAdding ? 'Cancel' : 'Add Brand'}
                </button>
            </div>

            {/* Add Brand Form */}
            {isAdding && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                    <div className="p-5">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Brand</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newBrand.name}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo Url</label>
                                    <input
                                        type="url"
                                        name="logo"
                                        value={newBrand.logo}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {newBrand.logo && (
                                        <div className="mt-2">
                                            <div className="h-20 w-20 rounded-md overflow-hidden border border-gray-200">
                                                <img src={newBrand.logo} alt="Preview" className="h-full w-full object-cover" />
                                            </div>
                                        </div>
                                    )}
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
                                    Save Brand
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Brands Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-md font-semibold text-gray-800">All Brands</h2>
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Search brands..."
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
                                    Brand
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
                            {brands.length != 0 ?
                                brands.map((brand) => (
                                    <tr key={brand._id || brand.id} className="hover:bg-gray-50">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                                                    <img className="h-full w-full object-cover" src={brand.image} alt={brand.name} />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                                                    <div className="text-xs text-gray-500">/{brand.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${brand.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {brand.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="text-sm text-gray-500 max-w-xs line-clamp-2">{brand.description}</div>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(brand)}
                                                    className="cursor-pointer text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <ConfirmBox
                                                    isOpen={isConfirmOpen.isOpen}
                                                    title="Confirm Deletion"
                                                    message="Are you sure you want to delete this item?"
                                                    onConfirm={handleConfirmAction}
                                                    onCancel={handleConfirmAction}
                                                    confirmText="Delete"
                                                />
                                                <button
                                                    onClick={() => setIsConfirmOpen({
                                                        isOpen: true,
                                                        data: brand._id || brand.id
                                                    })
                                                    }
                                                    className="cursor-pointer text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                : <tr ><td colSpan={4} className='py-4 text-center'>No Brand </td></tr>}

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
        </div >
    );
};

export default BrandPage;