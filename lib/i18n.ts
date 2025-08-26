
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.inventory': 'Inventory',
    'nav.suppliers': 'Suppliers',
    'nav.invoices': 'Invoices',
    'nav.payments': 'Payments',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.totalProducts': 'Total Products',
    'dashboard.lowStock': 'Low Stock',
    'dashboard.expiringSoon': 'Expiring Soon',
    'dashboard.recentActivities': 'Recent Activities',
    'dashboard.topProducts': 'Top Products',
    
    // Settings
    'settings.title': 'Settings',
    'settings.general': 'General',
    'settings.backup': 'Backup',
    'settings.personalInfo': 'Personal Information',
    'settings.name': 'Name',
    'settings.email': 'Email Address',
    'settings.phone': 'Phone Number',
    'settings.role': 'Role',
    'settings.currency': 'Default Currency',
    'settings.language': 'Language',
    'settings.timezone': 'Timezone',
    'settings.dateFormat': 'Date Format',
    'settings.saveChanges': 'Save Changes',
    'settings.backupConfig': 'Backup Configuration',
    'settings.systemStatus': 'System Status',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
  },
  
  rw: {
    // Navigation
    'nav.dashboard': 'Ikibaho',
    'nav.inventory': 'Ububiko',
    'nav.suppliers': 'Abatanga',
    'nav.invoices': 'Amafakture',
    'nav.payments': 'Kwishyura',
    'nav.reports': 'Raporo',
    'nav.settings': 'Igenamiterere',
    'nav.logout': 'Gusohoka',
    
    // Dashboard
    'dashboard.title': 'Ikibaho',
    'dashboard.totalProducts': 'Ibicuruzwa Byose',
    'dashboard.lowStock': 'Ububiko Buke',
    'dashboard.expiringSoon': 'Bizarangira Vuba',
    'dashboard.recentActivities': 'Ibikorwa Bya Vuba',
    'dashboard.topProducts': 'Ibicuruzwa Byinshi',
    
    // Settings
    'settings.title': 'Igenamiterere',
    'settings.general': 'Rusange',
    'settings.backup': 'Kubika',
    'settings.personalInfo': 'Amakuru Yanjye',
    'settings.name': 'Izina',
    'settings.email': 'Imeyili',
    'settings.phone': 'Telefoni',
    'settings.role': 'Uruhare',
    'settings.currency': 'Ifaranga Nkuru',
    'settings.language': 'Ururimi',
    'settings.timezone': 'Igihe',
    'settings.dateFormat': 'Uburyo bwo Kwandika Itariki',
    'settings.saveChanges': 'Bika Impinduka',
    'settings.backupConfig': 'Gushyiraho Kubika',
    'settings.systemStatus': 'Uko Sisiteme Imeze',
    
    // Common
    'common.loading': 'Birateguwe...',
    'common.error': 'Ikosa',
    'common.success': 'Byagenze Neza',
    'common.cancel': 'Kuraguza',
    'common.save': 'Bika',
    'common.delete': 'Gusiba',
    'common.edit': 'Guhindura',
    'common.add': 'Kongeramo',
  },
  
  es: {
    // Navigation
    'nav.dashboard': 'Panel',
    'nav.inventory': 'Inventario',
    'nav.suppliers': 'Proveedores',
    'nav.invoices': 'Facturas',
    'nav.payments': 'Pagos',
    'nav.reports': 'Reportes',
    'nav.settings': 'Configuración',
    'nav.logout': 'Cerrar Sesión',
    
    // Dashboard
    'dashboard.title': 'Panel de Control',
    'dashboard.totalProducts': 'Total de Productos',
    'dashboard.lowStock': 'Stock Bajo',
    'dashboard.expiringSoon': 'Próximo a Vencer',
    'dashboard.recentActivities': 'Actividades Recientes',
    'dashboard.topProducts': 'Productos Principales',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.general': 'General',
    'settings.backup': 'Respaldo',
    'settings.personalInfo': 'Información Personal',
    'settings.name': 'Nombre',
    'settings.email': 'Correo Electrónico',
    'settings.phone': 'Teléfono',
    'settings.role': 'Rol',
    'settings.currency': 'Moneda Predeterminada',
    'settings.language': 'Idioma',
    'settings.timezone': 'Zona Horaria',
    'settings.dateFormat': 'Formato de Fecha',
    'settings.saveChanges': 'Guardar Cambios',
    'settings.backupConfig': 'Configuración de Respaldo',
    'settings.systemStatus': 'Estado del Sistema',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.add': 'Agregar',
  },
  
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de Bord',
    'nav.inventory': 'Inventaire',
    'nav.suppliers': 'Fournisseurs',
    'nav.invoices': 'Factures',
    'nav.payments': 'Paiements',
    'nav.reports': 'Rapports',
    'nav.settings': 'Paramètres',
    'nav.logout': 'Déconnexion',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord',
    'dashboard.totalProducts': 'Total des Produits',
    'dashboard.lowStock': 'Stock Faible',
    'dashboard.expiringSoon': 'Expire Bientôt',
    'dashboard.recentActivities': 'Activités Récentes',
    'dashboard.topProducts': 'Produits Principaux',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.general': 'Général',
    'settings.backup': 'Sauvegarde',
    'settings.personalInfo': 'Informations Personnelles',
    'settings.name': 'Nom',
    'settings.email': 'Adresse E-mail',
    'settings.phone': 'Téléphone',
    'settings.role': 'Rôle',
    'settings.currency': 'Devise par Défaut',
    'settings.language': 'Langue',
    'settings.timezone': 'Fuseau Horaire',
    'settings.dateFormat': 'Format de Date',
    'settings.saveChanges': 'Enregistrer les Modifications',
    'settings.backupConfig': 'Configuration de Sauvegarde',
    'settings.systemStatus': 'État du Système',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.save': 'Enregistrer',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.add': 'Ajouter',
  }
};

// Language mapping
export const languageMap: { [key: string]: string } = {
  'English': 'en',
  'Kinyarwanda': 'rw',
  'Spanish': 'es',
  'French': 'fr'
};

// Get translation function
export const getTranslation = (key: string, language: string = 'English'): string => {
  const langCode = languageMap[language] || 'en';
  return translations[langCode]?.[key] || translations.en[key] || key;
};

// Translation hook for React components
export const useTranslation = (language: string = 'English') => {
  return {
    t: (key: string) => getTranslation(key, language),
    language,
    langCode: languageMap[language] || 'en'
  };
};
