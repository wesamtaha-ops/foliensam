import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  getServices,
  addService,
  updateService,
  deleteService,
  resetServicesToDefaults,
  Service
} from '../../services/dataService';
import { SERVICE_LINKS } from '../../data/seoPages';
import ImageUpload from './ImageUpload';

const emptyForm = {
  path: '',
  labelKey: '',
  descriptionKey: '',
  image: '',
  icon: 'Car',
  categoryKey: '',
};

const ServicesManager: React.FC = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.error('Failed to load services:', err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingService(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      path: service.path,
      labelKey: service.labelKey,
      descriptionKey: service.descriptionKey,
      image: service.image,
      icon: service.icon,
      categoryKey: service.categoryKey,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm(t('admin.services.deleteConfirm'))) {
      await deleteService(id);
      await loadServices();
    }
  };

  const handleRestoreDefaults = async () => {
    if (confirm(t('admin.services.restoreConfirm'))) {
      try {
        const restored = await resetServicesToDefaults();
        setServices(restored);
      } catch (err) {
        console.error('Failed to restore services:', err);
        alert(t('admin.services.saveError'));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingService) {
        await updateService(editingService.id, formData);
      } else {
        await addService(formData);
      }

      setShowModal(false);
      await loadServices();
    } catch (err) {
      console.error('Failed to save service:', err);
      alert(t('admin.services.saveError'));
    }
  };

  const iconOptions = ['Car', 'Shield', 'Sparkles', 'Palette', 'Sun', 'Building'];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-dark">
            {t('admin.services.title')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {t('admin.services.subtitle')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleRestoreDefaults}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            <RotateCcw className="h-4 w-4" />
            {t('admin.services.restoreDefaults')}
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90 transition-colors whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            {t('admin.services.addService')}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">{t('admin.services.loading')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {services.map((service) => (
            <div key={service.id} className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-video">
                <img
                  src={service.image}
                  alt={t(service.labelKey)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-800">{t(service.labelKey)}</p>
                  <span className="text-xs px-2 py-1 bg-accent-purple/10 text-accent-purple rounded">
                    {service.icon}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{service.path}</p>
                <p className="text-xs text-gray-500 mb-3">{t(service.categoryKey)}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Edit2 className="h-3 w-3" />
                    {t('admin.services.edit')}
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    {t('admin.services.delete')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-primary-dark">
                {editingService ? t('admin.services.editService') : t('admin.services.addNewService')}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 flex-shrink-0"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('admin.services.pagePath')}
                  </label>
                  <select
                    value={formData.path}
                    onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                    required
                  >
                    <option value="">{t('admin.services.selectPage')}</option>
                    {SERVICE_LINKS.map((link) => (
                      <option key={link.path} value={link.path}>
                        {link.path}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('admin.services.icon')}
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <ImageUpload
                label={t('admin.services.serviceImage')}
                value={formData.image}
                onChange={(value) => setFormData({ ...formData, image: value })}
                placeholder="https://example.com/image.jpg"
                description={t('admin.services.imageDescription')}
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('admin.services.titleKey')}
                </label>
                <input
                  type="text"
                  value={formData.labelKey}
                  onChange={(e) => setFormData({ ...formData, labelKey: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                  placeholder="seoPages.homeServices.autofolierung.title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('admin.services.descriptionKey')}
                </label>
                <input
                  type="text"
                  value={formData.descriptionKey}
                  onChange={(e) => setFormData({ ...formData, descriptionKey: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                  placeholder="seoPages.homeServices.autofolierung.description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('admin.services.categoryKey')}
                </label>
                <input
                  type="text"
                  value={formData.categoryKey}
                  onChange={(e) => setFormData({ ...formData, categoryKey: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple"
                  placeholder="seoPages.homeServices.autofolierung.category"
                  required
                />
              </div>

              <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-accent-purple text-white py-2 text-sm sm:text-base rounded-lg hover:bg-accent-purple/90 transition-colors"
                >
                  {editingService ? t('admin.services.update') : t('admin.services.add')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 text-sm sm:text-base rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {t('admin.services.cancel')}
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
