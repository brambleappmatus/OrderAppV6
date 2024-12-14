import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { fetchRescueInfo, updateRescueInfo, uploadRescueImage } from '@/lib/rescueInfo';
import ImageUpload from '@/components/UI/ImageUpload';
import toast from 'react-hot-toast';

interface RescueInfoModalProps {
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  image_url: string;
}

export default function RescueInfoModal({ onClose }: RescueInfoModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    image_url: ''
  });

  useEffect(() => {
    const loadCurrentInfo = async () => {
      try {
        const info = await fetchRescueInfo();
        if (info) {
          setFormData({
            title: info.title || '',
            description: info.description || '',
            image_url: info.image_url || ''
          });
        }
      } catch (error) {
        console.error('Error loading rescue info:', error);
        toast.error('Failed to load current rescue information');
      } finally {
        setIsLoading(false);
      }
    };

    loadCurrentInfo();
  }, []);

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const result = await uploadRescueImage(file);
      
      setFormData(prev => ({
        ...prev,
        image_url: result.url
      }));

      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageRemove = () => {
    setFormData(prev => ({
      ...prev,
      image_url: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      await updateRescueInfo(formData);
      toast.success('Rescue information updated successfully');
      onClose();
    } catch (error) {
      console.error('Error saving rescue info:', error);
      toast.error('Failed to save rescue information');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100">
              Edit Rescue Information
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-zinc-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 h-32 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">
                Image
              </label>
              <ImageUpload
                imageUrl={formData.image_url}
                onImageUpload={handleImageUpload}
                onImageRemove={handleImageRemove}
                isUploading={isUploading}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || isUploading}
                className="px-4 py-2 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}