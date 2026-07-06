import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Swal from 'sweetalert2';
import axios from 'axios';

// Sortable Category Item Component
function SortableCategoryItem({ 
    item, 
    index, 
    onUpdateType, 
    onUpdateName, 
    onDelete 
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(item.name);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
    };

    const handleSaveName = () => {
        if (!name.trim()) return;
        setIsEditing(false);
        if (name !== item.name) {
            onUpdateName(item.id, name);
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-4 p-4 bg-white border rounded-xl hover:border-gray-300 transition-all ${
                isDragging
                    ? 'shadow-lg ring-2 ring-rose-500/10 border-rose-300 bg-rose-50/20'
                    : 'border-gray-200'
            }`}
        >
            {/* Drag Handle */}
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
                title="Drag to reorder"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
            </div>

            {/* Position Indicator */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs font-semibold text-gray-500 border border-gray-100">
                {index + 1}
            </div>

            {/* Main Info */}
            <div className="flex-grow min-w-0 flex items-center gap-4">
                {isEditing ? (
                    <div className="flex items-center gap-2 flex-grow">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={handleSaveName}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSaveName(); }}
                            className="form-input py-1 px-3 text-sm flex-grow max-w-md"
                            autoFocus
                        />
                        <button 
                            onClick={handleSaveName}
                            className="px-2.5 py-1 text-xs font-semibold rounded bg-green-50 text-green-700 border border-green-200"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 flex-grow">
                        <h4 className="font-semibold text-gray-900 truncate text-base">{item.name}</h4>
                        <button 
                            onClick={() => setIsEditing(true)} 
                            className="p-1 text-gray-400 hover:text-gray-600 rounded"
                            title="Edit Category Name"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Type selector & Actions */}
            <div className="flex items-center gap-4 flex-shrink-0">
                <select
                    value={item.type}
                    onChange={(e) => onUpdateType(item.id, e.target.value)}
                    className="rounded border border-gray-300 py-1 px-3 text-sm bg-white font-medium text-gray-700 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                >
                    <option value="skill">Skill Category</option>
                    <option value="tool">Tool Category</option>
                </select>

                <button 
                    onClick={() => onDelete(item.id)} 
                    className="btn-icon w-8 h-8 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    title="Delete Category"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

// Main Page Component
export default function Categories({ categories }) {
    const [list, setList] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (categories) {
            setList(categories);
        }
    }, [categories]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleUpdateType = (id, newType) => {
        const item = list.find(c => c.id === id);
        if (!item) return;

        router.put(route('admin.skill-categories.update', id), {
            name: item.name,
            type: newType,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Category type updated'
                });
            }
        });
    };

    const handleUpdateName = (id, newName) => {
        const item = list.find(c => c.id === id);
        if (!item) return;

        router.put(route('admin.skill-categories.update', id), {
            name: newName,
            type: item.type,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire('Updated!', 'Category name updated successfully.', 'success');
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete category?',
            text: "This won't delete the skills under this category; they will be set to 'Uncategorized'.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.skill-categories.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire('Deleted!', 'Category deleted successfully.', 'success');
                    }
                });
            }
        });
    };

    const saveOrder = (items) => {
        setIsSaving(true);
        const ids = items.map(item => item.id);
        axios.post(route('admin.skill-categories.reorder'), { ids })
            .then(() => {
                setIsSaving(false);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Order updated successfully'
                });
            })
            .catch(() => {
                setIsSaving(false);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to update order',
                    icon: 'error',
                    confirmButtonColor: '#f43f5e',
                });
            });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = list.findIndex(item => item.id === active.id);
        const newIndex = list.findIndex(item => item.id === over.id);
        
        const updated = arrayMove(list, oldIndex, newIndex);
        setList(updated);
        saveOrder(updated);
    };

    return (
        <AdminLayout title="Skills Categories">
            <Head title="Skills Categories" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <p className="text-gray-500">Manage categories, drag to reorder, or toggle classification between Skills and Tools.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {isSaving && (
                            <span className="flex items-center gap-1.5 text-rose-500 text-xs font-semibold bg-rose-50 border border-rose-100 px-3 py-1 rounded-full animate-pulse">
                                <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Saving order...
                            </span>
                        )}
                        <Link href={route('admin.skills.index')} className="btn-secondary">
                            Back to Skills List
                        </Link>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-gray-200">
                    <Link href={route('admin.skills.index')} className="px-4 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
                        Skills List
                    </Link>
                    <Link href={route('admin.skill-categories.index')} className="px-4 py-2 border-b-2 border-rose-500 font-semibold text-rose-600 text-sm">
                        Categories Settings
                    </Link>
                </div>

                {/* Categories List */}
                <div className="glass-card p-6 rounded-xl">
                    {list.length > 0 ? (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={list.map(item => item.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-3">
                                    {list.map((item, index) => (
                                        <SortableCategoryItem
                                            key={item.id}
                                            item={item}
                                            index={index}
                                            onUpdateType={handleUpdateType}
                                            onUpdateName={handleUpdateName}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            No categories found. Categories will be auto-generated when you add skills.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
