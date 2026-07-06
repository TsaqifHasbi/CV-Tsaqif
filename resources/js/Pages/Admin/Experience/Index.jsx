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

// Sortable Item Component
function SortableItem({ item, index, formatDate, handleDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
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
                className="cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
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
            <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-gray-900 truncate">{item.job_title}</h4>
                    <span className="text-gray-300 text-xs">•</span>
                    <p className="text-gray-600 font-medium truncate">{item.organization}</p>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(item.start_date)} - {item.is_current ? 'Present' : formatDate(item.end_date)}
                    </span>
                    {item.location && (
                        <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {item.location}
                        </span>
                    )}
                    {item.employment_type && (
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">
                            {item.employment_type}
                        </span>
                    )}
                </div>
            </div>

            {/* Badges & Actions */}
            <div className="flex items-center gap-4">
                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                    item.is_active 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-gray-50 text-gray-500 border-gray-200'
                }`}>
                    {item.is_active ? 'Active' : 'Inactive'}
                </span>
                
                <div className="flex items-center gap-1">
                    <Link href={route('admin.experience.edit', item.id)} className="btn-icon w-8 h-8 hover:bg-gray-100 hover:text-rose-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </Link>
                    <button onClick={() => handleDelete(item.id)} className="btn-icon w-8 h-8 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

// Main Page Component
export default function Index({ experiences }) {
    const [workList, setWorkList] = useState([]);
    const [orgList, setOrgList] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (experiences) {
            setWorkList(experiences.filter(item => item.type === 'work'));
            setOrgList(experiences.filter(item => item.type === 'organization'));
        }
    }, [experiences]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete this experience?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.experience.destroy', id), {
                    onSuccess: () => {
                        Swal.fire('Deleted!', 'Experience has been deleted.', 'success');
                    }
                });
            }
        });
    };

    const formatDate = (d) =>
        d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present';

    const saveOrder = (items) => {
        setIsSaving(true);
        const ids = items.map(item => item.id);
        axios.post(route('admin.experience.reorder'), { ids })
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

    const handleWorkDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = workList.findIndex(item => item.id === active.id);
        const newIndex = workList.findIndex(item => item.id === over.id);
        
        const updated = arrayMove(workList, oldIndex, newIndex);
        setWorkList(updated);
        saveOrder(updated);
    };

    const handleOrgDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = orgList.findIndex(item => item.id === active.id);
        const newIndex = orgList.findIndex(item => item.id === over.id);
        
        const updated = arrayMove(orgList, oldIndex, newIndex);
        setOrgList(updated);
        saveOrder(updated);
    };

    return (
        <AdminLayout title="Experience & Organizations">
            <Head title="Experience & Organizations" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <p className="text-gray-500">Manage work experiences and organizations. Drag to change the display order.</p>
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
                        <Link href={route('admin.experience.create')} className="btn-primary">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Work Experience */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
                            <span className="text-2xl">💼</span>
                            <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
                            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-auto">
                                {workList.length} items
                            </span>
                        </div>

                        {workList.length ? (
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleWorkDragEnd}>
                                <SortableContext items={workList.map(item => item.id)} strategy={verticalListSortingStrategy}>
                                    <div className="space-y-3">
                                        {workList.map((item, idx) => (
                                            <SortableItem
                                                key={item.id}
                                                item={item}
                                                index={idx}
                                                formatDate={formatDate}
                                                handleDelete={handleDelete}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        ) : (
                            <div className="glass-card p-12 text-center rounded-xl">
                                <p className="text-gray-500 mb-4">No work experiences found</p>
                                <Link href={route('admin.experience.create')} className="btn-secondary text-sm">
                                    Add Work Experience
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Organizational Experience */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
                            <span className="text-2xl">🏛️</span>
                            <h2 className="text-xl font-bold text-gray-900">Organizational Experience</h2>
                            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-auto">
                                {orgList.length} items
                            </span>
                        </div>

                        {orgList.length ? (
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleOrgDragEnd}>
                                <SortableContext items={orgList.map(item => item.id)} strategy={verticalListSortingStrategy}>
                                    <div className="space-y-3">
                                        {orgList.map((item, idx) => (
                                            <SortableItem
                                                key={item.id}
                                                item={item}
                                                index={idx}
                                                formatDate={formatDate}
                                                handleDelete={handleDelete}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        ) : (
                            <div className="glass-card p-12 text-center rounded-xl">
                                <p className="text-gray-500 mb-4">No organizational experiences found</p>
                                <Link href={route('admin.experience.create')} className="btn-secondary text-sm">
                                    Add Org Experience
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
