import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import {
  getServices,
  addService,
  updateService,
  deleteService,
  Service
} from '../../services/dataService';
import ImageUpload from './ImageUpload';

const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    titleKey: '',
    descriptionKey: '',
    image: '',
    icon: 'Car',
    categoryKey: '',
    durationKey: '',
    warrantyKey: '',
    fullDescriptionKey: '',
    featuresKey: '',
    processKey: ''
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    const data = getServices();
    setServices(data);
  };

  const handleAdd = () => {
    setEditingService(null);
    setFormData({
      titleKey: '',
      descriptionKey: '',
      image: '',
      icon: 'Car',
      categoryKey: '',
      durationKey: '',
      warrantyKey: '',
      fullDescriptionKey: '',
      featuresKey: '',
      processKey: ''
    });
    setShowModal(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      titleKey: service.titleKey,
      descriptionKey: service.descriptionKey,
      image: service.image,
      icon: service.icon,
      categoryKey: service.categoryKey,
      durationKey: service.durationKey,
      warrantyKey: service.warrantyKey,
      fullDescriptionKey: service.fullDescriptionKey,
      featuresKey: service.featuresKey,
      processKey: service.processKey
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      deleteService(id);
      loadServices();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      updateService(editingService.id, formData);
    } else {
      addService(formData);
    }
    
    setShowModal(false);
    loadServices();
  };

  const iconOptions = ['Car', 'Shield', 'Sparkles', 'Palette', 'Sun', 'Building'];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary-dark">Services Management</h2>
          <p className="text-gray-600">Add, edit, or remove services</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.id} className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <div className="aspect-video">
              <img
                src={service.image}
                alt={service.titleKey}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-800">{service.titleKey}</p>
                <span className="text-xs px-2 py-1 bg-accent-purple/10 text-accent-purple rounded">
                  {service.icon}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">{service.categoryKey}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Edit2 className="h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-primary-dark">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title Key (Translation)
                  </label>
                  <input
                    type="text"
                    value={formData.titleKey}
                    onChange={(e) => setFormData({ ...formData, titleKey: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                    placeholder="services.carWrapping.title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>

              <ImageUpload
                label="Service Image"
                value={formData.image}
                onChange={(value) => setFormData({ ...formData, image: value })}
                placeholder="https://example.com/image.jpg"
                description="Upload service image or enter URL"
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description Key
                </label>
                <input
                  type="text"
                  value={formData.descriptionKey}
                  onChange={(e) => setFormData({ ...formData, descriptionKey: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                  placeholder="services.carWrapping.description"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category Key
                  </label>
                  <input
                    type="text"
                    value={formData.categoryKey}
                    onChange={(e) => setFormData({ ...formData, categoryKey: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                    placeholder="services.carWrapping.category"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration Key
                  </label>
                  <input
                    type="text"
                    value={formData.durationKey}
                    onChange={(e) => setFormData({ ...formData, durationKey: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                    placeholder="services.carWrapping.duration"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Warranty Key
                  </label>
                  <input
                    type="text"
                    value={formData.warrantyKey}
                    onChange={(e) => setFormData({ ...formData, warrantyKey: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                    placeholder="services.carWrapping.warranty"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Description Key
                  </label>
                  <input
                    type="text"
                    value={formData.fullDescriptionKey}
                    onChange={(e) => setFormData({ ...formData, fullDescriptionKey: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                    placeholder="services.carWrapping.fullDescription"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Features Key
                  </label>
                  <input
                    type="text"
                    value={formData.featuresKey}
                    onChange={(e) => setFormData({ ...formData, featuresKey: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                    placeholder="services.carWrapping.features"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Process Key
                  </label>
                  <input
                    type="text"
                    value={formData.processKey}
                    onChange={(e) => setFormData({ ...formData, processKey: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                    placeholder="services.carWrapping.process"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-accent-purple text-white py-2 rounded-lg hover:bg-accent-purple/90 transition-colors"
                >
                  {editingService ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager;

