import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, Download, Upload, Search, Languages, AlertTriangle } from 'lucide-react';
import {
  getSupportedLanguages,
  getTranslations,
  saveTranslations,
  resetTranslations,
  flattenTranslations,
  unflattenTranslations,
  searchTranslations,
  exportTranslations,
  importTranslations,
  LANGUAGE_NAMES,
  SupportedLanguage
} from '../../services/translationService';
import { useTranslation } from 'react-i18next';

const TranslationManager: React.FC = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('de');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [editedTranslations, setEditedTranslations] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadTranslations(selectedLanguage);
  }, [selectedLanguage]);

  const loadTranslations = async (lang: SupportedLanguage) => {
    try {
      const data = await getTranslations(lang);
      const flattened = flattenTranslations(data);
      setTranslations(flattened);
      setEditedTranslations(flattened);
      setHasChanges(false);
      setSearchQuery('');
    } catch (err) {
      console.error('Failed to load translations:', err);
    }
  };

  const handleTranslationChange = (key: string, value: string) => {
    setEditedTranslations(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      const unflattened = unflattenTranslations(editedTranslations);
      await saveTranslations(selectedLanguage, unflattened);
      setTranslations(editedTranslations);
      setHasChanges(false);
      setSaved(true);
      
      // Reload i18n translations
      i18n.reloadResources(selectedLanguage);
      
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save translations:', err);
      alert('Failed to save translations. Please try again.');
    }
  };

  const handleReset = async () => {
    if (confirm(`Reset ${LANGUAGE_NAMES[selectedLanguage]} to defaults? This cannot be undone.`)) {
      try {
        await resetTranslations(selectedLanguage);
        await loadTranslations(selectedLanguage);
        i18n.reloadResources(selectedLanguage);
      } catch (err) {
        console.error('Failed to reset translations:', err);
        alert('Failed to reset translations. Please try again.');
      }
    }
  };

  const handleExport = async () => {
    try {
      await exportTranslations(selectedLanguage);
    } catch (err) {
      console.error('Failed to export translations:', err);
      alert('Failed to export translations. Please try again.');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importTranslations(selectedLanguage, file);
      loadTranslations(selectedLanguage);
      i18n.reloadResources(selectedLanguage);
      alert('Translations imported successfully!');
    } catch (error) {
      alert('Error importing translations: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
    
    // Reset file input
    e.target.value = '';
  };

  const filteredTranslations = searchQuery
    ? searchTranslations(editedTranslations, searchQuery)
    : editedTranslations;

  const translationKeys = Object.keys(filteredTranslations).sort();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary-dark flex items-center gap-2">
            <Languages className="h-6 w-6" />
            Translation Management
          </h2>
          <p className="text-gray-600">Edit website translations for all languages</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            title="Export translations"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors cursor-pointer">
            <Upload className="h-4 w-4" />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {saved && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          ✓ Translations saved successfully!
        </div>
      )}
      
      {hasChanges && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          You have unsaved changes
        </div>
      )}

      {/* Language Selector & Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Language
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
          >
            {getSupportedLanguages().map(lang => (
              <option key={lang} value={lang}>
                {LANGUAGE_NAMES[lang]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search Translations
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
              placeholder="Search by key or value..."
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mb-4">
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
            hasChanges
              ? 'bg-accent-purple text-white hover:bg-accent-purple/90'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      {/* Translation Editor */}
      <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b-2 border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <p className="text-sm font-semibold text-gray-700">Translation Key</p>
            <p className="text-sm font-semibold text-gray-700">Value</p>
          </div>
        </div>

        <div className="max-h-[600px] overflow-y-auto">
          {translationKeys.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchQuery ? 'No translations found matching your search' : 'No translations available'}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {translationKeys.map((key) => (
                <div key={key} className="grid grid-cols-2 gap-4 p-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <code className="text-sm text-gray-600 break-all">{key}</code>
                  </div>
                  <div>
                    {editedTranslations[key].includes('[') || editedTranslations[key].includes('{') ? (
                      <textarea
                        value={editedTranslations[key]}
                        onChange={(e) => handleTranslationChange(key, e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors text-sm font-mono"
                        rows={4}
                      />
                    ) : (
                      <input
                        type="text"
                        value={editedTranslations[key]}
                        onChange={(e) => handleTranslationChange(key, e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors text-sm"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Showing <strong>{translationKeys.length}</strong> of <strong>{Object.keys(editedTranslations).length}</strong> translations
        </p>
      </div>

      {/* Help Info */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Translation Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Keys use dot notation (e.g., <code className="bg-white px-1 rounded">services.carWrapping.title</code>)</li>
          <li>• Arrays are shown as JSON - keep the bracket format</li>
          <li>• Changes apply immediately after saving</li>
          <li>• Export before making major changes (backup)</li>
          <li>• Use Import to restore from exported files</li>
        </ul>
      </div>
    </div>
  );
};

export default TranslationManager;

