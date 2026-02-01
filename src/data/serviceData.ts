// Shared service data for consistency across components

export interface ServiceDetailData {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  categoryKey: string;
  durationKey: string;
  warrantyKey: string;
  fullDescriptionKey: string;
  featuresKey: string;
  processKey: string;
  imageKey?: string; // For localStorage images
  fallbackImage: string;
}

export const SERVICE_SLUGS = [
  'vollfolierung',
  'scheibentoenung',
  'lackschutz',
  'designfolierung',
  'chromfolierung',
  'firmenwerbung'
];

export const SERVICE_DATA: ServiceDetailData[] = [
  {
    slug: 'vollfolierung',
    titleKey: 'services.carWrapping.title',
    descriptionKey: 'services.carWrapping.description',
    categoryKey: 'services.carWrapping.category',
    durationKey: 'services.carWrapping.duration',
    warrantyKey: 'services.carWrapping.warranty',
    fullDescriptionKey: 'services.carWrapping.fullDescription',
    featuresKey: 'services.carWrapping.features',
    processKey: 'services.carWrapping.process',
    fallbackImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80'
  },
  {
    slug: 'scheibentoenung',
    titleKey: 'services.windowTinting.title',
    descriptionKey: 'services.windowTinting.description',
    categoryKey: 'services.windowTinting.category',
    durationKey: 'services.windowTinting.duration',
    warrantyKey: 'services.windowTinting.warranty',
    fullDescriptionKey: 'services.windowTinting.fullDescription',
    featuresKey: 'services.windowTinting.features',
    processKey: 'services.windowTinting.process',
    fallbackImage: 'https://images.cood.ai/samgo/car1.png'
  },
  {
    slug: 'lackschutz',
    titleKey: 'services.paintProtection.title',
    descriptionKey: 'services.paintProtection.description',
    categoryKey: 'services.paintProtection.category',
    durationKey: 'services.paintProtection.duration',
    warrantyKey: 'services.paintProtection.warranty',
    fullDescriptionKey: 'services.paintProtection.fullDescription',
    featuresKey: 'services.paintProtection.features',
    processKey: 'services.paintProtection.process',
    fallbackImage: 'https://images.cood.ai/samgo/004.png'
  },
  {
    slug: 'designfolierung',
    titleKey: 'services.designWrapping.title',
    descriptionKey: 'services.designWrapping.description',
    categoryKey: 'services.designWrapping.category',
    durationKey: 'services.designWrapping.duration',
    warrantyKey: 'services.designWrapping.warranty',
    fullDescriptionKey: 'services.designWrapping.fullDescription',
    featuresKey: 'services.designWrapping.features',
    processKey: 'services.designWrapping.process',
    fallbackImage: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&q=80'
  },
  {
    slug: 'chromfolierung',
    titleKey: 'services.chromeWrapping.title',
    descriptionKey: 'services.chromeWrapping.description',
    categoryKey: 'services.chromeWrapping.category',
    durationKey: 'services.chromeWrapping.duration',
    warrantyKey: 'services.chromeWrapping.warranty',
    fullDescriptionKey: 'services.chromeWrapping.fullDescription',
    featuresKey: 'services.chromeWrapping.features',
    processKey: 'services.chromeWrapping.process',
    fallbackImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80'
  },
  {
    slug: 'firmenwerbung',
    titleKey: 'services.commercialWrapping.title',
    descriptionKey: 'services.commercialWrapping.description',
    categoryKey: 'services.commercialWrapping.category',
    durationKey: 'services.commercialWrapping.duration',
    warrantyKey: 'services.commercialWrapping.warranty',
    fullDescriptionKey: 'services.commercialWrapping.fullDescription',
    featuresKey: 'services.commercialWrapping.features',
    processKey: 'services.commercialWrapping.process',
    fallbackImage: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80'
  }
];
