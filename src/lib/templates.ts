import { EventTemplate } from '../types';

export const eventTemplates: EventTemplate[] = [
  {
    id: 'birthday',
    translations: {
      en: {
        title: 'Birthday Celebration',
        description: 'Celebrate another year of amazing memories!'
      },
      ar: {
        title: 'احتفال عيد الميلاد',
        description: 'احتفل بعام آخر من الذكريات الرائعة!'
      }
    },
    icon: '🎂',
    suggestedItems: {
      en: ['Gift cards', 'Books', 'Clothes', 'Electronics', 'Hobby supplies'],
      ar: ['بطاقات هدايا', 'كتب', 'ملابس', 'إلكترونيات', 'مستلزمات الهوايات']
    }
  },
  {
    id: 'wedding',
    translations: {
      en: {
        title: 'Wedding Registry',
        description: 'Start our new journey together with love and joy.'
      },
      ar: {
        title: 'قائمة الزفاف',
        description: 'لنبدأ رحلتنا الجديدة معاً بالحب والفرح.'
      }
    },
    icon: '💍',
    suggestedItems: {
      en: ['Kitchen appliances', 'Home decor', 'Bedding sets', 'Dinnerware', 'Gift cards'],
      ar: ['أجهزة المطبخ', 'ديكور المنزل', 'أطقم الفراش', 'أدوات المائدة', 'بطاقات هدايا']
    }
  },
  {
    id: 'baby-shower',
    translations: {
      en: {
        title: 'Baby Shower',
        description: 'Help us welcome our little bundle of joy!'
      },
      ar: {
        title: 'حفل استقبال المولود',
        description: 'ساعدونا في الترحيب بفرحتنا الصغيرة!'
      }
    },
    icon: '👶',
    suggestedItems: {
      en: ['Diapers', 'Baby clothes', 'Nursery items', 'Baby care products', 'Toys'],
      ar: ['حفاضات', 'ملابس أطفال', 'مستلزمات غرفة الطفل', 'منتجات العناية بالطفل', 'ألعاب']
    }
  },
  {
    id: 'engagement',
    translations: {
      en: {
        title: 'Engagement Party',
        description: 'Celebrate our love and upcoming wedding!'
      },
      ar: {
        title: 'حفل الخطوبة',
        description: 'احتفلوا معنا بحبنا وزفافنا القادم!'
      }
    },
    icon: '💑',
    suggestedItems: {
      en: ['Home decor', 'Kitchen items', 'Gift cards', 'Experience gifts', 'Couple items'],
      ar: ['ديكور المنزل', 'أدوات المطبخ', 'بطاقات هدايا', 'هدايا تجريبية', 'مستلزمات الزوجين']
    }
  },
  {
    id: 'graduation',
    translations: {
      en: {
        title: 'Graduation Celebration',
        description: 'Celebrate academic achievement and new beginnings!'
      },
      ar: {
        title: 'حفل التخرج',
        description: 'احتفل بالإنجاز الأكاديمي والبدايات الجديدة!'
      }
    },
    icon: '🎓',
    suggestedItems: {
      en: ['Professional attire', 'Electronics', 'Books', 'Office supplies', 'Gift cards'],
      ar: ['ملابس مهنية', 'إلكترونيات', 'كتب', 'مستلزمات مكتبية', 'بطاقات هدايا']
    }
  }
];

export function getTemplate(id: string, language: 'en' | 'ar' = 'en'): EventTemplate | undefined {
  const template = eventTemplates.find(t => t.id === id);
  if (!template) return undefined;

  return {
    ...template,
    title: template.translations[language].title,
    description: template.translations[language].description,
    suggestedItems: template.suggestedItems[language]
  };
}